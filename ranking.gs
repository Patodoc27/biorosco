/*
 * CLASIFICACIÓN DE BIOROSCO · Apps Script
 *
 * Qué hace:
 *   - doPost(e): recibe una partida terminada y la agrega como fila
 *     en la pestaña "partidas" de la planilla.
 *   - doGet(e): devuelve la clasificación como JSON:
 *       ?top=200  → las 200 personas con más puntos acumulados.
 *
 * La clasificación acumula por persona (nombre + apellido + sección):
 *   puntos    → suma de puntos de todas sus partidas
 *   aciertos  → suma de aciertos
 *   partidas  → cuántas partidas jugó
 *   avatar    → el de su última partida
 *
 * Columnas de la pestaña "partidas" (se crean solas la primera vez):
 *   fecha | nombre | apellido | seccion | avatar | modo |
 *   aciertos | errores | pasadas | total | puntos | tiempo_seg | inicio
 */

const SHEET = "partidas";
const HEADER = ["fecha","nombre","apellido","seccion","avatar","modo",
  "aciertos","errores","pasadas","total","puntos","tiempo_seg","inicio"];

function hoja() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(HEADER);
  }
  if (sh.getLastRow() === 0) sh.appendRow(HEADER);
  return sh;
}

function limpio_(s, n) {
  return String(s || "").replace(/[<>&"'`]/g, "").replace(/\s+/g, " ").trim().slice(0, n || 60);
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const sh = hoja();
    sh.appendRow([
      new Date(),
      limpio_(d.nombre, 24),
      limpio_(d.apellido, 24),
      limpio_(d.seccion, 12),
      Math.max(0, Math.min(7, parseInt(d.avatar, 10) || 0)),
      limpio_(d.modo, 14),
      parseInt(d.aciertos, 10) || 0,
      parseInt(d.errores, 10) || 0,
      parseInt(d.pasadas, 10) || 0,
      parseInt(d.total, 10) || 0,
      parseInt(d.puntos, 10) || 0,
      parseFloat(d.tiempo_seg) || 0,
      limpio_(d.inicio, 4)
    ]);
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const top = Math.min(parseInt((e && e.parameter && e.parameter.top) || 100, 10) || 100, 500);
  const sh = hoja();
  const last = sh.getLastRow();
  const lista = [];
  if (last > 1) {
    const v = sh.getRange(2, 1, last - 1, HEADER.length).getValues();
    const por = {};
    v.forEach(r => {
      const clave = (norm_(r[1]) + "|" + norm_(r[2]) + "|" + norm_(r[3]));
      if (!por[clave]) por[clave] = {
        nombre: r[1], apellido: r[2], seccion: r[3], avatar: r[4],
        puntos: 0, aciertos: 0, partidas: 0
      };
      const p = por[clave];
      p.puntos += (+r[10]) || 0;
      p.aciertos += (+r[6]) || 0;
      p.partidas += 1;
      p.avatar = r[4];
      p.seccion = r[3];
    });
    Object.keys(por).forEach(k => lista.push(por[k]));
  }
  lista.sort((a, b) => b.puntos - a.puntos || b.aciertos - a.aciertos || a.partidas - b.partidas);
  return out_(lista.slice(0, top));
}

function norm_(s) {
  return String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function out_(obj) {
  return ContentService
    .createTextOutput(typeof obj === "string" ? obj : JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
