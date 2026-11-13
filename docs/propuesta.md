# Propuesta: Raíz Local

**Tienda web de artesanías y productos locales**  
**Materia:** Aplicaciones Web Escalables | **Estudiante:** [Nombre completo] | **Fecha:** [Completar]

## 1. De qué trata

Raíz Local será una tienda web para mostrar artesanías y regalos de productores
locales. Una persona podrá revisar el catálogo sin iniciar sesión. Si crea una
cuenta, podrá guardar direcciones y consultar sus pedidos. El administrador podrá
mantener el catálogo y revisar los pedidos.

La idea es desarrollar una sola tienda, no un sitio donde cada vendedor tenga su
propia cuenta. En el alcance inicial tampoco se harán cobros reales ni se conectará
una paquetería.

## 2. Objetivo

Crear una aplicación web con Angular, Node.js, Express y MongoDB para consultar y
administrar el catálogo de Raíz Local. También se busca practicar el registro de
usuarios, el control de acceso y el manejo de pedidos mediante una API.

## 3. Alcance

El proyecto contempla:

- Consultar productos, buscar por nombre y filtrar por categoría.
- Crear una cuenta e iniciar sesión.
- Administrar categorías y productos.
- Guardar direcciones de envío y registrar pedidos.
- Separar las funciones de visitantes, clientes y administradores.
- Adaptar las pantallas a móvil y escritorio.

Por ahora quedan fuera los pagos en línea, el seguimiento de envíos en tiempo real,
una aplicación móvil y el soporte para múltiples vendedores.

## 4. Usuarios y permisos

| Usuario | Qué podrá hacer |
|---|---|
| Visitante | Ver el catálogo y los detalles; registrarse o iniciar sesión. |
| Cliente | Administrar sus datos y direcciones, y trabajar con sus propios pedidos. |
| Administrador | Administrar productos y categorías; consultar pedidos y usuarios. |

El registro desde el sitio crea cuentas de cliente. No se permitirá que alguien se
asigne el rol de administrador desde el formulario.

## 5. Funciones principales

1. Ver productos, buscarlos por nombre y filtrarlos por categoría.
2. Consultar el precio, la disponibilidad y los detalles de un producto.
3. Registrarse e iniciar sesión.
4. Crear, consultar, actualizar y eliminar productos y categorías.
5. Guardar direcciones de envío de cada cliente.
6. Crear pedidos, revisar su estado y cancelarlos cuando corresponda.
7. Permitir que el administrador revise las cuentas y los pedidos.

Los pedidos se guardarán en el sistema, pero no se realizará ningún cobro.

## 6. Módulos

- **Catálogo:** lista de productos, búsqueda, filtros y detalles.
- **Acceso:** registro, inicio de sesión y cierre de sesión.
- **Cuenta:** perfil y direcciones de envío del cliente.
- **Catálogo administrativo:** mantenimiento de categorías y productos.
- **Pedidos:** resumen de compra, dirección y estado.
- **Administración:** revisión de pedidos y cuentas.

## 7. Datos que guardará el sistema

La propuesta considera cinco entidades. Las cinco deberán tener operaciones de
crear, consultar, actualizar y eliminar cuando el proyecto esté completo.

### Usuario

`nombre`, `apellidos`, `correo` (único), `passwordHash`, `rol` (`cliente` o
`admin`) y fechas de creación y actualización. El visitante sin sesión no se guarda
como usuario.

### Categoría

`nombre`, `slug` (único), `descripcion`, `activa` y fechas de creación y
actualización.

### Producto

`nombre`, `descripcion`, `precio`, `imagenUrl`, `stock`, `categoria` (referencia a
Categoría), `activo` y fechas de creación y actualización.

### Dirección de envío

`usuario` (referencia a Usuario), `alias`, `calle`, `numeroExterior`, `colonia`,
`codigoPostal`, `ciudad`, `estado`, `pais`, `referencia` y `predeterminada`. El
cliente solo podrá consultar y cambiar sus propias direcciones.

### Pedido

`usuario` y `direccion` como referencias; una lista de productos con su nombre,
precio unitario y cantidad; además de `subtotal`, `costoEnvio`, `total`, `estado` y
fechas. El pedido conservará el precio del producto al momento de la compra, aunque
el precio del catálogo cambie después.

### Relaciones

- Una categoría puede tener varios productos.
- Un usuario puede tener varias direcciones y varios pedidos.
- Cada pedido pertenece a un usuario, utiliza una dirección y contiene productos.

## 8. Cómo se conectan las partes

El navegador usa Angular y se comunica con la API mediante servicios HTTP. La API
está hecha con Express y Node.js; usa Mongoose para validar y guardar datos en
MongoDB. Las rutas privadas verifican el token JWT y el rol antes de permitir una
operación.

## 9. Requisitos de calidad

- Las pantallas deberán adaptarse a distintos tamaños de pantalla.
- Las contraseñas se guardarán con hash, no en texto plano.
- Los datos se validarán en el servidor y en los formularios.
- Los errores deberán explicar qué ocurrió sin mostrar detalles internos.
- Las claves y cadenas de conexión se guardarán en variables de entorno, no en el
  repositorio.
- Se evitará usar jQuery para manipular el DOM.

## 10. Plan de trabajo

1. Presentar la propuesta y preparar el catálogo básico.
2. Completar el catálogo y el acceso con JWT.
3. Agregar direcciones y pedidos.
4. Completar las pantallas administrativas, las pruebas y la documentación.

## 11. Avance actual

Ya hay modelos para las cinco entidades, registro e inicio de sesión con JWT, y
CRUD de categorías y productos en la API. El catálogo Angular permite buscar,
filtrar y abrir el detalle de un producto.

El avance todavía no cumple el requisito de CRUD completo en cinco entidades:
faltan Usuario, Dirección de envío y Pedido. También faltan las pantallas de
cuenta, pedidos y administración, además del flujo de carrito.

## 12. Librerías

La aplicación usa el stack MEAN y otras librerías necesarias para la API, la
autenticación y la conexión a MongoDB. Las especificaciones del curso indican que
las librerías externas deben contar con aprobación del profesor; está pendiente
confirmar las dependencias propuestas.
