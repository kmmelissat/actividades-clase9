# 🗃️ Actividades Clase 9 - NestJS API

**Sistema completo de ejercicios de Base de Datos y API con validaciones avanzadas**

Una API REST robusta construida con NestJS que implementa múltiples ejercicios de bases de datos relacionales, autenticación JWT, validaciones complejas, relaciones entre entidades y documentación interactiva con Swagger.

---

## 👥 **Desarrollado por:**

- **Diego Leonel Cabezas Pineda**
- **Julio César Contreras Cañas**
- **Rene Alejandro Morataya Platero**
- **Christian Alejandro Sánchez Herrera**
- **Karla Melissa Torres Solórzano**

---

## 📋 Tabla de Contenidos

- [📖 Ejercicios Implementados](#-ejercicios-implementados)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🗄️ Configuración de Base de Datos](#️-configuración-de-base-de-datos)
- [🔐 Autenticación JWT](#-autenticación-jwt)
- [📚 Documentación API](#-documentación-api)
- [🧪 Testing](#-testing)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔗 Endpoints](#-endpoints)

---

## 📖 Ejercicios Implementados

### 👤 **Usuarios y Autenticación**

- Registro e inicio de sesión con validación de email único y contraseña segura.
- JWT para proteger rutas privadas.
- Endpoints para actualizar y eliminar usuarios.

### ✅ **Tareas**

- CRUD completo de tareas asociadas a usuarios autenticados.
- Validaciones de campos y protección por JWT.

### 🛒 **Productos**

- CRUD de productos.
- Endpoints públicos y privados (creación protegida por JWT).
- Validaciones de nombre, descripción y precio.

### ⚙️ **Configuración de Usuario**

- Endpoint protegido para obtener configuración personalizada del usuario autenticado.

---

## ⚡ Instalación y Configuración

### 📋 Prerrequisitos

- Node.js 18+
- npm o yarn
- PostgreSQL 15+

### 🔧 Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd actividades-clase9

# 2. Instalar dependencias
npm install

# 3. Configurar base de datos y variables de entorno (ver sección siguiente)

# 4. Ejecutar en desarrollo
npm run start:dev

# 5. Acceder a la API
# http://localhost:3000
# Swagger: http://localhost:3000/api
```

---

## 🗄️ Configuración de Base de Datos

### 1. **Crear Base de Datos PostgreSQL**

```sql
CREATE DATABASE actividades_clase9;
```

### 2. **Configurar Conexión**

Crea un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=actividades_clase9
JWT_SECRET=tu_clave_secreta
PORT=3000
```

---

## 🔐 Autenticación JWT

- Regístrate o inicia sesión para obtener un token JWT.
- Usa el token en el header de tus requests protegidos:
  ```
  Authorization: Bearer <token>
  ```

---

## 📚 Documentación API

### 🌐 **Swagger UI**

- **URL:** http://localhost:3000/api
- Documentación interactiva con ejemplos de request/response, códigos de error y organización por ejercicios.

---

## 🧪 Testing

### 🔥 **Ejemplos de Requests**

#### **Registro de usuario**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Melissa","email":"melissa@ejemplo.com","password":"123456"}'
```

#### **Login**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"melissa@ejemplo.com","password":"123456"}'
```

#### **Crear tarea**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Estudiar para el examen"}'
```

#### **Crear producto**

```bash
curl -X POST http://localhost:3000/products \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Teclado","description":"Teclado mecánico retroiluminado","price":89.99}'
```

---

## 📁 Estructura del Proyecto

```
src/
├── auth/         # Autenticación y usuarios
├── products/     # Productos
├── tasks/        # Tareas
├── settings/     # Configuración de usuario
├── main.ts       # Punto de entrada y configuración global
└── app.module.ts # Módulo principal
```

---

## 🔗 Endpoints

### 👤 **Usuarios y Autenticación**

| Método | Endpoint       | Descripción              |
| ------ | -------------- | ------------------------ |
| POST   | /auth/register | Registrar usuario        |
| POST   | /auth/login    | Iniciar sesión           |
| GET    | /users         | Listar usuarios (JWT)    |
| PUT    | /users/:id     | Actualizar usuario (JWT) |
| DELETE | /users/:id     | Eliminar usuario (JWT)   |

### ✅ **Tareas**

| Método | Endpoint   | Descripción            |
| ------ | ---------- | ---------------------- |
| GET    | /tasks     | Listar tareas (JWT)    |
| POST   | /tasks     | Crear tarea (JWT)      |
| PUT    | /tasks/:id | Actualizar tarea (JWT) |
| DELETE | /tasks/:id | Eliminar tarea (JWT)   |

### 🛒 **Productos**

| Método | Endpoint      | Descripción                       |
| ------ | ------------- | --------------------------------- |
| GET    | /products     | Listar productos (público)        |
| POST   | /products     | Crear producto (JWT)              |
| GET    | /products/:id | Obtener producto por ID (público) |

### ⚙️ **Configuración**

| Método | Endpoint  | Descripción                       |
| ------ | --------- | --------------------------------- |
| GET    | /settings | Configuración personalizada (JWT) |

---

