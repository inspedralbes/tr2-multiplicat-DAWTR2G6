# Documentación de Rutas

Este documento describe las rutas API disponibles en la aplicación. Las rutas están organizadas en grupos según la funcionalidad que ofrecen.

## Autenticación

### Registro de Usuario

- **Endpoint:** `POST /api/register`
- **Descripción:** Registra un nuevo usuario en la aplicación.

### Inicio de Sesión

- **Endpoint:** `POST /api/login`
- **Descripción:** Inicia sesión en la aplicación.

## Rutas Protegidas

Las siguientes rutas requieren autenticación mediante Sanctum.

### Perfil de Usuario

- **Endpoint:** `GET /api/user-profile`
- **Descripción:** Obtiene el perfil del usuario autenticado.

### Cierre de Sesión

- **Endpoint:** `GET /api/logout`
- **Descripción:** Cierra la sesión del usuario autenticado.

## Rutas Adicionales

### Información del Usuario

- **Endpoint:** `GET /api/user`
- **Descripción:** Obtiene información del usuario autenticado.

### Obtener Todas las Preguntas

- **Endpoint:** `GET /api/recibir-preguntas-todas`
- **Descripción:** Obtiene todas las preguntas disponibles.

### Obtener Preguntas por Categoría ID

- **Endpoint:** `GET /api/recibir-preguntas-porCategoriaID/{id}`
- **Descripción:** Obtiene preguntas por ID de categoría específica.

### Obtener Preguntas por Categoría

- **Endpoint:** `GET /api/recibir-preguntas-porCategoria/{id}`
- **Descripción:** Obtiene preguntas por nombre de categoría.

