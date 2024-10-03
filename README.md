# Todo-App

**Todo-App** es una aplicación de gestión de tareas (To-Do) que utiliza **React** para el frontend, **Node.js** con **Express** para el backend, y **MongoDB** como base de datos. Todo el entorno está orquestado con **Docker** y **Docker Compose**, lo que facilita la configuración y ejecución del proyecto en diferentes entornos.

## Tabla de Contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Prerequisitos](#prerequisitos)
- [Instalación](#instalación)
  - [1. Clonar el Repositorio](#1-clonar-el-repositorio)
  - [2. Configurar Variables de Entorno](#2-configurar-variables-de-entorno)
  - [3. Construir y Levantar los Contenedores](#3-construir-y-levantar-los-contenedores)
- [Migración de Datos desde `localStorage` a MongoDB](#migración-de-datos-desde-localstorage-a-mongodb)
- [Uso de la Aplicación](#uso-de-la-aplicación)
- [Solución de Problemas Comunes](#solución-de-problemas-comunes)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Características

- **Frontend**: Aplicación React con una interfaz intuitiva para gestionar tareas.
- **Backend**: API RESTful construida con Node.js y Express.
- **Base de Datos**: MongoDB para almacenamiento persistente de tareas.
- **Docker**: Contenedores para facilitar la configuración y despliegue.
- **Docker Compose**: Orquestación de múltiples contenedores (frontend, backend, MongoDB).
- **Migración de Datos**: Herramienta para migrar tareas almacenadas en `localStorage` a MongoDB.

## Estructura del Proyecto

```
todo-app/
├── backend/
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todos.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...otros archivos...
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Prerequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu máquina:

- [Docker](https://www.docker.com/get-started) (incluye Docker Engine y Docker Compose)
- [Git](https://git-scm.com/downloads)

> **Nota:** No es necesario tener Node.js o MongoDB instalados localmente, ya que todo se gestiona a través de Docker.

## Instalación

### 1. Clonar el Repositorio

Primero, clona el repositorio de GitHub en tu máquina local:

```bash
git clone <URL_DEL_REPOSITORIO>
cd todo-app
```

> **Reemplaza `<URL_DEL_REPOSITORIO>`** con la URL real del repositorio de GitHub.

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto para definir las variables de entorno necesarias. Este archivo será utilizado por Docker Compose para configurar los servicios.

```bash
touch .env
```

Abre el archivo `.env` con tu editor de texto favorito y añade lo siguiente:

```env
# Backend
MONGO_URL=mongodb://mongodb:27017/todo-app
PORT=5000

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
```

> **Notas:**
> - **`MONGO_URL`**: Cadena de conexión a MongoDB utilizada por el backend.
> - **`PORT`**: Puerto en el que correrá el backend.
> - **`REACT_APP_API_URL`**: URL de la API que utilizará el frontend para comunicarse con el backend.

### 3. Construir y Levantar los Contenedores

Usa Docker Compose para construir y levantar todos los servicios definidos (frontend, backend y MongoDB).

```bash
docker-compose up --build
```

- **Opciones:**
  - `--build`: Fuerza la reconstrucción de las imágenes Docker, asegurando que los cambios recientes en los Dockerfiles se apliquen.
  - **Sin `-d`**: El comando anterior ejecuta los contenedores en primer plano. Para ejecutarlos en segundo plano (detached mode), puedes añadir `-d`:

    ```bash
    docker-compose up --build -d
    ```

> **Nota:** La primera vez que ejecutes este comando, Docker descargará las imágenes necesarias y construirá las imágenes personalizadas para el frontend y el backend. Esto puede tardar unos minutos.

## Migración de Datos desde `localStorage` a MongoDB

Si ya tienes tareas almacenadas en `localStorage` y deseas migrarlas a MongoDB para asegurar su persistencia, sigue estos pasos:

### 1. Acceder a la Aplicación

Abre tu navegador y ve a `http://localhost:3000` para acceder a la aplicación React.

### 2. Importar Tareas

- Si tienes tareas guardadas en `localStorage`, verás un botón llamado **"Importar Tareas"** en la interfaz de usuario.
- Haz clic en **"Importar Tareas"** para enviar las tareas almacenadas en `localStorage` al backend, que las guardará en MongoDB.

### 3. Verificar la Importación

- Después de la importación, las tareas deberían aparecer en la lista de tareas de la aplicación.
- Opcionalmente, puedes verificar directamente en MongoDB usando una herramienta como **MongoDB Compass** o accediendo al contenedor de MongoDB.

### 4. (Opcional) Eliminar `localStorage`

Una vez confirmada la migración, puedes optar por eliminar las tareas de `localStorage` para evitar duplicaciones:

```javascript
localStorage.removeItem('todolist');
```

> **Nota:** Si ya has importado las tareas, el botón de importación puede estar configurado para eliminar automáticamente las tareas de `localStorage` después de la importación.

## Uso de la Aplicación

### Interfaz de Usuario

- **Agregar Tarea**: Introduce el título y la descripción de la tarea y haz clic en **"Agregar"**.
- **Eliminar Tarea**: Haz clic en el icono de la papelera (`AiOutlineDelete`) para eliminar una tarea.
- **Marcar como Completa**: Haz clic en el icono de la marca de verificación (`BsCheckLg`) para marcar una tarea como completada.
- **Filtrar Tareas**: Usa los botones **"Pendientes"** y **"Completadas"** para filtrar las tareas según su estado.

### Acceso a la API

El backend expone una API RESTful en `http://localhost:5000/api/todos` con las siguientes rutas:

- **GET `/api/todos`**: Obtener todas las tareas.
- **POST `/api/todos`**: Agregar una nueva tarea.
- **DELETE `/api/todos/:id`**: Eliminar una tarea por su ID.
- **PATCH `/api/todos/:id/complete`**: Marcar una tarea como completada.
- **POST `/api/todos/import`**: Importar tareas desde `localStorage` (usado durante la migración).

## Solución de Problemas Comunes

### 1. Puerto `27017` ya está en uso

**Error:**
```
Error response from daemon: driver failed programming external connectivity on endpoint todo-app-mongodb-1: Bind for 0.0.0.0:27017 failed: port is already allocated
```

**Solución:**

- **Identificar y detener el proceso que está usando el puerto `27017`:**

  ```bash
  # En PowerShell
  netstat -ano | findstr :27017
  ```

  Esto mostrará el PID del proceso que está usando el puerto. Luego, puedes detenerlo:

  ```bash
  taskkill /PID <PID> /F
  ```

  > **Reemplaza `<PID>`** con el número de PID obtenido anteriormente.

- **O cambiar el mapeo de puertos en `docker-compose.yml`:**

  Si no puedes detener el proceso que está usando el puerto `27017`, cambia el puerto host en el archivo `docker-compose.yml`:

  ```yaml
  services:
    mongodb:
      image: mongo
      ports:
        - "27018:27017"  # Cambiado de 27017 a 27018
      volumes:
        - mongo-data:/data/db
  ```

  Luego, actualiza la cadena de conexión en el backend (`backend/server.js`):

  ```javascript
  const mongoURI = process.env.MONGO_URL || 'mongodb://mongodb:27017/todo-app';
  ```

  Si cambiaste el puerto del host, la cadena de conexión interna dentro de Docker sigue siendo `mongodb:270
