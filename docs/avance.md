# Avance del proyecto: Raíz Local

**Materia:** Aplicaciones Web Escalables | **Estudiante:** [Nombre completo] | **Fecha:** 13 de noviembre de 2026 | **Estado:** avance parcial

## Qué pide esta etapa

Las especificaciones del curso dicen que la primera entrega es la propuesta del
proyecto y enumeran los apartados que debe llevar. También mencionan revisiones con
el profesor durante el semestre, pero no indican un formato fijo para reportar cada
avance. Este documento sirve como resumen complementario; no reemplaza la
propuesta.

## Qué hay hasta ahora

Raíz Local es una tienda web de artesanías. El catálogo público está hecho en
Angular y se conecta con la API para mostrar, buscar y filtrar productos. En el
backend ya están el registro, el inicio de sesión con JWT y las operaciones
administrativas de categorías y productos.

Hay cinco modelos en MongoDB, pero solo Categoría y Producto tienen el CRUD
completo. Los otros tres modelos todavía necesitan sus rutas y operaciones.

## Revisión contra los requisitos del curso

| Requisito | Estado |
|---|---|
| Propuesta con objetivo, alcance, funciones, módulos y modelo de datos | Incluida en `propuesta.md` |
| Stack MEAN | Estructura inicial implementada |
| Pantallas responsivas | Catálogo adaptado; faltan las demás pantallas |
| Angular conectado a una API REST mediante servicios | Implementado para el catálogo |
| API Node.js y Express con controladores y middlewares | Implementada para acceso, categorías y productos |
| MongoDB y modelos Mongoose | Cinco modelos definidos |
| CRUD en al menos cinco entidades | Parcial: Categoría y Producto completos; faltan tres |
| JWT y permisos | Registro e inicio de sesión funcionan; las rutas administrativas requieren el rol correspondiente |
| Visitante, cliente y administrador | Roles contemplados; todavía faltan funciones de cliente y administrador |
| Manejo de errores | Incluido en los flujos existentes; falta revisar los módulos futuros |
| Aprobación de librerías externas | Por confirmar con el profesor |

## Lo que ya está hecho

- Registro de clientes e inicio de sesión.
- Contraseñas guardadas con hash y autenticación con JWT.
- Consulta pública del catálogo y detalle de producto.
- Búsqueda y filtro por categoría desde Angular.
- CRUD de categorías y productos en la API.
- Validación para no borrar una categoría que todavía tiene productos.
- Tres categorías y cuatro productos de ejemplo.
- MongoDB local aislado en Docker.

## Pruebas realizadas

- La compilación de producción de Angular terminó correctamente.
- Se probaron registro, inicio de sesión, hash de contraseñas y permisos JWT.
- Se probaron las operaciones CRUD de categorías y productos, la búsqueda y el
  bloqueo al borrar categorías relacionadas con productos.
- Se volvió a ejecutar la carga de datos de ejemplo para comprobar que se puede
  repetir.
- La auditoría de dependencias de producción del backend no encontró
  vulnerabilidades conocidas en esa revisión.

Estas pruebas corresponden al avance técnico. Antes de entregar, el estudiante
debe probar el proyecto en su equipo, revisar los resultados y poder explicar el
código.

## Lo que falta

1. Completar el CRUD de Usuario, Dirección de envío y Pedido.
2. Asegurar que cada cliente solo pueda consultar sus direcciones y pedidos.
3. Crear las pantallas de acceso, cuenta, pedidos y administración en Angular.
4. Agregar el carrito y la creación de pedidos. No se planean cobros reales.
5. Probar los nuevos flujos y revisar sus mensajes de error.
6. Confirmar con el profesor la aprobación de las librerías.
7. Revisar y comprender el código, y completar la declaración de uso de IA con
   datos reales.

La propuesta está en `propuesta.md`; las instrucciones para ejecutar el proyecto
están en el `README.md` de la carpeta principal.
