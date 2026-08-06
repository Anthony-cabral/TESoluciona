# Modelo de Privacidad de Herramientas

Cada herramienta publica debe declarar:

- modo de procesamiento: local, servidor, hibrido o proveedor externo;
- si sube archivos;
- cuanto tiempo se conservan los datos;
- formatos admitidos;
- limites de tamano;
- si usa IA;
- si usa terceros.

## Lote 1

Las herramientas activas de PDF e imagenes procesan archivos localmente:

- Imagenes a PDF
- JPG a PDF
- Unir PDF
- Dividir PDF
- Comprimir PDF
- PDF a JPG
- JPG a PNG
- PNG a JPG
- Redimensionar imagen
- Comprimir imagen

Los archivos permanecen en memoria del navegador. Los enlaces de descarga se
crean con `URL.createObjectURL` y se revocan al limpiar la herramienta o cerrar
la pagina.

## IA y Terceros

Las herramientas con IA quedan desactivadas hasta configurar un proveedor y
mostrar consentimiento explicito. No se enviaran imagenes, audio, video ni texto
a terceros sin informar al usuario.

## Administracion y Logs

Las futuras rutas de servidor deben evitar registrar nombres de archivos,
contenido, claves o datos personales. Cuando haga falta trazabilidad, se usaran
hashes y metadatos no reversibles.
