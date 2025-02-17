# Arquitectura del Sistema para la Aplicación de Oposiciones

**Justificación de Decisiones Técnicas**

_Lenguaje y Frameworks:_

Backend en Node.js con Express

Frontend para web en React (Web) y Flutter (Móvil) para compartir código y facilitar mantenimiento.

_Base de Datos:_

NoSQL (MongoDB o Amazon DynamoDB) para manejar datos flexibles y grandes volúmenes de datos relativos a exámenes y usuarios (preguntas, progreso, ránking...)

_Infraestructura:_

Elegimos AWS, en mi caso es la que conozco y ya conozco sus servicios.

Se puede usar **S3** para almacenamiento de documentos (exámenes) e imágenes.

**Lambda** para la automatización de diferentes gestiones como el envío automático de emails.

# Gestión de Autenticación y Autorización

Elegimos OAuth 2.0 y JWT para la autenticación y autorización de usuarios. OAuth facilita la integración de autenticación mediante cuentas de google u otros servicios.

Se puede usar un servicio de autenticación como AWS Cognito

_Flujo de autenticación:_

El usuario inicia sesión a través del cliente.

La solicitud se envía a la API Gateway, que la redirige al backend, éste verifica las credenciales a través de AWS Cognito y en caso de que sean correctas se genera un token JWT que se devuelve al cliente.

En cada solicitud privada, se incluirá este token en los headers de la petició. Para comprobar su inclusión y validación se puede desarrollar un middleware que se incluirá en las llamadas a los diferentes endpoints en backend.

# Endpoints de autenticación:

**POST /auth/register** → Registro de usuario, generación de enlace de verificación y almacenamiento en Cognito.

**POST /auth/login**→ Autenticación de usuario con OAuth 2.0, generación de JWT.

**POST /auth/logout** → Eliminación del token JWT.

**GET /user/progress** → Acceso protegido para ver el progreso del usuario (requiere token JWT). Sería algo así usando express:
_router.get('/user/progress, validateJWTMiddleware, getProgressRequestController)_

**GET /ranking** → Ver ranking diario (requiere token JWT, usaríamos el middleware).

**GET /:theme/questions** → Ver preguntas de un tema concreto (requiere JWT)

**GET /exams/test** → (requiere JWT) Obtener un examen de prueba. Al completarlo se haría un **POST** para guardar los resultados a un endpoint protegido como **/exams/result** incluyendo en el body de la petición el ID del examen.

# Ventajas de JWT + OAuth 2.0 en AWS:

Escalabilidad: Compatible con microservicios y permite validaciones rápidas sin consultas adicionales a la base de datos.

Seguridad: Tokens firmados con claves privadas.

Integración: OAuth 2.0 permite autenticación mediante Google, Facebook, etc.
