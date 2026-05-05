import { useState, useEffect } from 'react'
import { getAuditReport, updateUserRole } from './api.js'

const P  = '#B85C6E'
const PL = '#FDF6F0'
const PB = '#F5D0D8'

const fmt = n => Number(n||0).toLocaleString('es-CO')
const monthLabel = m => {
  const [y, mo] = m.split('-')
  const names = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  return `${names[parseInt(mo)-1]} ${y}`
}
const getMonthOptions = () => {
  const opts = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const val = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`
    opts.push(val)
  }
  return opts
}

/* ── Colores por usuario ── */
const USER_COLORS = ['#B85C6E','#6366F1','#0891B2','#059669','#D97706','#7C3AED']
const userColor = email => USER_COLORS[
  [...email].reduce((a,c)=>a+c.charCodeAt(0),0) % USER_COLORS.length
]
const userInitial = user => {
  const display = (typeof user === 'object' ? user.name : null) || (typeof user === 'string' ? user : '')
  return (display||'?')[0].toUpperCase()
}

/* ── Stat card ── */
function StatCard({ label, value, sub, color='#B85C6E' }) {
  return (
    <div style={{background:'var(--card)',borderRadius:14,padding:'16px 18px',boxShadow:'0 2px 12px rgba(180,92,110,.08)',flex:1,minWidth:130}}>
      <div style={{fontSize:11,fontWeight:700,color:'var(--t2)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}}>{label}</div>
      <div style={{fontSize:26,fontWeight:800,color,letterSpacing:'-1px'}}>{value}</div>
      {sub && <div style={{fontSize:12,color:'var(--t2)',marginTop:3}}>{sub}</div>}
    </div>
  )
}

/* ── Tarjeta de usuario ── */
function UserCard({ user, color, isCurrentUser, onGoCitas, onGoGastos }) {
  const neto = (user.ingresos||0) - (user.montoGastos||0)
  const netoPos = neto >= 0
  return (
    <div style={{
      background:'var(--card)', borderRadius:16, padding:'20px',
      boxShadow:'0 2px 16px rgba(0,0,0,.06)',
      border: isCurrentUser ? `2px solid ${color}` : '2px solid transparent',
    }}>
      {/* Header */}
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
        <div style={{
          width:42,height:42,borderRadius:'50%',background:color,
          color:'white',display:'flex',alignItems:'center',justifyContent:'center',
          fontWeight:800,fontSize:18,flexShrink:0,
        }}>{userInitial(user)}</div>
        <div style={{minWidth:0}}>
          <div style={{fontWeight:700,fontSize:14,color:'var(--t)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
            {user.name || user.email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}
          </div>
          <div style={{fontSize:11,color:'var(--t2)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user.email}</div>
        </div>
        {isCurrentUser && <span style={{marginLeft:'auto',background:PL,color:P,fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:20,flexShrink:0}}>Tú</span>}
      </div>

      {/* Citas y Gastos — clickeables */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
        <div onClick={onGoCitas}
          style={{background:PL,borderRadius:10,padding:'10px',textAlign:'center',cursor:onGoCitas?'pointer':'default',transition:'opacity .15s'}}
          onMouseEnter={e=>{if(onGoCitas)e.currentTarget.style.opacity='.75'}}
          onMouseLeave={e=>{e.currentTarget.style.opacity='1'}}>
          <div style={{fontSize:24,fontWeight:800,color:P}}>{user.citas}</div>
          <div style={{fontSize:10,color:'var(--t2)',fontWeight:600}}>Citas creadas {onGoCitas&&<span style={{color:P}}>→</span>}</div>
        </div>
        <div onClick={onGoGastos}
          style={{background:'var(--primary-l)',borderRadius:10,padding:'10px',textAlign:'center',cursor:onGoGastos?'pointer':'default',transition:'opacity .15s'}}
          onMouseEnter={e=>{if(onGoGastos)e.currentTarget.style.opacity='.75'}}
          onMouseLeave={e=>{e.currentTarget.style.opacity='1'}}>
          <div style={{fontSize:24,fontWeight:800,color:'var(--gold)'}}>{user.gastos}</div>
          <div style={{fontSize:10,color:'var(--t2)',fontWeight:600}}>Gastos registrados {onGoGastos&&<span style={{color:'var(--gold)'}}>→</span>}</div>
        </div>
      </div>

      {/* Ingresos y Gastos en dinero */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
        <div style={{background:'var(--primary-l)',borderRadius:10,padding:'10px',textAlign:'center'}}>
          <div style={{fontSize:13,fontWeight:800,color:'var(--green)'}}>${fmt(user.ingresos||0)}</div>
          <div style={{fontSize:10,color:'var(--green)',fontWeight:600,marginTop:2}}>💰 Ingresos</div>
          <div style={{fontSize:9,color:'var(--t2)',marginTop:1}}>citas completadas</div>
        </div>
        <div style={{background:'var(--primary-l)',borderRadius:10,padding:'10px',textAlign:'center'}}>
          <div style={{fontSize:13,fontWeight:800,color:P}}>${fmt(user.montoGastos||0)}</div>
          <div style={{fontSize:10,color:'var(--primary)',fontWeight:600,marginTop:2}}>🧾 Gastos</div>
          <div style={{fontSize:9,color:'var(--t2)',marginTop:1}}>total registrado</div>
        </div>
      </div>

      {/* Neto */}
      {(user.ingresos > 0 || user.montoGastos > 0) && (
        <div style={{
          borderRadius:10, padding:'9px 14px',
          background: netoPos ? '#EDF7F0' : '#FFF0F0',
          border: `1px solid ${netoPos ? '#B8DEC8' : '#FFCCCC'}`,
          display:'flex', justifyContent:'space-between', alignItems:'center',
        }}>
          <span style={{fontSize:11,fontWeight:700,color:netoPos?'#4A8C6E':'#B03030'}}>
            {netoPos ? '📈 Neto del mes' : '📉 Neto del mes'}
          </span>
          <span style={{fontSize:14,fontWeight:800,color:netoPos?'#2E7D52':'#B03030'}}>
            {netoPos?'+':'-'}${fmt(Math.abs(neto))}
          </span>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   REPORTS TAB
══════════════════════════════════════════════════════════════ */
export default function ReportsTab({ userEmail, userRole, sync, expenses, clients, appts, SE, setTab }) {
  const months   = getMonthOptions()
  const nowMonth = months[0]
  const [month,     setMonth]     = useState(nowMonth)
  const [report,    setReport]    = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [roleTab,   setRoleTab]   = useState(false)

  useEffect(() => { fetchReport(month) }, [month])

  async function fetchReport(m) {
    setLoading(true); setError('')
    try {
      const data = await getAuditReport(m, userEmail)
      setReport(data)
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }

  // Recalcular montoGastos desde el array de gastos actual (no del log de auditoría)
  // para que refleje ediciones de montos en tiempo real
  const safeExpenses = Array.isArray(expenses) ? expenses : []
  const safeAppts    = Array.isArray(appts)    ? appts    : []
  const usersRaw = report?.users || []
  const users = usersRaw.map(u => {
    const email = String(u.email||'').trim().toLowerCase()

    // Gastos: monto real actual filtrado por createdBy + mes
    const monto = safeExpenses
      .filter(e => {
        const d = typeof e.date === 'string' ? e.date : ''
        return String(e.createdBy||'').trim().toLowerCase() === email
            && d.slice(0,7) === month
      })
      .reduce((s,e) => s + Number(String(e.amount||'0').replace(/[^0-9.-]/g,'')), 0)

    // Ingresos: suma de citas completadas atendidas por esta empleada en el mes
    const ingresos = safeAppts
      .filter(a => {
        const d = typeof a.date === 'string' ? a.date : ''
        const completada = a.completed === true || a.completed === 'true'
        return String(a.assignedTo||'').trim().toLowerCase() === email
            && d.slice(0,7) === month
            && completada
      })
      .reduce((s,a) => s + Number(String(a.totalPrice||a.servicePrice||'0').replace(/[^0-9.-]/g,'')), 0)

    return { ...u, montoGastos: monto, ingresos }
  })

  const totCitas    = users.reduce((s,u)=>s+u.citas,0)
  const totGastos   = users.reduce((s,u)=>s+u.gastos,0)
  const totMonto    = users.reduce((s,u)=>s+u.montoGastos,0)
  const totIngresos = users.reduce((s,u)=>s+u.ingresos,0)

  return (
    <div style={{padding:'0 0 80px'}}>

      {/* Tabs internas */}
      <div style={{display:'flex',gap:0,background:'var(--card)',borderBottom:'1px solid #F0E8E8',marginBottom:20,position:'sticky',top:108,zIndex:90}}>
        {[['reportes','📊 Reportes'],['accesos','👥 Accesos']].map(([id,lb])=>(
          <button key={id} onClick={()=>setRoleTab(id==='accesos')}
            style={{flex:1,padding:'13px',border:'none',borderBottom:`2.5px solid ${(id==='accesos')===roleTab?P:'transparent'}`,
              background:'none',fontFamily:'inherit',fontSize:13,fontWeight:700,cursor:'pointer',
              color:(id==='accesos')===roleTab?P:'#aaa',transition:'all .15s'}}>
            {lb}
          </button>
        ))}
      </div>

      {!roleTab ? (
        /* ── REPORTES ── */
        <div style={{padding:'0 16px'}}>
          {/* Selector de mes */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,gap:12}}>
            <div style={{fontFamily:'Georgia,serif',fontSize:20,fontWeight:700,color:'var(--t)'}}>
              Actividad del equipo
            </div>
            <select value={month} onChange={e=>setMonth(e.target.value)}
              style={{border:'1.5px solid var(--border)',borderRadius:10,padding:'8px 12px',fontFamily:'inherit',fontSize:13,color:'var(--t)',background:'var(--card)',outline:'none',cursor:'pointer'}}>
              {months.map(m=>(
                <option key={m} value={m}>{monthLabel(m)}</option>
              ))}
            </select>
          </div>

          {loading && (
            <div style={{textAlign:'center',padding:'40px',color:'var(--t2)',fontSize:14}}>Cargando reporte…</div>
          )}
          {error && (
            <div style={{background:'var(--primary-l)',color:'var(--red)',borderRadius:12,padding:'12px 16px',marginBottom:16,fontSize:13}}>{error}</div>
          )}

          {!loading && !error && (
            <>
              {/* Resumen total */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
                <StatCard label="Citas creadas"      value={totCitas}              color={P}/>
                <StatCard label="Gastos registrados" value={totGastos}             color='#D97706'/>
                <StatCard label="Total en gastos"    value={`$${fmt(totMonto)}`}   color='#B03030' sub={monthLabel(month)}/>
                <StatCard label="Total en ingresos"  value={`$${fmt(totIngresos)}`} color='#059669' sub="citas completadas"/>
              </div>

              {users.length === 0 ? (
                <div style={{textAlign:'center',padding:'48px 20px',color:'var(--t2)'}}>
                  <div style={{fontSize:36,marginBottom:12}}>📭</div>
                  <div style={{fontSize:14}}>Sin actividad registrada en {monthLabel(month)}</div>
                  <div style={{fontSize:12,marginTop:4,color:'var(--t2)'}}>Los movimientos se registran automáticamente desde la app</div>
                </div>
              ) : (
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14}}>
                  {users
                    .sort((a,b)=>(b.citas+b.gastos)-(a.citas+a.gastos))
                    .map(u=>(
                      <UserCard
                        key={u.email}
                        user={u}
                        color={userColor(u.email)}
                        isCurrentUser={u.email===userEmail}
                        onGoCitas={setTab ? ()=>setTab('appointments',{from:'reports'}) : undefined}
                        onGoGastos={setTab ? ()=>setTab('expense-detail',{from:'reports'}) : undefined}
                      />
                    ))
                  }
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        /* ── GESTIÓN DE ACCESOS ── */
        <AccessManager userEmail={userEmail} sync={sync} />
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   GESTIÓN DE ACCESOS (solo admin)
══════════════════════════════════════════════════════════════ */
function AccessManager({ userEmail, sync }) {
  const [newEmail, setNewEmail] = useState('')
  const [newRole,  setNewRole]  = useState('Empleada')
  const [busy,     setBusy]     = useState(false)
  const [msg,      setMsg]      = useState('')
  const [isErr,    setIsErr]    = useState(false)

  async function handleUpdateRole() {
    if (!newEmail.trim()) return
    setBusy(true); setMsg(''); setIsErr(false)
    try {
      await updateUserRole(newEmail.trim().toLowerCase(), newRole, userEmail)
      setMsg(`✅ Rol de ${newEmail.trim()} actualizado a ${newRole}`)
      setNewEmail('')
    } catch(e) { setMsg(e.message); setIsErr(true) }
    finally { setBusy(false) }
  }

  const inp = {
    width:'100%',padding:'11px 14px',border:'1.5px solid var(--border)',
    borderRadius:10,fontSize:14,fontFamily:'inherit',
    background:'var(--card)',outline:'none',boxSizing:'border-box',
  }

  return (
    <div style={{padding:'0 16px'}}>
      <div style={{fontFamily:'Georgia,serif',fontSize:20,fontWeight:700,color:'var(--t)',marginBottom:6}}>Gestión de accesos</div>
      <div style={{fontSize:13,color:'var(--t2)',marginBottom:20}}>
        Para autorizar a un nuevo usuario, primero agrega su correo en la hoja "Usuarios" de Google Sheets,
        luego asígnale el rol aquí.
      </div>

      <div style={{background:'var(--card)',borderRadius:16,padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,.06)'}}>
        <div style={{fontSize:13,fontWeight:700,color:'var(--t)',marginBottom:14}}>Cambiar rol de usuario</div>

        <div style={{marginBottom:12}}>
          <label style={{fontSize:11,fontWeight:700,color:'var(--t2)',textTransform:'uppercase',letterSpacing:'.05em',display:'block',marginBottom:5}}>
            Correo del usuario
          </label>
          <input value={newEmail} onChange={e=>setNewEmail(e.target.value)}
            placeholder="usuario@correo.com" style={inp} type="email"/>
        </div>

        <div style={{marginBottom:16}}>
          <label style={{fontSize:11,fontWeight:700,color:'var(--t2)',textTransform:'uppercase',letterSpacing:'.05em',display:'block',marginBottom:5}}>
            Rol
          </label>
          <div style={{display:'flex',gap:10}}>
            {['Administradora','Empleada'].map(r=>(
              <button key={r} onClick={()=>setNewRole(r)}
                style={{flex:1,padding:'10px',borderRadius:10,border:`2px solid ${newRole===r?P:'var(--border)'}`,
                  background:newRole===r?'var(--primary-l)':'var(--card)',color:newRole===r?P:'var(--t)',
                  fontFamily:'inherit',fontSize:13,fontWeight:700,cursor:'pointer',transition:'all .15s'}}>
                {r==='Administradora'?'👑 Administradora':'👤 Empleada'}
              </button>
            ))}
          </div>
        </div>

        {msg && (
          <div style={{background:isErr?'#FEE2E2':'#D1FAE5',color:isErr?'#B91C1C':'#065F46',
            borderRadius:10,padding:'10px 14px',fontSize:13,marginBottom:14,fontWeight:500}}>
            {msg}
          </div>
        )}

        <button onClick={handleUpdateRole} disabled={busy||!newEmail.trim()}
          style={{width:'100%',padding:'12px',background:busy||!newEmail.trim()?'#e0d0d3':P,
            color:'white',border:'none',borderRadius:12,fontSize:14,fontWeight:700,
            cursor:busy||!newEmail.trim()?'not-allowed':'pointer',fontFamily:'inherit'}}>
          {busy?'Guardando…':'Actualizar rol'}
        </button>

        <div style={{marginTop:20,padding:'14px 16px',background:'var(--card)',borderRadius:12,border:'1.5px solid var(--border)'}}>
          <div style={{fontSize:12,fontWeight:700,color:'var(--primary)',marginBottom:10}}>📋 Diferencia de roles</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <div style={{display:'flex',gap:8,alignItems:'flex-start',padding:'8px 10px',background:'var(--bg)',borderRadius:8,border:'1.5px solid var(--primary)'}}>
              <span style={{fontSize:16,flexShrink:0}}>👑</span>
              <div style={{fontSize:12,color:'var(--t)',lineHeight:1.5}}>
                <strong style={{color:'var(--primary)'}}>Administradora:</strong>{' '}
                acceso total — citas, clientes, servicios, finanzas y reportes
              </div>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'flex-start',padding:'8px 10px',background:'var(--bg)',borderRadius:8,border:'1px solid var(--border)'}}>
              <span style={{fontSize:16,flexShrink:0}}>👤</span>
              <div style={{fontSize:12,color:'var(--t)',lineHeight:1.5}}>
                <strong style={{color:'var(--t)'}}>Empleada:</strong>{' '}
                citas, clientes, y solo sus propios gastos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
