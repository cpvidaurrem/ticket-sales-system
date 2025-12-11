# Auth Service (Servicio de Usuarios)

Servicio de autenticación y autorización con JWT.

## Endpoints principales

- `POST /api/auth/register` - Registro de usuario. Body: { name, email, password, role }
- `POST /api/auth/login` - Login. Body: { email, password }
- `GET /api/auth/me` - Información del usuario autenticado. Header: Authorization: Bearer <token>

## Configuración

Copia `.env.example` a `.env` y ajusta valores.

## Ejecutar con Docker

```bash
docker compose up --build
