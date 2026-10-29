# Cómo activar la Clasificación compartida del curso

BIOROSCO ya muestra las marcas guardadas en el celular de cada alumno.
Para que toda la clase comparta una misma clasificación (General / 1° A / 1° B),
hay que conectar una planilla de Google con este Apps Script. Son 10 minutos,
gratis, con tu cuenta de Google.

## Pasos

1. Creá una planilla nueva en [Google Sheets](https://sheets.new) para este juego
   (por ejemplo, "BIOROSCO · Participación").
   No hace falta crear columnas: el script las arma solo la primera vez.

2. Dentro de la planilla: **Extensiones → Apps Script**.

3. Borrá lo que haya en el editor y pegá **todo el contenido de `ranking.gs`**
   (está en este mismo repositorio).

4. Guardá y tocá **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
   - Implementar y autorizar los permisos que pide (es tu propia planilla).

5. Copiá la URL que te da (termina en `/exec`).

6. En `app.js`, buscá la línea:

   ```js
   const RANKING_URL="";
   ```

   y pegá tu URL entre las comillas:

   ```js
   const RANKING_URL="https://script.google.com/macros/s/TU-ID/exec";
   ```

7. Subí el `app.js` actualizado al repositorio y listo: cada vez que un
   alumno termina una partida, sus puntos se suman a la clasificación
   que ven todos.

## Notas

- La clasificación **acumula**: puntos totales de todas las partidas,
  así premia la constancia. Partidas "sin reloj" o de repaso no se envían.
- La planilla queda privada tuya: el juego solo puede escribir filas y leer
  la tabla agregada; nadie más puede abrirla si no la compartís.
- Si algún día querés reiniciar el ranking, borrá las filas de la pestaña
  `partidas` (dejá el encabezado).
- Este script es del mismo estilo que el de otros juegos tuyos, pero es
  **una planilla distinta**: así cada juego tiene su propia clasificación.
