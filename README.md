# Raíz Local

Proyecto de la materia **Aplicaciones Web Escalables**. La idea es crear una tienda
web para consultar artesanías y regalos de productores locales, usando MongoDB,
Express, Angular y Node.js.

**Estado:** es un avance, no la entrega final. El catálogo de Angular ya consulta
la API, permite buscar y filtrar productos, y muestra su detalle. La API también
tiene registro, inicio de sesión con JWT y CRUD de categorías y productos. Los
CRUD de usuarios, direcciones y pedidos todavía no están completos; también faltan
las pantallas de cuenta, compra y administración.

## Requisitos

- Node.js 20.19.x, 22.12.x o 24.x.
- npm.
- Docker Desktop con Compose, o una instancia propia de MongoDB.

## Iniciar MongoDB

Desde esta carpeta:

```powershell
docker compose up -d mongodb
```

El proyecto usa el puerto `27018` para no interferir con otros ejercicios locales.

## Preparar el backend

```powershell
Set-Location backend
npm install
Copy-Item .env.example .env
```

Abre `backend/.env` y configura un secreto JWT aleatorio de al menos 32 caracteres.
Puedes generar uno con:

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

Para crear un administrador local, establece `ADMIN_EMAIL` y `ADMIN_PASSWORD` en
`.env` (de 8 a 72 bytes) y ejecuta:

```powershell
npm run seed:admin
```

Carga categorías y productos de ejemplo e inicia la API:

```powershell
npm run seed
npm run dev
```

La API estará en `http://localhost:3001`; el endpoint de salud es
`http://localhost:3001/api/health`.

## Iniciar Angular

En otra terminal, desde la raíz del proyecto:

```powershell
Set-Location frontend
npm install
npm start
```

Abre `http://localhost:4300`. El frontend consulta el catálogo del backend.

## API disponible en este avance

| Método | Ruta | Acceso | Estado |
|---|---|---|---|
| `POST` | `/api/auth/registro` | Público; crea clientes | Implementado |
| `POST` | `/api/auth/login` | Público | Implementado |
| `GET` | `/api/auth/me` | JWT válido | Implementado |
| `GET` | `/api/categorias` | Público; solo activas | Implementado |
| `GET` | `/api/categorias/admin/todas` | Administrador | Implementado |
| `POST`, `PATCH`, `DELETE` | `/api/categorias` y `/api/categorias/:id` | Administrador | Implementado |
| `GET` | `/api/productos` | Público; filtros `buscar` y `categoria` | Implementado |
| `GET` | `/api/productos/:id` | Público | Implementado |
| `GET` | `/api/productos/admin/todos` | Administrador | Implementado |
| `POST`, `PATCH`, `DELETE` | `/api/productos` y `/api/productos/:id` | Administrador | Implementado |
| CRUD | Usuarios, direcciones y pedidos | Según rol | Pendiente |

Para crear o editar un producto o categoría en Postman, agrega el encabezado
`Authorization: Bearer <token>` con el token de una cuenta administradora. El
registro público nunca permite escoger el rol `admin`.

## Modelo y propuesta

La especificación del proyecto está en [docs/propuesta.md](docs/propuesta.md).
Describe cinco entidades: Usuario, Categoria, Producto, DireccionEnvio y Pedido.
La implementación actual es parcial y no afirma que las cinco tengan CRUD completo.
La versión editable está en [docs/Propuesta_Raiz_Local.docx](docs/Propuesta_Raiz_Local.docx).

El estado y los pendientes del desarrollo están resumidos en
[docs/avance.md](docs/avance.md). Es un reporte complementario; las especificaciones
del curso no fijan un formato concreto para las revisiones parciales.
La versión editable está en [docs/Avance_Raiz_Local.docx](docs/Avance_Raiz_Local.docx).

El documento de uso de IA, con porcentajes y confirmación de revisión pendientes,
está en [docs/uso-ia.md](docs/uso-ia.md) y
[docs/Declaracion_Uso_IA_Raiz_Local.docx](docs/Declaracion_Uso_IA_Raiz_Local.docx).

## Documentos PDF

- [Propuesta](docs/Propuesta_Raiz_Local.pdf)
- [Reporte de avance](docs/Avance_Raiz_Local.pdf)
- [Registro de uso de IA](docs/Declaracion_Uso_IA_Raiz_Local.pdf)

## Próximos pasos

1. Construir formularios de inicio de sesión y registro en Angular.
2. Terminar CRUD de usuarios, direcciones y pedidos y restringir los datos al cliente propietario.
3. Agregar carrito, creación de pedidos y vistas administrativas.
4. Probar los flujos y revisar la aprobación de librerías externas con el profesor.

Las dependencias utilizadas son visibles en `backend/package.json` y
`frontend/package.json`; confirmar su aprobación con el profesor según los
lineamientos de la materia.
