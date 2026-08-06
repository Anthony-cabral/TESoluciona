# Seguridad en Procesamiento de Archivos

Tesoluciona separa las herramientas locales del procesamiento pesado en servidor.
El Lote 1 de PDF e imagenes se ejecuta en el navegador siempre que el navegador
soporte las APIs necesarias.

## Principios

- No registrar nombres originales de archivos en logs de servidor.
- No exponer archivos de entrada mediante URLs publicas.
- No almacenar contrasenas, tokens ni documentos de usuario.
- Validar extension, MIME y firma binaria antes de procesar.
- Usar identificadores aleatorios para cualquier trabajo temporal futuro.
- Eliminar entradas, resultados y errores temporales al cancelar, fallar o expirar.

## Limites Iniciales

- Herramientas locales: hasta 20 archivos por lote.
- PDF local: hasta 25 MB por archivo.
- Imagen local: hasta 15 MB por archivo para conversion y compresion.
- Trabajos futuros en servidor: maximo 2 reintentos y timeout de 900 segundos.

## PDF Protegidos

No se intenta romper protecciones ni contrasenas. Cualquier herramienta que quite
una contrasena solo podra funcionar si el usuario conoce y proporciona la clave.
En el Lote 1 no se implementa eliminacion de proteccion.

## Trabajos Pesados Futuros

Video, audio, IA y documentos grandes deben pasar por cola, rate limiting,
cancelacion, progreso, expiracion y limpieza automatica. La arquitectura Prisma
incluye `Job`, `JobFile`, `JobResult` y `JobError` para ese flujo, pero no activa
servicios de pago ni proveedores externos.
