# 🧠 Event Now - Backend

**Event Now Backend** es la API RESTful que da soporte al sistema de gestión de eventos culturales, académicos y recreativos de la plataforma Event Now. Está desarrollada en Node.js con Express y utiliza MySQL como base de datos relacional, aplicando buenas prácticas de arquitectura y seguridad.

---

## 🚀 Funcionalidades implementadas

- 🧾 Registro de usuarios asistentes con:
  - Validación de campos requeridos
  - Hasheo seguro de contraseñas (bcryptjs)
  - Almacenamiento normalizado en tablas `users` y `assistants`
- 🔐 Arquitectura preparada para JWT e inicio de sesión
- 🧠 Estructura escalable y modular
- 🗃️ Conexión a base de datos MySQL con `mysql2` y variables de entorno
- 📄 Documentación clara y estilo profesional en el código fuente

---

## ⚙️ Tecnologías utilizadas

| Core               | Seguridad                   | Utilidades   | Dev Tools       |
| ------------------ | --------------------------- | ------------ | --------------- |
| Node.js + Express  | bcryptjs, JWT (planificado) | dotenv, cors | nodemon, morgan |
| MySQL (con mysql2) |                             |              |                 |

---

## 📁 Estructura del proyecto

```bash
event-now-backend/
├── src/
│   ├── config/         # Conexión a base de datos y variables de entorno
│   ├── controllers/    # Lógica de los endpoints
│   ├── models/         # Consultas y acceso a base de datos
│   ├── routes/         # Definición de rutas (express.Router)
│   ├── middlewares/    # (en desarrollo) Autenticación, validaciones
│   ├── services/       # (opcional) Lógica desacoplada
│   ├── utils/          # Funciones auxiliares
│   ├── app.js          # Configuración principal de Express
├── server.js           # Punto de entrada del servidor
├── .env                # Configuración de entorno (no subir a Git)
```

---

## 🧪 Estado actual

✅ Implementado:

- Registro completo de usuarios asistentes (`/api/users/register`)
- Conexión segura a MySQL con variables de entorno
- Validación de datos en backend
- Hasheo de contraseñas
- Control de duplicados por email/username
- Documentación y estructura modular

🔜 En desarrollo:

- Registro de organizadores con datos legales
- Login con JWT
- Tabla de sesiones (`user_sessions`) para trazabilidad de accesos
- Middleware de autenticación
- Roles y permisos (admin, organizer, assistant)

---

## 📦 Instalación local

```bash
git clone https://github.com/tuusuario/event-now-backend.git
cd event-now-backend
npm install

Crear el archivo .env en la raíz con los siguientes datos:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=event_now
PORT=3001
```

## 🧠 Autor

Desarrollado por Gonzalo De Castro como parte de su proyecto final de Ingeniería en Sistemas.

---
