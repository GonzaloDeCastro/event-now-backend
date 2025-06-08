# event-now-backend

# 🧠 Event Now - Backend

Este es el backend de **Event Now**, una plataforma que conecta a usuarios con eventos culturales, académicos, recreativos y más. Este servicio está construido con Node.js, Express y MySQL, utilizando autenticación JWT y arquitectura modular.

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **Express**
- **MySQL**
- **JWT** para autenticación
- **bcryptjs** para encriptación de contraseñas
- **morgan** para logs de requests
- **dotenv** para configuración
- **nodemon** en desarrollo

---

## 📁 Estructura del proyecto

src/
├── config/ # Configuración de conexión a la base de datos
├── controllers/ # Lógica de cada endpoint
├── models/ # Consultas SQL y acceso a la base
├── routes/ # Rutas organizadas por recurso
├── services/ # Lógica de negocio (opcional)
├── middlewares/ # Validaciones, autenticación, manejo de errores
├── utils/ # Funciones auxiliares
├── app.js # Inicialización de la app Express
server.js # Punto de entrada del servidor
.env # Variables de entorno (no subir a Git)

yaml
Copy
Edit

---

## ⚙️ Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/event-now-backend.git
cd event-now-backend
Instalar dependencias:

bash
Copy
Edit
npm install
Crear archivo .env con la configuración de tu base de datos:

env
Copy
Edit
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=event_now
PORT=3001
Iniciar el servidor en modo desarrollo:

bash
Copy
Edit
npm run dev
📌 Endpoints disponibles (hasta el momento)
Método	Ruta	Descripción
POST	/api/users/register	Registro de usuarios asistentes
POST	/api/users/login	(en desarrollo) Login de usuario
GET	/api/users/ping	Test básico del módulo de usuarios

📌 Por hacer (To Do)
 Registro de usuarios asistentes

 Registro de organizadores

 Login con JWT

 Middleware de autenticación

 Control de sesiones en tabla user_sessions

 Administración de usuarios (admin)

 Tests unitarios

🧠 Autor
Desarrollado por Gonzalo De Castro como parte de su proyecto final de Ingeniería en Sistemas.

🛡️ Licencia
Este proyecto es de código cerrado y no se encuentra publicado con fines comerciales. Contactar al autor para uso o colaboración.



---

¿Querés que lo guarde directo en un archivo `.md` desde acá o te lo dejo listo para copiar y pegar en tu repo local?
```
