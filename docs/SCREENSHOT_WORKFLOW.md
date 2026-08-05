# Flujo de imágenes y capturas

Tesoluciona puede usar imágenes en guías públicas solo cuando sean seguras para publicación.

## Reglas obligatorias

- No subir capturas con correos, nombres de usuario, IPs públicas, claves, tokens, rutas internas, tenant IDs o datos de clientes.
- Preferir mockups originales de laboratorio cuando una pantalla real pueda revelar información privada.
- Guardar imágenes públicas en `public/images/solutions`.
- Registrar cada imagen en `content/image-attributions.json`.
- Incluir texto alternativo descriptivo, pie de imagen y enlace de crédito.
- Verificar que la licencia permita uso comercial, modificación y atribución antes de usar imágenes externas.

## Componentes disponibles

- `StepImage`: imagen de paso con pie, crédito y ampliación.
- `ImageLightbox`: visor accesible para ampliar una imagen.
- `ImageCredit`: enlace a la página de créditos.
- `AnnotatedScreenshot`: alias para capturas anotadas.
- `BeforeAfterImage`: comparativa antes/después cuando aplique.

## Revisión antes de commit

1. Confirmar que la imagen no contiene secretos ni información personal.
2. Confirmar que `content/image-attributions.json` incluye fuente, autor, licencia y permisos.
3. Confirmar que el artículo muestra la imagen con `alt` útil y pie de imagen.
4. Ejecutar `npm run lint`, `npm run typecheck`, `npm run test` y `npm run build`.
