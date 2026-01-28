# Documentación de API - Whaticket

Esta documentación describe todos los endpoints disponibles en el sistema Whaticket.

## Tabla de Contenidos

- [Autenticación](#autenticación)
- [Usuarios](#usuarios)
- [Contactos](#contactos)
- [Tickets](#tickets)
- [Mensajes](#mensajes)
- [WhatsApp](#whatsapp)
- [Sesiones de WhatsApp](#sesiones-de-whatsapp)
- [Colas (Queues)](#colas-queues)
- [Respuestas Rápidas](#respuestas-rápidas)
- [Configuraciones](#configuraciones)
- [API Externa](#api-externa)

---

## Autenticación

Base URL: `/auth`

### POST /auth/signup
Registrar un nuevo usuario en el sistema.

**Autenticación:** No requerida

**Body:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "profile": "string",
  "queueIds": "array",
  "whatsappId": "number"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "profile": "string"
  }
}
```

---

### POST /auth/login
Iniciar sesión en el sistema.

**Autenticación:** No requerida

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "profile": "string"
  }
}
```

**Notas:**
- También envía una cookie `jrt` con el refresh token

---

### POST /auth/refresh_token
Refrescar el token de autenticación.

**Autenticación:** Cookie `jrt` requerida

**Respuesta exitosa (200):**
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "profile": "string"
  }
}
```

---

### DELETE /auth/logout
Cerrar sesión y limpiar las cookies.

**Autenticación:** Bearer Token requerido

**Respuesta exitosa (200):** Respuesta vacía

---

## Usuarios

Base URL: `/users`

### GET /users
Listar todos los usuarios con paginación y búsqueda.

**Autenticación:** Bearer Token requerido

**Query Parameters:**
- `searchParam` (string, opcional): Término de búsqueda
- `pageNumber` (string, opcional): Número de página

**Respuesta exitosa (200):**
```json
{
  "users": [
    {
      "id": "number",
      "name": "string",
      "email": "string",
      "profile": "string",
      "queues": "array",
      "whatsappId": "number"
    }
  ],
  "count": "number",
  "hasMore": "boolean"
}
```

---

### POST /users
Crear un nuevo usuario.

**Autenticación:** Bearer Token requerido (solo admin)

**Body:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "profile": "string",
  "queueIds": "array",
  "whatsappId": "number"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "profile": "string"
}
```

---

### GET /users/:userId
Obtener información de un usuario específico.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `userId` (number): ID del usuario

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "profile": "string",
  "queues": "array",
  "whatsappId": "number"
}
```

---

### PUT /users/:userId
Actualizar información de un usuario.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `userId` (number): ID del usuario

**Body:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "profile": "string",
  "queueIds": "array",
  "whatsappId": "number"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "profile": "string"
}
```

---

### DELETE /users/:userId
Eliminar un usuario del sistema.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `userId` (number): ID del usuario

**Respuesta exitosa (200):**
```json
{
  "message": "User deleted"
}
```

---

## Contactos

Base URL: `/contacts`

### GET /contacts
Listar todos los contactos con paginación y búsqueda.

**Autenticación:** Bearer Token requerido

**Query Parameters:**
- `searchParam` (string, opcional): Término de búsqueda
- `pageNumber` (string, opcional): Número de página

**Respuesta exitosa (200):**
```json
{
  "contacts": [
    {
      "id": "number",
      "name": "string",
      "number": "string",
      "email": "string",
      "profilePicUrl": "string",
      "isGroup": "boolean"
    }
  ],
  "count": "number",
  "hasMore": "boolean"
}
```

---

### GET /contacts/:contactId
Obtener información de un contacto específico.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `contactId` (number): ID del contacto

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "number": "string",
  "email": "string",
  "profilePicUrl": "string",
  "isGroup": "boolean"
}
```

---

### POST /contacts
Crear un nuevo contacto.

**Autenticación:** Bearer Token requerido

**Body:**
```json
{
  "name": "string",
  "number": "string",
  "email": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "number": "string",
  "email": "string",
  "profilePicUrl": "string"
}
```

---

### POST /contact
Obtener un contacto por número o criterios específicos.

**Autenticación:** Bearer Token requerido

**Body:**
```json
{
  "number": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "number": "string",
  "email": "string",
  "profilePicUrl": "string"
}
```

---

### PUT /contacts/:contactId
Actualizar información de un contacto.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `contactId` (number): ID del contacto

**Body:**
```json
{
  "name": "string",
  "number": "string",
  "email": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "number": "string",
  "email": "string"
}
```

---

### DELETE /contacts/:contactId
Eliminar un contacto.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `contactId` (number): ID del contacto

**Respuesta exitosa (200):**
```json
{
  "message": "Contact deleted"
}
```

---

### POST /contacts/import
Importar contactos desde el teléfono.

**Autenticación:** Bearer Token requerido

**Body:**
```json
{
  "contacts": "array"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Contacts imported successfully"
}
```

---

## Tickets

Base URL: `/tickets`

### GET /tickets
Listar todos los tickets con filtros y paginación.

**Autenticación:** Bearer Token requerido

**Query Parameters:**
- `searchParam` (string, opcional): Término de búsqueda
- `pageNumber` (string, opcional): Número de página
- `status` (string, opcional): Estado del ticket (open, pending, closed)
- `showAll` (string, opcional): Mostrar todos los tickets
- `queueIds` (string, opcional): IDs de colas
- `withUnreadMessages` (string, opcional): Solo con mensajes no leídos

**Respuesta exitosa (200):**
```json
{
  "tickets": [
    {
      "id": "number",
      "status": "string",
      "lastMessage": "string",
      "contact": "object",
      "user": "object",
      "queue": "object",
      "unreadMessages": "number"
    }
  ],
  "count": "number",
  "hasMore": "boolean"
}
```

---

### GET /tickets/:ticketId
Obtener información de un ticket específico.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `ticketId` (number): ID del ticket

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "status": "string",
  "contact": "object",
  "user": "object",
  "queue": "object",
  "messages": "array"
}
```

---

### POST /tickets
Crear un nuevo ticket.

**Autenticación:** Bearer Token requerido

**Body:**
```json
{
  "contactId": "number",
  "status": "string",
  "userId": "number",
  "queueId": "number"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "status": "string",
  "contactId": "number",
  "userId": "number",
  "queueId": "number"
}
```

---

### PUT /tickets/:ticketId
Actualizar un ticket.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `ticketId` (number): ID del ticket

**Body:**
```json
{
  "status": "string",
  "userId": "number",
  "queueId": "number"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "status": "string",
  "userId": "number",
  "queueId": "number"
}
```

---

### DELETE /tickets/:ticketId
Eliminar un ticket.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `ticketId` (number): ID del ticket

**Respuesta exitosa (200):**
```json
{
  "message": "Ticket deleted"
}
```

---

## Mensajes

Base URL: `/messages`

### GET /messages/:ticketId
Obtener todos los mensajes de un ticket.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `ticketId` (number): ID del ticket

**Query Parameters:**
- `pageNumber` (string, opcional): Número de página

**Respuesta exitosa (200):**
```json
{
  "messages": [
    {
      "id": "string",
      "body": "string",
      "ack": "number",
      "read": "boolean",
      "mediaType": "string",
      "mediaUrl": "string",
      "timestamp": "number",
      "fromMe": "boolean",
      "quotedMsg": "object"
    }
  ],
  "count": "number",
  "hasMore": "boolean"
}
```

---

### POST /messages/:ticketId
Enviar un nuevo mensaje en un ticket.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `ticketId` (number): ID del ticket

**Body (multipart/form-data):**
- `body` (string): Contenido del mensaje
- `medias` (files, opcional): Archivos multimedia adjuntos

**Respuesta exitosa (200):**
```json
{
  "id": "string",
  "body": "string",
  "ack": "number",
  "mediaType": "string",
  "mediaUrl": "string",
  "timestamp": "number"
}
```

**Notas:**
- Soporta múltiples archivos multimedia
- Los tipos de medios soportados incluyen: imágenes, videos, audios y documentos

---

### DELETE /messages/:messageId
Eliminar un mensaje.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `messageId` (string): ID del mensaje

**Respuesta exitosa (200):**
```json
{
  "message": "Message deleted"
}
```

---

## WhatsApp

Base URL: `/whatsapp`

### GET /whatsapp
Listar todas las conexiones de WhatsApp.

**Autenticación:** Bearer Token requerido

**Respuesta exitosa (200):**
```json
{
  "whatsapps": [
    {
      "id": "number",
      "name": "string",
      "status": "string",
      "qrcode": "string",
      "battery": "string",
      "plugged": "boolean",
      "retries": "number",
      "isDefault": "boolean"
    }
  ]
}
```

---

### POST /whatsapp
Crear una nueva conexión de WhatsApp.

**Autenticación:** Bearer Token requerido

**Body:**
```json
{
  "name": "string",
  "queueIds": "array",
  "greetingMessage": "string",
  "farewellMessage": "string",
  "isDefault": "boolean"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "status": "string",
  "qrcode": "string",
  "isDefault": "boolean"
}
```

---

### GET /whatsapp/:whatsappId
Obtener información de una conexión de WhatsApp específica.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `whatsappId` (number): ID de la conexión de WhatsApp

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "status": "string",
  "qrcode": "string",
  "battery": "string",
  "plugged": "boolean",
  "isDefault": "boolean",
  "queues": "array"
}
```

---

### PUT /whatsapp/:whatsappId
Actualizar una conexión de WhatsApp.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `whatsappId` (number): ID de la conexión de WhatsApp

**Body:**
```json
{
  "name": "string",
  "status": "string",
  "isDefault": "boolean",
  "greetingMessage": "string",
  "farewellMessage": "string",
  "queueIds": "array"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "status": "string",
  "isDefault": "boolean"
}
```

---

### DELETE /whatsapp/:whatsappId
Eliminar una conexión de WhatsApp.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `whatsappId` (number): ID de la conexión de WhatsApp

**Respuesta exitosa (200):**
```json
{
  "message": "WhatsApp deleted"
}
```

---

## Sesiones de WhatsApp

Base URL: `/whatsappsession`

### POST /whatsappsession/:whatsappId
Iniciar una sesión de WhatsApp (generar QR code).

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `whatsappId` (number): ID de la conexión de WhatsApp

**Respuesta exitosa (200):**
```json
{
  "message": "Starting session"
}
```

**Notas:**
- Este endpoint inicia el proceso de conexión y genera un código QR

---

### PUT /whatsappsession/:whatsappId
Actualizar el estado de una sesión de WhatsApp.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `whatsappId` (number): ID de la conexión de WhatsApp

**Respuesta exitosa (200):**
```json
{
  "message": "Session updated"
}
```

---

### DELETE /whatsappsession/:whatsappId
Cerrar una sesión de WhatsApp (desconectar).

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `whatsappId` (number): ID de la conexión de WhatsApp

**Respuesta exitosa (200):**
```json
{
  "message": "Session disconnected"
}
```

---

## Colas (Queues)

Base URL: `/queue`

### GET /queue
Listar todas las colas.

**Autenticación:** Bearer Token requerido

**Respuesta exitosa (200):**
```json
{
  "queues": [
    {
      "id": "number",
      "name": "string",
      "color": "string",
      "greetingMessage": "string"
    }
  ]
}
```

---

### POST /queue
Crear una nueva cola.

**Autenticación:** Bearer Token requerido

**Body:**
```json
{
  "name": "string",
  "color": "string",
  "greetingMessage": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "color": "string",
  "greetingMessage": "string"
}
```

---

### GET /queue/:queueId
Obtener información de una cola específica.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `queueId` (number): ID de la cola

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "color": "string",
  "greetingMessage": "string"
}
```

---

### PUT /queue/:queueId
Actualizar una cola.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `queueId` (number): ID de la cola

**Body:**
```json
{
  "name": "string",
  "color": "string",
  "greetingMessage": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "name": "string",
  "color": "string",
  "greetingMessage": "string"
}
```

---

### DELETE /queue/:queueId
Eliminar una cola.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `queueId` (number): ID de la cola

**Respuesta exitosa (200):**
```json
{
  "message": "Queue deleted"
}
```

---

## Respuestas Rápidas

Base URL: `/quickAnswers`

### GET /quickAnswers
Listar todas las respuestas rápidas.

**Autenticación:** Bearer Token requerido

**Respuesta exitosa (200):**
```json
{
  "quickAnswers": [
    {
      "id": "number",
      "shortcut": "string",
      "message": "string"
    }
  ]
}
```

---

### GET /quickAnswers/:quickAnswerId
Obtener una respuesta rápida específica.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `quickAnswerId` (number): ID de la respuesta rápida

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "shortcut": "string",
  "message": "string"
}
```

---

### POST /quickAnswers
Crear una nueva respuesta rápida.

**Autenticación:** Bearer Token requerido

**Body:**
```json
{
  "shortcut": "string",
  "message": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "shortcut": "string",
  "message": "string"
}
```

---

### PUT /quickAnswers/:quickAnswerId
Actualizar una respuesta rápida.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `quickAnswerId` (number): ID de la respuesta rápida

**Body:**
```json
{
  "shortcut": "string",
  "message": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "number",
  "shortcut": "string",
  "message": "string"
}
```

---

### DELETE /quickAnswers/:quickAnswerId
Eliminar una respuesta rápida.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `quickAnswerId` (number): ID de la respuesta rápida

**Respuesta exitosa (200):**
```json
{
  "message": "Quick answer deleted"
}
```

---

## Configuraciones

Base URL: `/settings`

### GET /settings
Obtener todas las configuraciones del sistema.

**Autenticación:** Bearer Token requerido

**Respuesta exitosa (200):**
```json
{
  "settings": [
    {
      "key": "string",
      "value": "string"
    }
  ]
}
```

---

### PUT /settings/:settingKey
Actualizar una configuración específica.

**Autenticación:** Bearer Token requerido

**Parámetros de URL:**
- `settingKey` (string): Clave de la configuración

**Body:**
```json
{
  "value": "string"
}
```

**Respuesta exitosa (200):**
```json
{
  "key": "string",
  "value": "string"
}
```

**Configuraciones disponibles:**
- `userCreation`: Habilitar/deshabilitar creación de usuarios
- Otras configuraciones del sistema

---

## API Externa

Base URL: `/api/messages`

### POST /api/messages/send
Enviar mensajes de WhatsApp mediante API externa.

**Autenticación:** API Token requerido (header `apikey`)

**Body (multipart/form-data):**
```json
{
  "number": "string",
  "body": "string",
  "medias": "files (opcional)"
}
```

**Headers:**
```
apikey: string (token de API)
```

**Respuesta exitosa (200):**
```json
{
  "message": "Message sent successfully",
  "ticket": {
    "id": "number",
    "status": "string"
  }
}
```

**Notas:**
- Este endpoint es para integración externa
- Utiliza autenticación mediante API key en lugar de Bearer token
- Soporta envío de archivos multimedia
- Crea automáticamente el contacto si no existe
- Crea o reutiliza un ticket existente

---

## Códigos de Estado HTTP

- `200` - OK: Solicitud exitosa
- `201` - Created: Recurso creado exitosamente
- `400` - Bad Request: Error en los datos enviados
- `401` - Unauthorized: No autenticado o token inválido
- `403` - Forbidden: No tiene permisos para realizar la acción
- `404` - Not Found: Recurso no encontrado
- `500` - Internal Server Error: Error interno del servidor

---

## Autenticación

### Bearer Token
La mayoría de los endpoints requieren autenticación mediante Bearer Token en el header:

```
Authorization: Bearer <token>
```

El token se obtiene al hacer login (`POST /auth/login`) o signup (`POST /auth/signup`).

### API Key
Para el endpoint de API externa (`POST /api/messages/send`), se requiere un API key en el header:

```
apikey: <api-key>
```

### Refresh Token
El sistema utiliza cookies para mantener refresh tokens que permiten renovar el token de acceso sin requerir login nuevamente.

---

## WebSockets

El sistema utiliza Socket.IO para comunicación en tiempo real. Los eventos incluyen:

- Nuevos mensajes
- Actualización de tickets
- Cambios de estado de WhatsApp
- Notificaciones en tiempo real

---

## Notas Importantes

1. **Permisos**: Algunos endpoints requieren perfil de administrador
2. **Paginación**: Los endpoints de listado soportan paginación mediante `pageNumber`
3. **Búsqueda**: Muchos endpoints soportan búsqueda mediante `searchParam`
4. **Archivos**: Los endpoints que aceptan archivos utilizan `multipart/form-data`
5. **Tiempo Real**: Los cambios se propagan en tiempo real mediante WebSockets

---

## Información de Desarrollo

- **Backend Framework**: Express.js con TypeScript
- **Base de Datos**: Sequelize ORM
- **Autenticación**: JWT (JSON Web Tokens)
- **WebSocket**: Socket.IO
- **Upload**: Multer
- **Validación**: Yup

---

*Última actualización: Enero 2026*
