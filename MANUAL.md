# 📖 Manual de Usuario — SZ Micropigmentación

## Tabla de contenido

1. [Acceso al sistema](#1-acceso-al-sistema)
2. [Panel principal (Dashboard)](#2-panel-principal-dashboard)
3. [Citas](#3-citas)
4. [Clientes](#4-clientes)
5. [Servicios](#5-servicios--solo-administradora)
6. [Finanzas](#6-finanzas--solo-administradora)
7. [Mis Gastos](#7-mis-gastos--empleada)
8. [Reportes](#8-reportes--solo-administradora)
9. [Configuración de cuenta](#9-configuración-de-cuenta)
10. [Preguntas frecuentes](#10-preguntas-frecuentes)

---

## 1. Acceso al sistema

### Iniciar sesión
1. Ingresa al enlace de la aplicación
2. Escribe tu correo y contraseña
3. Clic en **Ingresar**

### Crear cuenta (primera vez)
Solo puedes registrarte si la administradora ya agregó tu correo en el sistema.

1. En la pantalla de login, clic en **Crear cuenta**
2. Escribe tu correo, nombre y contraseña
3. Clic en **Registrarme**

> Si ves el error *"Este correo no está autorizado"*, contacta a la administradora para que agregue tu correo.

### Recuperar contraseña
1. En la pantalla de login, clic en **¿Olvidaste tu contraseña?**
2. Escribe tu correo
3. Recibirás un correo con un enlace válido por **1 hora**
4. Sigue el enlace y escribe tu nueva contraseña

---

## 2. Panel principal (Dashboard)

El panel muestra un resumen del negocio al abrir la app.

### Como Administradora verás:
- **Ingresos del mes** — total de citas completadas en el mes actual
- **Gastos del mes** — total de gastos registrados
- **Neto del mes** — ingresos menos gastos
- **Citas pendientes hoy** — número de citas de hoy sin completar
- **Citas próximas** — resumen de los siguientes días

### Como Empleada verás:
- Tus citas del día y próximas
- Acceso rápido a crear nueva cita

---

## 3. Citas

La pestaña **Citas** muestra la agenda organizada en grupos:

| Grupo | Descripción |
|---|---|
| 🔴 Hoy | Citas del día de hoy |
| 🟠 Mañana | Citas de mañana |
| 🔵 Próximas | Citas desde pasado mañana en adelante |
| ⚫ No asistió | Citas marcadas como no show |
| 🩶 Pasadas | Citas anteriores sin completar |

### Crear una nueva cita

1. Clic en **+ Nueva cita**
2. Sigue los 5 pasos del asistente:

**Paso 1 — Cliente**
- Busca por nombre o celular
- Si no existe, clic en **+ Nuevo cliente** y llena sus datos

**Paso 2 — Servicio(s)**
- Selecciona uno o más servicios de la lista
- El total se calcula automáticamente

**Paso 3 — Domicilio (opcional)**
- Activa si la cita es a domicilio
- Escribe la dirección y el costo adicional

**Paso 4 — Fecha y hora**
- Selecciona la fecha en el calendario
- Elige una hora disponible (las ocupadas aparecen en gris)
- > ⚠️ Si eres **Administradora** y asignas la cita a una empleada, los horarios bloqueados corresponden a la agenda de esa empleada específica

**Paso 4.5 — Empleada que atenderá** *(solo Administradora)*
- Selecciona la empleada del menú desplegable
- Si la empleada ya tiene cita en ese horario, el sistema bloquea el slot automáticamente

**Paso 5 — Resumen y confirmar**
- Revisa todos los datos
- Clic en **Confirmar cita** para guardar

---

### Editar una cita

1. Toca la cita en la agenda para expandirla
2. Clic en el ícono ✏️
3. Modifica los datos que necesites
4. > ⚠️ **Administradora**: puedes reasignar la cita a otra empleada desde el campo "Atendida por". Si esa empleada ya tiene cita en ese horario, el botón "Guardar" se desactivará.
5. Clic en **Guardar cambios**

---

### Marcar citas

Dentro de cada cita hay dos botones de estado:

| Botón | Acción |
|---|---|
| ✅ Completada | Marca la cita como realizada (suma a ingresos) |
| 🚫 No asistió | Marca como no show (no suma a ingresos) |

> Puedes desmarcar tocando el mismo botón de nuevo.

---

### Recordatorio por WhatsApp

Dentro de cada cita, toca el ícono de WhatsApp 💬. Se abre WhatsApp con un mensaje pre-escrito con los datos de la cita lista para enviar al cliente.

---

### Eliminar una cita

1. Expande la cita
2. Toca el ícono 🗑️
3. Confirma la eliminación

> Si la cita tenía un evento en Google Calendar, este también se eliminará automáticamente.

---

## 4. Clientes

### Ver clientes
La pestaña **Clientes** muestra la lista completa ordenada por nombre. Usa el buscador para filtrar por nombre o celular.

### Agregar un cliente
1. Clic en **+ Nuevo cliente**
2. Llena nombre y celular
3. Clic en **Guardar**

### Ver historial de un cliente
1. Busca el cliente
2. Clic en **Historial**
3. Verás todas sus citas pasadas y futuras, incluyendo **quién la atendió** en cada visita

### Editar o eliminar un cliente
Dentro de la tarjeta del cliente hay botones para ✏️ editar o 🗑️ eliminar.

> No se puede eliminar un cliente si tiene citas registradas.

---

## 5. Servicios *(solo Administradora)*

### Ver y editar servicios
La pestaña **Servicios** muestra el catálogo con nombre y precio de cada servicio.

### Agregar un servicio
1. Clic en **+ Nuevo servicio**
2. Escribe el nombre y el precio
3. Clic en **Guardar**

### Editar precio
Toca ✏️ en el servicio, cambia el precio y guarda.

> Cambiar el precio de un servicio **no afecta** las citas ya creadas — cada cita guarda el precio al momento de crearse.

### Eliminar un servicio
Toca 🗑️ y confirma. Solo se puede eliminar si el servicio no está asignado a citas activas.

---

## 6. Finanzas *(solo Administradora)*

La pestaña **Finanzas** tiene cuatro secciones:

### Resumen del mes
- Total de ingresos (citas completadas)
- Total de gastos
- Neto (ingresos − gastos)
- Selector de mes para navegar al historial

### Ingresos
- Lista detallada de citas completadas en el mes
- Filtra por estado: Todas / Completadas / Pendientes / No asistió

### Gastos
- Lista de todos los gastos del mes (de todas las empleadas)
- Cada gasto muestra quién lo registró
- Puedes **agregar**, **editar** y **eliminar** gastos
- Puedes **crear nuevas categorías** de gasto (ej: Marketing, Capacitaciones)

**Agregar un gasto:**
1. Escribe la descripción (se formatea automáticamente con mayúscula inicial)
2. Ingresa el monto
3. Selecciona la fecha
4. Elige o crea una categoría
5. Clic en **Registrar gasto**

### Comparación y Top Servicios
- **Comparación mensual**: gráfico de ingresos vs gastos de los últimos meses
- **Top servicios**: ranking de servicios más solicitados del mes

---

## 7. Mis Gastos *(Empleada)*

Las empleadas tienen su propio módulo de gastos donde solo ven los gastos que ellas mismas registraron.

### Registrar un gasto
1. Escribe la descripción
2. Ingresa el monto
3. Selecciona la fecha
4. Elige una categoría de la lista (no se pueden crear categorías nuevas)
5. Clic en **Registrar gasto**

> La descripción se capitaliza automáticamente (primera letra en mayúscula).

### Ver historial por mes
Usa el selector de mes en la parte superior para ver gastos de meses anteriores.

---

## 8. Reportes *(solo Administradora)*

La pestaña **Reportes** muestra el desempeño del equipo en el mes seleccionado.

### Qué muestra cada tarjeta de empleada:
- Nombre y correo
- **Citas creadas** en el mes
- **Gastos registrados** en el mes
- **Total en gastos** (suma de montos)

### Navegar a detalle:
- Toca el recuadro **Citas creadas** → va directo a la lista de citas
- Toca el recuadro **Gastos registrados** → va al detalle de gastos de ese mes

En ambos casos, al presionar **← Reportes** vuelves a la pantalla de reportes (no a Finanzas).

### Cambiar de mes
Usa el selector en la parte superior del reporte para ver otros meses.

---

## 9. Configuración de cuenta

### Cambiar contraseña
1. Toca tu nombre en la esquina superior derecha
2. Clic en **🔑 Cambiar contraseña**
3. Escribe tu contraseña actual y la nueva
4. Clic en **Guardar**

### Cerrar sesión
1. Toca tu nombre en la esquina superior derecha
2. Clic en **🚪 Cerrar sesión**

---

## 10. Preguntas frecuentes

**¿Por qué una hora aparece bloqueada en el calendario?**
La hora puede estar bloqueada por dos razones:
- La empleada asignada ya tiene una cita en ese horario ese día
- La hora ya pasó (en el día de hoy)

Cambia de hora o de empleada para continuar.

---

**¿Por qué no puedo guardar una cita que estoy editando?**
El botón "Guardar cambios" se desactiva si la empleada seleccionada ya tiene otra cita en la misma fecha y hora. El sistema muestra un aviso amarillo explicando el conflicto. Cambia la hora o la empleada asignada.

---

**¿El cliente recibe el recordatorio automáticamente?**
No. El recordatorio por WhatsApp se envía **manualmente** presionando el ícono de WhatsApp en la cita. La app prepara el mensaje pero tú decides cuándo enviarlo.

---

**¿Qué pasa si pierdo conexión a internet?**
La app funciona en modo sin conexión usando los últimos datos guardados en el dispositivo. Verás un aviso amarillo "⚠️ Modo sin conexión". Los cambios que hagas **no se guardarán** hasta recuperar la conexión.

---

**¿Cómo agrego una nueva empleada?**
Solo la administradora puede hacerlo, directamente en la hoja `Usuarios` de Google Sheets:
1. Agregar una fila con el correo (columna A), rol `Empleada` (columna F) y nombre (columna G)
2. La empleada puede registrar su contraseña desde la pantalla de login

---

**¿Los datos se guardan en tiempo real?**
Sí. Cada vez que guardas, creas o eliminas algo, los cambios se sincronizan inmediatamente con Google Sheets. La app también se actualiza automáticamente cada 2 minutos en segundo plano.

---

**¿Puedo usar la app desde el celular?**
Sí, la interfaz está optimizada para móvil. Para una mejor experiencia puedes agregarla a la pantalla de inicio de tu teléfono como si fuera una app nativa.

---

*Manual actualizado: mayo 2026 — SZ Micropigmentación*
