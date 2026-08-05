# Flujo de imagenes y capturas

Tesoluciona puede usar imagenes en guias publicas solo cuando sean seguras para publicacion y tengan licencia compatible.

## Reglas obligatorias

- No subir capturas con correos, nombres de usuario, IPs publicas, claves, tokens, rutas internas, tenant IDs o datos de clientes.
- No usar mockups genericos ni interfaces inventadas para representar Windows, Outlook, Chrome, Edge, Microsoft 365, impresoras o configuraciones reales.
- Si no existe una fuente legal clara, dejar la imagen como pendiente y documentar que falta una captura propia segura o un recurso con licencia verificable.
- Guardar imagenes publicas en `public/images/solutions`.
- Registrar cada imagen aprobada en `content/image-attributions.json`.
- Incluir texto alternativo descriptivo, pie de imagen y enlace de credito.
- Verificar que la licencia permita uso comercial, modificacion y atribucion antes de usar imagenes externas.

## Componentes disponibles

- `StepImage`: imagen de paso con pie, credito y ampliacion.
- `ImageLightbox`: visor accesible para ampliar una imagen.
- `ImageCredit`: enlace a la pagina de creditos.
- `AnnotatedScreenshot`: alias para capturas anotadas.
- `BeforeAfterImage`: comparativa antes/despues cuando aplique.

## Revision antes de commit

1. Confirmar que la imagen no contiene secretos ni informacion personal.
2. Confirmar que `content/image-attributions.json` incluye fuente, autor, licencia y permisos.
3. Confirmar que el articulo muestra la imagen con `alt` util y pie de imagen.
4. Completar `docs/IMAGE_REVIEW_CHECKLIST.md`.
5. Ejecutar `npm run lint`, `npm run typecheck`, `npm run test` y `npm run build`.
