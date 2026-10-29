# BIOROSCO · El desafío de la vida

Rosco (pasapalabra) de biología para celular, pensado para 1° año.
Biología de Salta: la célula y sus organelas, biomoléculas, metabolismo,
niveles de organización y ambientes de las Yungas y la Puna.

**Jugar:** https://patodoc27.github.io/biorosco/

## Modos de juego

- **Solo**: vos contra el reloj, rosco completo.
- **Contra Boti**: se turnan con un robot que responde, pasa y se equivoca.
- **Multijugador en línea**: dos celulares, un código de sala de 4 letras.
  Cada jugador tiene su propio reloj y ve el tipeo del otro en vivo
  (Supabase Realtime, sin cuentas ni tablas).

## Reglas

- 24 letras (A–Y con Ñ, sin K/W/Z); cada letra tiene varias palabras
  posibles: el rosco cambia en cada partida.
- La palabra **empieza** o **contiene** la letra; hay que escribirla con
  tildes (si falta una tilde se avisa sin perder la letra).
- **Pasapalabra** deja la letra para la vuelta. La última hay que responderla.
- Cada letra tiene su propia barra de tiempo, además del reloj del jugador.
- Puntaje: 100 por acierto + bonus de rapidez de hasta 99.
- Clasificación: suma de puntos por persona (ver `instrucciones_ranking.md`
  para conectar la planilla compartida del curso).
- Opción "Sin reloj" = práctica: no va a la clasificación, y con doble
  intento por letra más pista clave.

## Archivos

- `index.html` — la app entera (marcado + estilos).
- `app.js` — lógica del juego, sonidos, voz, modo en línea.
- `palabras.js` — banco de palabras (el mismo del Pasapalabra Bio).
- `fondos/`, `avatares/` — imágenes.
- `ranking.gs` — Apps Script de la clasificación compartida.
- `instrucciones_ranking.md` — cómo conectarla.

## En el celular

Funciona en el navegador de Android e iPhone; se puede "instalar" con
*Agregar a la pantalla de inicio* (PWA, `manifest.webmanifest` + íconos).
