# Webs Studio — cambios y pasos para activar la web

## Cambios realizados

- Sustituí las fichas de muestra por siete repositorios públicos de la cuenta **WebsStudio**: Racing Garage, Lúmina Hair Studio, OpticaPRO Novavisio, Casa Nocturna, BRAVA Climatización, Mudanzas Lura y Terra Restaurant.
- Los botones **Ver repositorio** llevan al código de GitHub. No enlazan a páginas web publicadas, porque GitHub no informa de una URL publicada para esos repositorios.
- Marqué los conceptos/demos cuando el repositorio lo indica y evité atribuir resultados o clientes ficticios.
- Actualicé el teléfono a **+34 663 236 304**, con enlaces para llamar y abrir WhatsApp.
- Conecté el formulario con FormSubmit para enviar las consultas a **webslocalstudio@gmail.com**. Está pendiente activar y probar el correo con el primer envío.
- Conservé páginas legales como borradores. La política de privacidad debe indicar el proveedor externo del formulario antes de publicar.

## Pasos para que lleguen los correos

1. Sube los archivos actualizados a la raíz del repositorio `WebsStudio/WebsLocalStudio`, incluyendo `projects-data.js`, `script.js`, `trabajos.js` y las páginas HTML.
2. Activa GitHub Pages si aún no está activo: en el repositorio abre **Settings → Pages → Deploy from a branch**, elige `main` y `/(root)`, y guarda.
3. Abre la web ya publicada y envía el formulario una primera vez con datos de prueba. FormSubmit enviará un correo de activación a **webslocalstudio@gmail.com**.
4. Abre ese correo y pulsa el enlace de activación para autorizar que FormSubmit entregue los mensajes a esa dirección.
5. Envía el formulario una segunda vez y comprueba que llega el mensaje. Si no aparece, revisa Spam/Correo no deseado y confirma que el correo de activación quedó completado.
6. A partir de ahí, los envíos del formulario se remitirán a esa bandeja. El visitante verá una confirmación de envío o un aviso de error; no necesita tener configurada una aplicación de correo.

El formulario usa el endpoint AJAX de FormSubmit. Es un servicio externo: revisa sus condiciones y su funcionamiento antes de publicar, y declara el proveedor y el tratamiento de los datos en la política de privacidad. No envíes datos sensibles por este formulario. Para probar el envío real se requiere completar los pasos de activación desde el buzón.

## Antes de publicar

1. Completa y revisa los datos entre corchetes en `aviso-legal.html` y `privacidad.html`. Revisa también `cookies.html`. No publiques los borradores legales; cuando estén terminados, elimina `noindex,nofollow`.
2. Confirma que las fichas y los contenidos de cada repositorio se pueden presentar públicamente como portfolio. Algunas webs son conceptos de demostración; no las atribuyas a clientes sin permiso.
3. Comprueba el correo, el teléfono y los dos enlaces de contacto.
4. Prueba filtros, fichas, formulario, WhatsApp y llamada en ordenador y móvil.
5. La página carga Tailwind desde su CDN de navegador, Google Fonts, iconos e imágenes de vista previa desde Internet. Para una publicación profesional conviene compilar Tailwind a CSS estático.

## Archivos

- `index.html`: página principal.
- `projects-data.js`: catálogo compartido de repositorios.
- `script.js`: filtros, fichas, menú móvil y formulario.
- `trabajos.html` y `trabajos.js`: catálogo completo con filtros y fichas.
- `code trabajos.html`: copia sincronizada, conservada con el nombre original que enviaste.
- `aviso-legal.html`, `privacidad.html`, `cookies.html`: borradores legales.
- `DESIGN.md`: sistema visual original.
