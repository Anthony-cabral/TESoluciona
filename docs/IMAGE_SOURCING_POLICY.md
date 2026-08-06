# Politica de busqueda y licencias de imagenes

Esta politica define como Tesoluciona selecciona, revisa y publica imagenes para guias, tutoriales, paginas de errores y herramientas.

## Principio principal

Las guias de Tesoluciona deben usar capturas reales o recursos visuales existentes con licencia verificable. No se deben crear mockups genericos ni interfaces inventadas para representar Windows, Outlook, Chrome, Edge, Microsoft 365, impresoras, routers, aplicaciones o configuraciones reales.

Si no existe una imagen legalmente clara para un paso, el paso queda marcado como pendiente de imagen. No se sustituye con una imagen dudosa.

Cada articulo debe usar imagenes propias del procedimiento que explica. Una imagen aprobada no se reutiliza en otro articulo salvo que el paso sea exactamente el mismo procedimiento, con la misma pantalla y la misma finalidad tecnica. Si la coincidencia no es exacta, se deja pendiente.

## Fuentes preferidas

1. Wikimedia Commons.
2. Openverse, abriendo siempre la fuente original antes de descargar.
3. Repositorios oficiales con una politica de reutilizacion explicita.
4. Bibliotecas de dominio publico.
5. Documentacion oficial solo cuando sus terminos permitan reutilizacion comercial de la imagen.
6. Capturas propias producidas en laboratorio, sin informacion personal, credenciales, tenants, rutas internas, correos, IPs publicas, claves o datos de clientes.

Google Imagenes puede usarse solo como buscador para encontrar la pagina original. Nunca se descarga una imagen directamente desde los resultados de Google.

## Licencias permitidas

- Dominio publico.
- CC0.
- CC BY con uso comercial permitido.
- CC BY-SA con uso comercial permitido y atribucion visible, respetando share-alike cuando corresponda.
- Recurso oficial con permiso claro de reutilizacion.
- Imagen comprada o autorizada expresamente por el titular.

## Licencias y fuentes no permitidas

- Imagenes sin licencia identificable.
- Capturas copiadas de blogs, foros, redes sociales o Pinterest.
- Imagenes con copyright reservado sin permiso.
- CC BY-NC, CC BY-NC-SA o cualquier licencia solo no comercial.
- Imagenes con marca de agua no autorizada.
- Imagenes cuyo autor o titular no pueda identificarse.
- Hotlinking.
- Capturas con informacion personal, credenciales, tokens, correos, tenant IDs, MAC reales identificables, IPs publicas, claves o datos de clientes.

## Revision obligatoria antes de usar una imagen externa

Antes de descargar o publicar una imagen, se debe confirmar:

1. Pagina original abierta y revisada.
2. Autor identificado.
3. Titular de derechos identificado cuando sea distinto del autor.
4. Licencia exacta identificada.
5. Uso comercial permitido.
6. Modificaciones permitidas o prohibidas.
7. Atribucion requerida o no requerida.
8. URL de la licencia guardada.
9. Fecha de consulta registrada.
10. Ausencia de restricciones adicionales evidentes.

Si uno de estos puntos no puede verificarse, la imagen no se publica.

## Descarga y almacenamiento

- Toda imagen aprobada se descarga al almacenamiento propio del proyecto.
- No se permite hotlinking.
- Las imagenes publicas se guardan en `public/images/solutions`.
- Los nombres de archivo deben ser descriptivos.
- La conversion a WebP o AVIF solo se realiza cuando la licencia permite modificaciones.
- No se deforman imagenes ni se recorta informacion relevante.
- Se redactan datos sensibles solo cuando la licencia permite modificaciones.

## Registro de atribuciones

Cada imagen externa aprobada debe registrarse en `content/image-attributions.json` con el esquema vigente. No se publica ninguna imagen cuyo `reviewStatus` no sea `approved`.

## Calidad editorial

Cada imagen debe:

- corresponder al paso explicado;
- ser legible en movil;
- poder ampliarse;
- incluir texto alternativo descriptivo;
- incluir pie de imagen;
- indicar si corresponde a otra version o idioma de la interfaz;
- evitar capturas antiguas cuando el articulo trate versiones recientes.

## Capturas pendientes

Cuando una guia necesite una captura y no exista una fuente legal clara, se debe registrar el pendiente y mostrar un aviso editorial en el articulo. El aviso debe explicar que no se publica una imagen hasta verificar una licencia compatible o producir una captura propia segura.
