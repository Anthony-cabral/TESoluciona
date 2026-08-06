# Roadmap del Centro de Herramientas

El centro de herramientas se implementa por lotes para evitar publicar
utilidades decorativas o incompletas.

## Lote 1: Activo

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

Estas herramientas procesan localmente cuando el navegador lo permite.

## Lote 2: Pendiente

- Video a MP4 para archivos subidos
- Video a MP3 para archivos subidos
- Recortar video
- Comprimir video
- Audio a MP3
- Recortar audio
- Transcribir archivo de audio
- Transcribir archivo de video

Requiere cola de trabajos, worker, limpieza automatica, limites por IP y
almacenamiento temporal seguro.

## Lote 3: Pendiente

- CSV/JSON/XML/YAML
- Herramientas de texto
- Herramientas de desarrollo avanzadas

## Restricciones Permanentes

No se implementara un descargador general de YouTube ni conversion de enlaces de
YouTube a MP3/MP4. Solo se permitiran archivos propios o autorizados, subtitulos
aportados por el usuario y metadatos publicos permitidos por APIs oficiales.
