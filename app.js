/* ============================================================
   BIOROSCO · El desafío de la vida
   Rosco de biología para celular: solo, contra Boti o en línea.
   Mismo banco de palabras que el Pasapalabra de Biología.
   ============================================================ */
"use strict";
const $=id=>document.getElementById(id);
const luego=(f,ms)=>{const t=setTimeout(f,ms);timers.push(t);return t;};

/* ===== ICONOS (SVG inline, sin emojis del sistema) ===== */
const ICO={
check:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5L19.5 7"/></svg>',
equis:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
giro:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 3.5v5h5"/></svg>',
reloj:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9.5 2.5h5"/></svg>',
corona:'<svg viewBox="0 0 34 26" fill="currentColor"><path d="M2 22h30l-2-14-7 5-6-9-6 9-7-5z"/><rect x="2" y="23" width="30" height="3" rx="1.5"/></svg>',
sonido:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none"/><path d="M16 9a4.5 4.5 0 0 1 0 6"/><path d="M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
mudo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none"/><path d="M17 9l5 6M22 9l-5 6"/></svg>',
voz:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
novoz:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11a7 7 0 0 0 10.7 5.9M19 11a6.9 6.9 0 0 0-.4-2.3M12 18v3"/><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M3 3l18 18"/></svg>',
sol:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3L17 7M7 17l-1.7 1.7"/></svg>',
luna:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>'};

/* ===== AVATARES (fauna del NOA + Boti) ===== */
const AVATARES=["flamenco","tapir","jaguar","tucan","vicuna","nandu","boti"];
const AVATAR_BOTI=AVATARES.length-1;
const avSrc=i=>"avatares/"+AVATARES[i]+".webp";
const escH=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
const limpiaNom=s=>String(s||"").replace(/[<>&"'`]/g,"").replace(/\s+/g," ").trim().slice(0,49);
const limpiaSec=s=>String(s||"").replace(/[<>&"'`]/g,"").slice(0,12);
const nombreBonito=s=>String(s||"").replace(/\s+/g," ").trim().toLowerCase().replace(/(^|\s)(\S)/g,(m,a,l)=>a+l.toUpperCase());
const corto=s=>{const p=nombreBonito(s).split(" ");return p.length>1?p[0]+" "+p[p.length-1][0].toUpperCase()+".":p[0];};
const norma=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim();

/* ===== NORMALIZACIÓN DE RESPUESTAS ===== */
const limpio=s=>s.toLowerCase().replace(/[^a-záéíóúüñ ]/g," ").replace(/\s+/g," ").trim()
  .replace(/^(el|la|los|las|un|una|unos|unas) /,"");
const pelado=s=>limpio(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ñ/g,"n");
const acepta=(it,txt)=>[it.p].concat(it.v||[]).some(x=>limpio(x)===limpio(txt));
const casiAcepta=(it,txt)=>[it.p].concat(it.v||[]).some(x=>pelado(x)===pelado(txt));
const TODAS=Object.keys(POOL).reduce((a,l)=>a.concat(POOL[l].map(x=>x.p)),[]);

/* ===== ESTADO ===== */
let items=[],estado=[],respondio=[],idx=0,turno=0,nombres=["",""],puntos=[0,0],rachas=[0,0];
let seccion="1° A",nRosco=0,jugados=[],letraIni="",avatarIdx=0;
let seg=360,rel=[360,360],usado=[0,0],tIni=0,sinReloj=false,cron=null;
let jugando=false,bloqueado=false,arranque=true,partidaViva=false,recuperacion=false,pendientesRepaso=[];
let solo=true,conBot=false,enLinea=false,yo=0,intentos=0,timers=[];
let sonido=true,lectura=true,vozElegida=null;
const soportaVoz="speechSynthesis" in window;
const BOT={ok:.8,pasa:.12,racha:3,nombre:"Boti"},ACIERTE_BOT=[.95,.85,.8,.75];
let rachaBot=0;
const esBot=()=>conBot&&turno===1;
const miTurno=()=>!enLinea||turno===yo;
const limpiarTimers=()=>{timers.forEach(clearTimeout);timers=[];callar();};
const fmt=s=>String(Math.floor(Math.max(s,0)/60)).padStart(2,"0")+":"+String(Math.max(s,0)%60).padStart(2,"0");
const fmtT=ms=>{const s=Math.max(0,ms)/1000,m=Math.floor(s/60);let r=(s-m*60).toFixed(1).replace(".",",");if(r.length<4)r="0"+r;return m+":"+r;};
const mostrar=id=>{document.querySelectorAll(".pantalla").forEach(p=>p.classList.remove("activa"));$(id).classList.add("activa");
  if(id!=="p-rosco")callar();chatUbicar(id);window.scrollTo(0,0);};
const OPC_TIEMPO=[{s:360,t:"Normal · 6 min"},{s:240,t:"Intermedio · 4 min"},{s:120,t:"Intenso · 2 min"},{s:0,t:"Sin reloj · práctica"}];
const nombreModo=s=>+s===0?"Sin reloj · práctica":+s<=120?"Intenso · 2 min cada uno":+s<=240?"Intermedio · 4 min cada uno":"Normal · 6 min cada uno";

/* ===== FRASES DE ÁNIMO (en el feedback, sin mascotita) ===== */
const FRASES={
ok:["¡Bien esa!","¡De una!","¡Directo al ADN!","¡Qué nivel!","¡Así se juega!","¡Se nota que estudiaste!","¡Respuesta de manual!","¡Esa sale en el examen!","¡Tremendo!","¡Clarísima!","¡Puro conocimiento!","¡Brillante!"],
mal:["Se escapó…","La próxima entra","No pasa nada, seguí","Esa se repasa","El rosco perdona, dale","Errar también es ciencia","Se resistió esa letra","Mirá la pista y sale","Quedó para el repaso","La próxima es tuya"],
casi:["¡Le falta la tilde!","Fijate el acento","Está ahí nomás…","Se dice parecido…"],
pas:["Vuelve después","Quedó picando","Esa vuelve, eh","Anotada para la vuelta"],
bot:["Boti está pensando…","Ojo que Boti sabe…","Boti afina el cerebro…","¿La clavará Boti?"],
riv:["¿La sabrá?","Shh, está pensando…","Ojo que sabe…","Atento a la vuelta","A ver qué responde…"],
va:["¡Dale que va!","¡Con toda!","¡El rosco es tuyo!","¡Respirá y mandale!","¡Esta la sabés!"]};
const frase=k=>{const a=FRASES[k]||[];return a.length?a[Math.floor(Math.random()*a.length)]:"";};

/* ===== SONIDO ===== */
let ctx=null;
function audio(){if(!ctx){try{ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}if(ctx&&ctx.state==="suspended")ctx.resume();return ctx;}
function tono(f,dur,tipo,vol,delay){tipo=tipo||"triangle";vol=(vol==null)?.16:vol;delay=delay||0;
  if(!sonido)return;const c=audio();if(!c)return;
  const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;
  o.type=tipo;o.frequency.setValueAtTime(f,t);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.012);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur+.03);}
let tac=false;
const tic=u=>{tac=!tac;u?tono(tac?1900:1500,.06,"square",.12):tono(tac?1250:900,.05,"triangle",.09);};
const sOk=()=>[660,880,1320].forEach((f,i)=>tono(f,.18,"triangle",.17,i*.09));
const sMal=()=>{tono(200,.22,"sawtooth",.14);tono(140,.3,"sawtooth",.12,.1);};
const sPas=()=>{tono(520,.09,"sine",.14);tono(760,.12,"sine",.12,.07);};
const sTurno=()=>{tono(880,.1,"sine",.12);tono(1175,.14,"sine",.11,.09);};
const sTecla=()=>tono(1400,.02,"square",.05);
const sFin=()=>[523,659,784,1047].forEach((f,i)=>tono(f,.5,"triangle",.13,i*.13));
const sCuenta=n=>n>0?tono(700,.18,"square",.14):[784,1047].forEach((f,i)=>tono(f,.35,"square",.16,i*.1));
function pintarSonido(){$("btn-son").innerHTML=sonido?ICO.sonido:ICO.mudo;$("btn-son").classList.toggle("off",!sonido);
  const b=$("btn-son-i");if(b){b.innerHTML=sonido?ICO.sonido:ICO.mudo;b.classList.toggle("off",!sonido);}}
function toggleSonido(){sonido=!sonido;pintarSonido();if(sonido)sTurno();}
$("btn-son").addEventListener("click",toggleSonido);
$("btn-son-i").addEventListener("click",toggleSonido);

/* ===== VOZ: lectura de consignas ===== */
function elegirVoz(){
  if(!soportaVoz)return;
  const vs=speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().indexOf("es")===0);
  if(!vs.length)return;
  const pts=v=>{const l=(v.lang||"").toLowerCase(),n=(v.name||"").toLowerCase();let p=0;
    if(/419|mx|us|ar|co|cl|pe|ve|ec|gt|do|uy|py|bo|cr|pa|sv|hn|ni|pr/.test(l))p+=4;
    if(/latam|latino|america/.test(n))p+=4;
    if(/female|femen|mujer|dalia|camila|paulina|soledad|monica|mónica|lupe|lucia|lucía|sabina|elena|carolina|fernanda|isabela|marisol/.test(n))p+=6;
    if(/google/.test(n))p+=1;return p;};
  vozElegida=vs.reduce((a,b)=>pts(b)>pts(a)?b:a);
}
if(soportaVoz){elegirVoz();speechSynthesis.onvoiceschanged=elegirVoz;}
let vozPendiente=null;
const correrPendiente=()=>{const f=vozPendiente;vozPendiente=null;if(f)f();};
const callar=()=>{if(soportaVoz)speechSynthesis.cancel();vozPendiente=null;};
function leer(txt,vozEnd){
  if(!lectura||!soportaVoz)return;
  callar();
  const u=new SpeechSynthesisUtterance(txt);
  if(vozElegida){u.voice=vozElegida;u.lang=vozElegida.lang;}else u.lang="es-419";
  u.rate=.96;u.pitch=1.1;
  if(vozEnd){u.onend=correrPendiente;u.onerror=correrPendiente;}
  speechSynthesis.speak(u);
}
function pintarVoz(){const b=$("btn-voz");b.innerHTML=lectura?ICO.voz:ICO.novoz;b.classList.toggle("off",!lectura);
  b.style.display=soportaVoz?"":"none";}
$("btn-voz").addEventListener("click",()=>{
  if(!soportaVoz)return;
  lectura=!lectura;pintarVoz();
  if(lectura)leerConsigna();else{correrPendiente();callar();}
});
const NOMBRE_LETRA={A:"a",B:"be",C:"ce",D:"de",E:"e",F:"efe",G:"ge",H:"hache",I:"i",J:"jota",L:"ele",M:"eme",N:"ene","Ñ":"eñe",O:"o",P:"pe",Q:"cú",R:"ere",S:"ese",T:"te",U:"u",V:"uve",X:"equis",Y:"i griega"};
function leerConsigna(cb){
  const it=items[idx];
  if(!it||!lectura||!soportaVoz){if(cb)cb();return;}
  leer((it.m===E?"Empieza por la letra ":"Contiene la letra ")+(NOMBRE_LETRA[it.letra]||it.letra));
  luego(()=>{
    if(!jugando||items[idx]!==it)return;
    if(!lectura){if(cb)cb();return;}
    const txt=(it.d||"").replace(/<[^>]+>/g," ");
    leer(txt,true);
    vozPendiente=cb||null;
    luego(()=>{if(items[idx]===it)correrPendiente();},Math.min(txt.length*110+5000,18000));
  },1900);
}

/* ===== TEMA: oscuro (diseño) / claro ===== */
const temaActual=()=>{try{return localStorage.getItem("bior-tema")||"oscuro"}catch(e){return "oscuro"}};
function aplicarTema(t){
  document.documentElement.dataset.tema=t;
  const ico=t==="claro"?ICO.luna:ICO.sol,lab=t==="claro"?"Cambiar a modo oscuro":"Cambiar a modo claro";
  ["btn-tema","btn-tema-i"].forEach(id=>{const b=$(id);if(b){b.innerHTML=ico;b.title=lab;b.setAttribute("aria-label",lab);}});
}
function toggleTema(){const t=temaActual()==="claro"?"oscuro":"claro";aplicarTema(t);
  try{localStorage.setItem("bior-tema",t)}catch(e){}}
$("btn-tema").addEventListener("click",toggleTema);
$("btn-tema-i").addEventListener("click",toggleTema);
aplicarTema(temaActual());

/* ===== MODAL ===== */
function modal(titulo,txt,btns){
  $("modal-t").textContent=titulo;$("modal-p").innerHTML=txt;
  const c=$("modal-b");c.innerHTML="";
  btns.forEach(b=>{const el=document.createElement("button");
    el.className="btn"+(b.hueca?" hueca":"");el.textContent=b.t;
    el.addEventListener("click",()=>{$("modal").classList.remove("on");if(b.f)b.f();});
    c.appendChild(el);});
  $("modal").classList.add("on");
}

/* ===== PERFIL DEL JUGADOR ===== */
const perfilLeer=()=>{try{return JSON.parse(localStorage.getItem("bior-perfil")||"null")||{}}catch(e){return {}}};
const perfilGuardar=p=>{try{localStorage.setItem("bior-perfil",JSON.stringify(p))}catch(e){}};
function pintarSaludo(){
  const p=perfilLeer(),s=$("saludo");
  s.innerHTML=p.nombre?'<img src="'+avSrc(p.avatar||0)+'" alt="">¡Hola, '+escH(corto(p.nombre+" "+(p.apellido||"")))+"!":"";
}
try{const g=perfilLeer();
  if(g.nombre)$("in-nombre").value=g.nombre;
  if(g.apellido)$("in-apellido").value=g.apellido;
  if(g.seccion){seccion=g.seccion;[...$("cursos").children].forEach(c=>c.setAttribute("aria-pressed",String(c.dataset.sec===g.seccion)));}
  if(typeof g.avatar==="number"&&g.avatar>=0&&g.avatar<AVATAR_BOTI)avatarIdx=g.avatar;
  if(g.seg||g.seg===0){seg=g.seg;sinReloj=seg===0;}
}catch(e){}
pintarSaludo();

/* registro: curso, avatar, modo, reloj, sala */
(function(){const cont=$("avs");
  AVATARES.slice(0,AVATAR_BOTI).forEach((n,i)=>{
    const b=document.createElement("button");b.className="av";b.setAttribute("aria-pressed",String(i===avatarIdx));
    b.innerHTML='<img src="'+avSrc(i)+'" alt="Personaje '+(i+1)+'">';
    b.addEventListener("click",()=>{avatarIdx=i;[...cont.children].forEach(c=>c.setAttribute("aria-pressed","false"));b.setAttribute("aria-pressed","true");audio();});
    cont.appendChild(b);});
})();
$("cursos").addEventListener("click",e=>{const b=e.target.closest(".curso");if(!b)return;
  [...$("cursos").children].forEach(c=>c.setAttribute("aria-pressed","false"));b.setAttribute("aria-pressed","true");
  seccion=b.dataset.sec;audio();});
let modoSel="sola";
$("modos").addEventListener("click",e=>{const b=e.target.closest(".modo");if(!b)return;
  [...$("modos").children].forEach(c=>c.setAttribute("aria-pressed","false"));b.setAttribute("aria-pressed","true");
  modoSel=b.dataset.modo;audio();pintarModo();});
function pintarModo(){
  const l=modoSel==="linea";
  $("opc-linea").classList.toggle("oculto",!l);
  $("nota-reloj").textContent=modoSel==="sola"?"Tu reloj corre mientras pensás cada letra.":
    "Cada jugador tiene su propio reloj, que corre solo en su turno. Además, cada letra tiene su propio tiempo.";
  $("empezar-t").textContent=l?"ENTRAR":"EMPEZAR";
  if(l)lobbyAbrir();else lobbyCerrar();
}
(function(){const c=$("chips-reloj");
  OPC_TIEMPO.forEach(o=>{const b=document.createElement("button");b.className="chip";b.dataset.seg=o.s;
    b.setAttribute("aria-pressed",String(o.s===seg));b.textContent=o.t;
    b.addEventListener("click",()=>{[...c.children].forEach(x=>x.setAttribute("aria-pressed","false"));
      b.setAttribute("aria-pressed","true");sinReloj=o.s===0;seg=o.s;audio();
      if(red.lobby&&red.rol==="host"&&!red.rival&&red.lobby.meta)red.lobby.track(Object.assign({},red.lobby.meta,{sg:seg}));});
    c.appendChild(b);});
})();
$("in-sala").addEventListener("input",()=>{const i=$("in-sala");i.value=i.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,4);
  $("empezar-t").textContent=i.value.length===4?"ENTRAR A "+i.value:"ENTRAR";});
$("salas").addEventListener("click",e=>{const b=e.target.closest(".sala-item");if(!b)return;
  $("in-sala").value=b.dataset.c;$("in-sala").dispatchEvent(new Event("input"));
  if(($("in-nombre").value.trim()&&$("in-apellido").value.trim()))$("btn-empezar").click();
  else{$("aviso").textContent="Completá tu nombre y apellido para entrar.";$("in-nombre").focus();}});

$("btn-jugar").addEventListener("click",()=>{audio();mostrar("p-registro");
  luego(()=>{if(!$("in-nombre").value)$("in-nombre").focus();},350);});
$("btn-perfil").addEventListener("click",()=>{audio();pintarPerfil();mostrar("p-perfil");});
$("btn-clasif").addEventListener("click",()=>{audio();mostrarRanking();});
$("btn-acerca").addEventListener("click",()=>{audio();mostrar("p-acerca");});
$("btn-editar").addEventListener("click",()=>{audio();mostrar("p-registro");});
document.querySelectorAll("[data-volver]").forEach(b=>b.addEventListener("click",()=>{audio();mostrar(b.dataset.volver);}));
$("btn-rank-atras").addEventListener("click",()=>{audio();mostrar("p-inicio");});
$("btn-rank-recargar").addEventListener("click",()=>{audio();mostrarRanking();});
$("btn-empezar").addEventListener("click",()=>{
  const n=limpiaNom($("in-nombre").value),a=limpiaNom($("in-apellido").value);
  if(!n||!a){$("aviso").textContent="Completá tu nombre y apellido para empezar.";return;}
  $("aviso").textContent="";audio();
  nombres=[n+" "+a,""];const p={nombre:n,apellido:a,seccion:seccion,avatar:avatarIdx,seg:seg};
  perfilGuardar(p);pintarSaludo();
  if(modoSel==="linea"){redEntrar();return;}
  jugados=[];nuevaPartida(modoSel==="boti");
});
["in-nombre","in-apellido","in-sala"].forEach(id=>$(id).addEventListener("keydown",e=>{if(e.key==="Enter")$("btn-empezar").click();}));

/* ===== PARTIDA ===== */
function sortearRosco(){
  const todos=ARRANQUES.map((_,i)=>i);
  let libres=todos.filter(n=>jugados.indexOf(n)<0);
  if(!libres.length){jugados=[];libres=todos.filter(n=>n!==nRosco);}
  const r=libres[Math.floor(Math.random()*libres.length)];jugados.push(r);return r;
}
function nuevaPartida(vsBot){
  BOT.ok=ACIERTE_BOT[Math.floor(Math.random()*ACIERTE_BOT.length)];
  solo=!vsBot;conBot=vsBot;enLinea=false;recuperacion=false;rachaBot=0;
  nRosco=sortearRosco();
  items=LETRAS.map(l=>{const p=POOL[l];const i=Math.floor(Math.random()*p.length);return Object.assign({letra:l,ix:i},p[i]);});
  if(conBot)nombres[1]=BOT.nombre;
  iniciarRonda(ARRANQUES[nRosco],seg,conBot?Math.floor(Math.random()*2):0);
}
function practicar(){
  recuperacion=true;solo=true;conBot=false;enLinea=false;
  items=pendientesRepaso.slice();
  iniciarRonda(0,0,0);
}
function iniciarRonda(desde,segundos,empieza){
  limpiarTimers();
  estado=items.map(()=>"pendiente");respondio=items.map(()=>-1);idx=desde;turno=empieza;
  puntos=[0,0];rachas=[0,0];intentos=0;partidaViva=true;
  sinReloj=(segundos===0);rel=[segundos,segundos];usado=[0,0];tIni=0;
  jugando=false;bloqueado=false;arranque=true;habilitar(false);
  letraIni=items[desde]?items[desde].letra:"";
  $("jugadores").classList.toggle("oculto",solo);
  armarRosco();pintar();relojUI();pintarSonido();pintarVoz();
  mostrar("p-rosco");medirRosco();
  overlayTurno("");
}
function medirRosco(){
  const z=$("zona-rosco"),r=z.getBoundingClientRect();
  const w=Math.min(r.width,r.height)-4;
  $("rosco").style.setProperty("--rw",Math.max(240,w)+"px");
}
window.addEventListener("resize",()=>{if($("p-rosco").classList.contains("activa"))medirRosco();});

function armarRosco(){
  const cont=$("rosco");cont.querySelectorAll(".letra").forEach(e=>e.remove());
  const n=items.length,R=44;
  items.forEach((it,i)=>{
    const ang=(-90+i*360/n)*Math.PI/180;
    const d=document.createElement("div");
    d.className="letra";d.id="L"+i;d.setAttribute("role","listitem");
    d.innerHTML=escH(it.letra)+'<i class="bd" id="B'+i+'"></i>';
    d.style.left=(50+R*Math.cos(ang))+"%";d.style.top=(50+R*Math.sin(ang))+"%";
    cont.appendChild(d);
  });
}
const BD={acierto:ICO.check,error:ICO.equis,pasada:ICO.giro};
function pintar(){
  const dic={acierto:"acertada",error:"errada",pasada:"pasapalabra",pendiente:"pendiente"};
  estado.forEach((s,i)=>{
    const el=$("L"+i);if(!el)return;
    el.className="letra"+(s!=="pendiente"?" "+s:"")+(respondio[i]>=0?" j"+(respondio[i]+1):"")+(i===idx&&jugando?" activa":"");
    $("B"+i).innerHTML=BD[s]||"";
    el.setAttribute("aria-label",items[i].letra+", "+dic[s]);
  });
  const n=items.length,ok=estado.filter(s=>s==="acierto").length,er=estado.filter(s=>s==="error").length,ps=estado.filter(s=>s==="pasada").length;
  $("r-ok").style.width=(100*ok/n)+"%";$("r-er").style.width=(100*er/n)+"%";$("r-ps").style.width=(100*ps/n)+"%";
  $("prog").textContent=(ok+er)+" / "+n;
  if(!solo){
    [0,1].forEach(j=>{
      const c=$("jug"+j);
      c.querySelector("img").src=avSrc(j===1&&conBot?AVATAR_BOTI:(j===1?red.avatarRival||1:avatarIdx));
      c.querySelector("b").textContent=enLinea&&j===yo?"Vos":corto(nombres[j]);
      c.querySelector("small").textContent=puntos[j]+(puntos[j]===1?" acierto":" aciertos")+(rachas[j]>=3?" · racha "+rachas[j]:"");
      c.classList.toggle("activo",turno===j);
    });
  }
}
function ajustarDef(){
  const d=$("centro-def");if(!d)return;
  let fs=parseFloat(getComputedStyle(d).fontSize);
  let k=0;
  while(d.scrollHeight>d.clientHeight+1&&fs>11.5&&k++<20){fs-=.7;d.style.fontSize=fs+"px";}
}
function centroHTML(html){const c=$("centro");c.innerHTML=html;ajustarDef();}
function mostrarLetra(cb){
  const it=items[idx];
  centroHTML('<span class="consigna">'+(it.m===E?"Empieza por "+it.letra:"Contiene la "+it.letra)+(estado[idx]==="pasada"?" · vuelve":"")+'</span>'+
    '<p class="definicion" id="centro-def" style="font-size:'+Math.max(13,Math.min(17.5,340/it.d.length*24))+'px">'+it.d+"</p>");
  $("entrada").value="";feedback("");
  pintar();leerConsigna(cb);
}
const siguienteLetra=()=>{
  const n=items.length;
  for(let k=1;k<=n;k++){const j=(idx+k)%n;if(estado[j]==="pendiente"){idx=j;return;}}
  for(let k=1;k<=n;k++){const j=(idx+k)%n;if(estado[j]==="pasada"){idx=j;return;}}
};
const quedan=()=>estado.some(s=>s==="pendiente"||s==="pasada");
function feedback(t,cls){const f=$("feedback");f.innerHTML=t||"";f.className="feedback"+(cls?" "+cls:"");}

/* ===== TURNOS ===== */
function overlayTurno(resu){
  jugando=false;pararReloj();pararLetra();habilitar(false);
  centroHTML('<div class="res-card turno-card" style="--c:'+(turno===0?"var(--j1)":"var(--j2)")+'">'+
    (solo?"":'<img src="'+avSrc(esBot()?AVATAR_BOTI:(turno===yo||!enLinea&&turno===0?avatarIdx:red.avatarRival||1))+'" alt="">')+
    '<b>'+(arranque?(resu||""):"")+'</b>'+
    '<span>'+(arranque?"Preparate…":(enLinea?(miTurno()?"Tu turno":"Le toca a "+corto(nombres[turno])):conBot?(esBot()?"Le toca a Boti":"Tu turno"):"Seguís vos"))+'</span></div>');
  sTurno();pintar();
  luego(()=>{
    if(arranque){arranque=false;cuentaRegresiva();}else entrarAlJuego();
  },solo?800:1300);
}
function cuentaRegresiva(){
  const pasos=["3","2","1","¡YA!"];let i=0;
  const empiezaQuien=enLinea?(miTurno()?"Empezás vos":"Empieza "+corto(nombres[turno])):conBot?(turno?"Empieza Boti":"Empezás vos"):"Empezás vos";
  centroHTML('<div class="res-card"><span>'+empiezaQuien+'</span></div>');
  const paso=()=>{if(!partidaViva)return;
    const el=$("centro");el.innerHTML='<div class="cuenta">'+pasos[i]+"</div>";sCuenta(3-i);
    i++;i<pasos.length?luego(paso,820):luego(entrarAlJuego,650);};
  paso();
}
function habilitar(v){
  $("btn-responder").disabled=!v;$("entrada").disabled=!v;
  const sinResolver=estado.filter(s=>s!=="acierto"&&s!=="error").length;
  $("btn-pasar").disabled=!v||sinResolver<=1;
}
function entrarAlJuego(){
  if(!partidaViva)return;
  jugando=true;bloqueado=false;intentos=0;
  const conVoz=lectura&&soportaVoz;
  const habilitarYo=()=>{if(jugando&&!esBot()&&miTurno()){habilitar(true);tIni=Date.now();arrancarReloj();arrancarLetra();luego(()=>$("entrada").focus(),120);}};
  let cb=null;
  if(esBot()){habilitar(false);tIni=Date.now();cb=conVoz?jugadaBot:null;}
  else if(!miTurno())habilitar(false);
  else if(conVoz){habilitar(false);cb=habilitarYo;}
  mostrarLetra(cb);
  $("entrada").placeholder=esBot()?"Está jugando Boti":(!miTurno()?"Responde "+corto(nombres[turno]):"Escribí tu respuesta");
  if(esBot()&&!conVoz)jugadaBot();
  else if(!esBot()&&!miTurno()){relojUI();verRival();}
  else if(!esBot()&&miTurno()&&!conVoz)habilitarYo();
}

/* ===== JUGADA DE BOTI ===== */
function jugadaBot(){
  const it=items[idx];
  feedback('<span class="pensando">Boti está pensando <i></i><i></i><i></i></span>');
  const sinResolver=estado.filter(s=>s!=="acierto"&&s!=="error").length;
  let acierta=Math.random()<BOT.ok;
  if(rachaBot>=BOT.racha)acierta=false;
  const pasa=!acierta&&sinResolver>1&&Math.random()<BOT.pasa/(1-BOT.ok);
  const texto=acierta?it.p:(pasa?"":erroneaBot(it));
  luego(()=>{if(!jugando||!esBot())return;
    if(pasa){rachaBot=0;resolverBot("pasa");return;}
    tipear(texto,()=>luego(()=>resolverBot(acierta?"ok":"mal"),450));
  },6000+Math.random()*1200);
}
function erroneaBot(it){
  const otras=TODAS.filter(p=>p!==it.p&&!casiAcepta(it,p));
  return otras[Math.floor(Math.random()*otras.length)];
}
function tipear(txt,fin){
  $("entrada").value="";let i=0;
  const paso=()=>{if(i>=txt.length)return fin();
    $("entrada").value+=txt[i++];if(i%2===0)sTecla();
    luego(paso,55+Math.random()*45);};paso();
}
function resolverBot(res){
  const it=items[idx];
  if(res==="ok"){estado[idx]="acierto";respondio[idx]=1;puntos[1]++;rachaBot++;sOk();
    feedback("✓ "+it.p+" — "+frase("ok").replace("¡","Boti. ¡"));
    cerrarJugada("ok",it);}
  else if(res==="mal"){estado[idx]="error";respondio[idx]=1;rachaBot=0;sMal();
    feedback("✕ Boti dijo otra cosa. Era "+it.p+".");
    cerrarJugada("mal",it);}
  else{if(estado[idx]==="pendiente"){estado[idx]="pasada";respondio[idx]=1;}sPas();
    feedback("↻ Boti pasó. La "+it.letra+" vuelve más adelante.");
    cerrarJugada("pas",it);}
}

/* ===== JUGADA HUMANA ===== */
const cortarTiempo=()=>{if(tIni){usado[turno]+=Date.now()-tIni;tIni=0;}};
const BONO_BASE=()=>(seg>0?seg:240)*1000;
const bono=j=>Math.max(0,Math.min(99,Math.round(99*(1-usado[j]/BONO_BASE()))));
const puntaje=j=>puntos[j]*100+bono(j);
const ordenFinal=()=>puntos[0]!==puntos[1]?(puntos[0]>puntos[1]?[0,1]:[1,0]):null;

function responder(){
  if(!jugando||bloqueado||esBot()||!miTurno())return;
  const txt=$("entrada").value.trim();
  if(!txt){feedback("Escribí una palabra o tocá Pasapalabra.","casi");return;}
  const it=items[idx],ok=acepta(it,txt);
  if(!ok&&casiAcepta(it,txt)){
    sPas();feedback(frase("casi")+" Esa es la palabra, pero le falta la tilde o la ñ. Escribila otra vez: no perdés la letra.","casi");
    $("entrada").focus();$("entrada").select();return;}
  if(ok){estado[idx]="acierto";respondio[idx]=turno;puntos[turno]++;rachas[turno]++;sOk();
    feedback("✓ "+it.p+(rachas[turno]>=3?" · ¡racha de "+rachas[turno]+"!":"")+" "+frase("ok"));
    redJugada("ok",txt);cerrarJugada("ok",it);return;}
  intentos++;
  if(modoPractica()&&intentos===1){
    sMal();feedback("✕ Todavía no. Pista clave: "+it.k,"casi");
    $("entrada").value="";$("entrada").focus();return;}
  estado[idx]="error";respondio[idx]=turno;rachas[turno]=0;sMal();
  feedback("✕ Era "+it.p+". Pista clave: "+it.k);
  redJugada("mal",txt);cerrarJugada("mal",it);
}
const modoPractica=()=>sinReloj||recuperacion;
function pasar(){
  if(!jugando||bloqueado||esBot()||!miTurno())return;
  if(estado.filter(s=>s!=="acierto"&&s!=="error").length<=1)return;
  if(estado[idx]==="pendiente"){estado[idx]="pasada";respondio[idx]=turno;}
  rachas[turno]=0;sPas();
  feedback("↻ Pasapalabra. La "+items[idx].letra+" vuelve más adelante. "+frase("pas"));
  redJugada("pasa","");cerrarJugada("pas",items[idx]);
}
$("btn-responder").addEventListener("click",responder);
$("btn-pasar").addEventListener("click",pasar);
$("entrada").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();responder();}});
document.addEventListener("keydown",e=>{if(jugando&&!bloqueado&&!esBot()&&miTurno()&&e.key==="Escape"){e.preventDefault();pasar();}});

function cerrarJugada(res,it){
  cortarTiempo();bloqueado=true;habilitar(false);pararReloj();pararLetra();
  const col=res==="ok"?"var(--verde)":res==="mal"?"var(--rojo)":"var(--azul)";
  const ico=res==="ok"?ICO.check:res==="mal"?ICO.equis:ICO.giro;
  centroHTML('<div class="res-card"><span class="res-ico" style="background:'+col+'">'+ico+'</span>'+
    (res==="pas"?'<b>Pasapalabra</b>':'<b>'+it.p+'</b>')+
    (res==="mal"?'<span class="clave">Pista clave: '+escH(it.k)+"</span>":res==="pas"?'<span>Vuelve en la próxima vuelta</span>':"")+
    "</div>");
  pintar();
  luego(()=>{
    bloqueado=false;
    if(!quedan())return terminar(recuperacion?"Repaso terminado.":"Cerraste el rosco entero.");
    if(solo){
      if(!sinReloj&&rel[0]<=0)return terminar("Se terminó tu reloj.");
      siguienteLetra();entrarAlJuego();return;
    }
    if(conBot&&!tieneTiempo(0))return terminar("Se terminó tu reloj.");
    if(!tieneTiempo(0)&&!tieneTiempo(1))return terminar("Se terminó el reloj de los dos.");
    if(tieneTiempo(1-turno))turno=1-turno;
    siguienteLetra();overlayTurno();
  },(esBot()||!miTurno())?1700:1500);
}

/* ===== RELOJ DE PARTIDA ===== */
const tieneTiempo=j=>sinReloj||recuperacion||(conBot&&j===1)||rel[j]>0;
function relojUI(){
  const j=solo?0:turno;
  const sinBanco=sinReloj||recuperacion||(conBot&&j===1&&turno===1);
  const el=$("reloj-t");
  el.textContent=sinReloj||recuperacion?"∞":fmt(rel[j]);
  $("reloj").classList.toggle("urgente",!sinBanco&&rel[j]<=30&&rel[j]>0);
  $("reloj").style.color=!sinBanco&&rel[j]<=30&&rel[j]>0?"var(--rojo)":"";
  if(!solo)[0,1].forEach(k=>{
    const t=$("jug"+k).querySelector(".t");
    t.textContent=sinReloj||recuperacion||(conBot&&k===1)?"∞":fmt(rel[k]);
    t.classList.toggle("urgente",!sinReloj&&!recuperacion&&!(conBot&&k===1)&&rel[k]<=30&&rel[k]>0);
  });
}
function arrancarReloj(){
  if(sinReloj||recuperacion||esBot()||!miTurno()){relojUI();return;}
  clearInterval(cron);const j=turno;relojUI();
  cron=setInterval(()=>{
    if(!jugando||bloqueado)return;
    rel[j]--;relojUI();if(enLinea)redEnviar("reloj",{r:rel[j],j:j});
    if(rel[j]===60||rel[j]===30)tono(880,.35,"sine",.14);
    if(rel[j]<=30&&rel[j]>0)tic(rel[j]<=10);
    if(rel[j]<=0){clearInterval(cron);sinReloj_(j);}
  },1000);
}
function sinReloj_(j){
  if(!jugando||bloqueado||turno!==j)return;
  if(solo){terminar("Se terminó tu reloj.");return;}
  rel[j]=0;rachas[j]=0;
  if(estado[idx]==="pendiente"){estado[idx]="pasada";respondio[idx]=j;}
  sMal();
  feedback("⏱ Se terminó tu reloj"+(tieneTiempo(1-j)&&quedan()?". "+corto(nombres[1-j])+" sigue con las letras que quedan.":""));
  redJugada("sin","",1);cerrarJugada("pas",items[idx]);
}
const pararReloj=()=>{clearInterval(cron);cron=null;};

/* ===== TIEMPO DE CADA LETRA ===== */
let letraT=null,letraInt=null,letraFin=0;
function segundosLetra(it){
  const pal=String(it.d||"").replace(/<[^>]+>/g," ").split(/\s+/).filter(Boolean).length;
  let t=8+it.p.length/1.3+((lectura&&soportaVoz)?0:pal/2.5);
  const mul=seg>0?(seg>=360?1.25:seg>120?1:.8):1,cap=seg>=360?55:seg>120?45:35;
  return Math.max(15,Math.min(cap,Math.ceil(t*mul/5)*5));
}
function correrBarra(t){
  const b=$("barra-letra"),i=$("barra-letra-i");clearInterval(letraInt);
  if(!t){b.classList.remove("on");return;}
  letraFin=Date.now()+t*1000;b.classList.add("on");
  i.style.transition="none";i.style.width="100%";i.offsetWidth;
  i.style.transition="width "+t+"s linear";i.style.width="0%";
  letraInt=setInterval(()=>{
    const q=Math.max(0,(letraFin-Date.now())/1000),f=q/t;
    i.style.background=f<.25?"var(--rojo)":f<.5?"var(--ambar)":"var(--turq)";
    if(q<=0)clearInterval(letraInt);
  },250);
}
function pararLetra(){clearTimeout(letraT);clearInterval(letraInt);letraT=null;$("barra-letra").classList.remove("on");}
function arrancarLetra(){
  if(sinReloj||recuperacion||!jugando)return;
  const t=segundosLetra(items[idx]);correrBarra(t);
  if(enLinea)redEnviar("tl",{s:t,i:idx});
  clearTimeout(letraT);letraT=setTimeout(porTiempo,t*1000);
}
function porTiempo(){
  if(!jugando||bloqueado||esBot()||!miTurno())return;
  const it=items[idx],ultima=estado.filter(s=>s!=="acierto"&&s!=="error").length<=1;
  rachas[turno]=0;
  if(estado[idx]==="pasada"||ultima){
    estado[idx]="error";respondio[idx]=turno;sMal();
    feedback("⏱ Se terminó el tiempo. Era "+it.p+". Pista clave: "+it.k);
    redJugada("mal","",1);cerrarJugada("mal",it);
  }else{
    estado[idx]="pasada";respondio[idx]=turno;sPas();
    feedback("⏱ Se terminó el tiempo. La "+it.letra+" vuelve más adelante.");
    redJugada("pasa","",1);cerrarJugada("pas",it);
  }
}
$("btn-cortar").addEventListener("click",()=>{
  modal("¿Terminar la partida?","El rosco queda cerrado con lo respondido hasta ahora.",
    [{t:"Seguir jugando",hueca:true},{t:"Terminar",f:()=>{
      if(enLinea){const m=corto(nombres[yo])+" terminó la partida antes de completar el rosco.";cortarTiempo();redEnviar("fin",{m:m,rel:rel,us:usado});terminar(m);}
      else terminar("Cerraste la partida antes de completar el rosco.");}}]);
});
$("btn-res-inicio").addEventListener("click",()=>{audio();
  if(red.sala){redSalir();return;}mostrar("p-inicio");});

/* ===== FINAL ===== */
function terminar(motivo){
  if(!partidaViva&&enLinea)return;
  partidaViva=false;jugando=false;pararReloj();pararLetra();limpiarTimers();habilitar(false);sFin();
  const n=items.length,ok=estado.filter(s=>s==="acierto").length,er=estado.filter(s=>s==="error").length,pe=n-ok-er;
  $("f-ok").textContent=ok;$("f-de").textContent="de "+n;
  $("f-c").textContent=ok;$("f-i").textContent=er;$("f-p").textContent=pe;
  $("ic-ok").innerHTML=ICO.check;$("ic-er").innerHTML=ICO.equis;$("ic-ps").innerHTML=ICO.giro;
  $("motivo").textContent=motivo;
  const arco=$("arco"),C=2*Math.PI*52;
  arco.style.strokeDashoffset=C;arco.offsetWidth;
  arco.style.strokeDashoffset=C*(1-ok/n);

  const jp=enLinea?yo:0;
  const pts=puntaje(jp);
  $("pts-rot").textContent=solo?"Tu puntaje":"Puntos de tu equipo";
  $("f-pts").textContent=pts.toLocaleString("es-AR")+" pts";

  /* mejor puntaje personal (de este celular) */
  let mejor=0,nuevo=false;
  try{mejor=+(localStorage.getItem("bior-mejor")||0);
    if(pts>mejor&&!modoPractica()){mejor=pts;nuevo=true;localStorage.setItem("bior-mejor",String(pts));}
  }catch(e){}
  $("f-mejor").textContent=mejor.toLocaleString("es-AR")+" pts";
  $("f-nuevo").classList.toggle("oculto",!nuevo);

  /* versus */
  const vs=$("versus"),ver=$("veredicto");
  if(conBot||enLinea){
    vs.classList.remove("oculto");ver.classList.remove("oculto");
    const o=ordenFinal(),emp=!o;
    const yo_=enLinea?yo:0,ot=1-yo_;
    const a=puntos[yo_],b=puntos[ot],riv=corto(nombres[ot]);
    ver.textContent=emp?"Empate en "+a+" aciertos. El desempate es la revancha."
      :(o[0]===yo_?"¡Ganaste! "+a+" a "+b+" contra "+riv+".":riv+" ganó "+b+" a "+a+". Practicá las que costaron y pedí la revancha.");
    const col=(j,gana)=>{const esB=conBot&&j===1;
      const nom=enLinea?(j===yo?"Vos":corto(nombres[j])):(esB?"Boti":corto(nombres[j]));
      const av=esB?AVATAR_BOTI:(j===yo||(!enLinea&&j===0)?avatarIdx:red.avatarRival||1);
      return '<div class="vs-col'+(gana?" gana":"")+'" style="--c:var(--j'+(j+1)+')">'+
        (gana?'<span class="corona">'+ICO.corona+"</span>":"")+
        '<img src="'+avSrc(av)+'" alt=""><b>'+escH(nom)+'</b>'+
        '<span class="pts">'+puntaje(j)+'</span><small>'+puntos[j]+" aciertos · "+fmtT(usado[j])+"</small></div>";};
    vs.innerHTML=(o?col(o[0],true)+'<div class="vs">VS</div>'+col(o[1],false)
      :col(0,true)+'<div class="vs">VS</div>'+col(1,true));
    luego(lluviaLetras,400);
    if(!emp&&o[0]===yo_)luego(confeti,650);
  }else{vs.classList.add("oculto");ver.classList.add("oculto");}

  /* repaso */
  const firmes=[],revisar=[],sin=[];
  items.forEach((it,i)=>{
    if(estado[i]==="acierto")firmes.push(it);
    else if(estado[i]==="error"){if(!(conBot&&respondio[i]===1)&&!(enLinea&&respondio[i]!==yo))revisar.push(it);}
    else sin.push(it);
  });
  pendientesRepaso=revisar.concat(sin);
  $("btn-practicar").style.display=pendientesRepaso.length?"":"none";
  $("btn-practicar").textContent="Practicar las "+pendientesRepaso.length+" que costaron";
  const rl=$("repaso-lista");
  const fila=(it,s)=>'<div class="rep-it"><span class="l '+s+'">'+it.letra+'</span><div><b>'+it.p+'</b><p>'+it.d.replace(/<b>.*?<\/b>/,"")+"</p></div></div>";
  rl.innerHTML=revisar.map(it=>fila(it,"error")).join("")+sin.map(it=>fila(it,"pasada")).join("");
  $("repaso").style.display=(revisar.length||sin.length)?"":"none";
  $("repaso-t").textContent="Para repasar ("+(revisar.length+sin.length)+")";

  /* botón de otra partida / revancha */
  redBotonFinal();
  guardarHist(pts);rankingEnviar();
  mostrar("p-resultado");
}
$("btn-ver-clasif").addEventListener("click",()=>{audio();mostrarRanking();});
$("btn-otra").addEventListener("click",()=>{audio();
  if(red.sala){if(red.rival&&red.rivalAqui)redRevancha();return;}
  nuevaPartida(conBot);});
$("btn-practicar").addEventListener("click",()=>{audio();if(enLinea)redASolo();practicar();});

function lluviaLetras(){
  const cols=["#22E3D6","#FF4FA3","#4D9BFF","#3FD97C","#F5C542","#FF7AB8"],capa=document.createElement("div");
  for(let i=0;i<70;i++){const s=document.createElement("b");s.className="confeti letra-cae";
    s.textContent=LETRAS[Math.floor(Math.random()*LETRAS.length)];
    s.style.left=(Math.random()*100)+"vw";s.style.color=cols[i%cols.length];
    s.style.fontSize=(22+Math.random()*34)+"px";
    s.style.setProperty("--rot",(Math.random()*540-270)+"deg");
    s.style.setProperty("--t",(3+Math.random()*2.6)+"s");
    s.style.animationDelay=(Math.random()*1.4)+"s";
    capa.appendChild(s);}
  document.body.appendChild(capa);setTimeout(()=>capa.remove(),7600);
}
function confeti(){
  const cols=["#22E3D6","#FF4FA3","#4D9BFF","#7FE8DF","#FFB3D4","#8FB4FF"],capa=document.createElement("div");
  for(let i=0;i<120;i++){const p=document.createElement("i");p.className="confeti";
    p.style.left=(Math.random()*100)+"vw";p.style.background=cols[i%cols.length];
    const s=6+Math.random()*9;
    p.style.width=s+"px";p.style.height=(s*(Math.random()<.5?1:.55))+"px";
    if(Math.random()<.3)p.style.borderRadius="50%";
    p.style.setProperty("--rot",(360+Math.random()*720)+"deg");
    p.style.setProperty("--t",(2.6+Math.random()*2.2)+"s");
    p.style.animationDelay=(Math.random()*.7)+"s";
    capa.appendChild(p);}
  document.body.appendChild(capa);setTimeout(()=>capa.remove(),5600);
}

/* ===== HISTORIAL LOCAL (de este celular) ===== */
const histLeer=()=>{try{return JSON.parse(localStorage.getItem("bior-hist")||"[]")}catch(e){return []}};
function guardarHist(pts){
  if(modoPractica())return;
  const h=histLeer();const nom=nombres[enLinea?yo:0]||"";
  if(!nom)return;
  h.push({n:nom,s:seccion,a:avatarIdx,m:enLinea?"en línea":conBot?"vs Boti":"solo",
    ok:puntos[enLinea?yo:0],er:estado.filter((s,k)=>s==="error"&&respondio[k]===(enLinea?yo:0)).length,
    ps:estado.filter((s,k)=>s==="pasada"&&respondio[k]===(enLinea?yo:0)).length,
    tot:items.length,pts:pts,t:Math.round(usado[enLinea?yo:0]/100)/10,f:Date.now()});
  if(h.length>400)h.splice(0,h.length-400);
  try{localStorage.setItem("bior-hist",JSON.stringify(h))}catch(e){}
}

/* ===== CLASIFICACIÓN =====
   La tabla compartida lee una planilla de Google vía Apps Script (ranking.gs).
   Mientras RANKING_URL quede vacía muestra las marcas de este celular. */
const RANKING_URL="";
const rankingOn=()=>RANKING_URL.indexOf("http")===0;
async function rankingTraer(top){
  const r=await fetch(RANKING_URL+"?top="+top);if(!r.ok)throw 0;
  return await r.json();
}
function rankingEnviar(){
  if(!rankingOn()||modoPractica())return Promise.resolve();
  const pf=perfilLeer(),jp=enLinea?yo:0;
  const body={juego:"BIOROSCO",nombre:pf.nombre||nombres[jp].split(" ")[0],apellido:pf.apellido||"",
    seccion:seccion,avatar:avatarIdx,modo:enLinea?"en línea":conBot?"vs Boti":"solo",
    aciertos:puntos[jp],errores:estado.filter((s,k)=>s==="error"&&respondio[k]===jp).length,
    pasadas:estado.filter((s,k)=>s==="pasada"&&respondio[k]===jp).length,total:items.length,
    puntos:puntaje(jp),tiempo_seg:Math.round(usado[jp]/100)/10,inicio:letraIni};
  return fetch(RANKING_URL,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify(body)}).catch(()=>{});
}
let rankTab="";
$("tabs").addEventListener("click",e=>{const b=e.target.closest(".tab");if(!b)return;
  rankTab=b.dataset.t;
  [...$("tabs").children].forEach(c=>c.setAttribute("aria-selected",String(c===b)));
  pintarRanking();});
async function mostrarRanking(){
  mostrar("p-ranking");
  $("rank-cuerpo").innerHTML='<p class="vacio">Cargando la clasificación…</p>';
  pintarRanking();
}
async function pintarRanking(){
  const cuerpo=$("rank-cuerpo"),fuente=$("rank-fuente");
  let lista=null;
  if(rankingOn()){
    try{
      const raw=await rankingTraer(200);
      lista=raw.map(x=>({n:nombreBonito((x.nombre||"")+" "+(x.apellido||"")),s:x.seccion||"",a:Math.max(0,Math.min(AVATAR_BOTI,+x.avatar||0)),
        pts:+x.puntos||0,ok:+x.aciertos||0,partidas:+x.partidas||1}));
      lista.sort((a,b)=>b.pts-a.pts||b.ok-a.ok||(a.partidas-b.partidas));
      fuente.textContent="Se actualiza cada vez que alguien termina una partida.";
    }catch(e){
      cuerpo.innerHTML='<p class="vacio">No se pudo leer la planilla. Probá de nuevo en un ratito.</p>';fuente.textContent="";return;
    }
  }else{
    const por={};
    histLeer().forEach(x=>{
      const k=norma(x.n)+"|"+norma(x.s);
      if(!por[k])por[k]={n:nombreBonito(x.n),s:x.s,a:x.a,pts:0,ok:0,partidas:0};
      por[k].pts+=x.pts;por[k].ok+=x.ok;por[k].partidas++;por[k].a=x.a;});
    lista=Object.keys(por).map(k=>por[k]).sort((a,b)=>b.pts-a.pts||b.ok-a.ok);
    fuente.textContent="La clasificación del curso se activa cuando la profe conecte la planilla. Estas son las marcas de este celular.";
  }
  const fil=lista.filter(x=>!rankTab||norma(x.s)===norma(rankTab));
  if(!fil.length){
    cuerpo.innerHTML='<p class="vacio">Todavía no hay marcas'+(rankTab?" en "+rankTab:"")+".<br>¡Jugá la primera partida!</p>";return;}
  const miN=nombres[enLinea?yo:0]||(perfilLeer().nombre?perfilLeer().nombre+" "+(perfilLeer().apellido||""):"");
  const cara=(x,i)=>'<img src="'+avSrc(x.a)+'" alt="">';
  const pd=(x,pos)=>{const cls=pos===1?"p1":pos===2?"p2":"p3";
    return '<div class="pd '+cls+'"><div class="cara">'+(pos===1?'<span class="corona">'+ICO.corona+"</span>":"")+cara(x)+"</div>"+
      '<div class="peldano"><span class="pos">'+pos+"</span><b>"+escH(corto(x.n))+"</b><small>"+x.pts.toLocaleString("es-AR")+" pts</small></div></div>";};
  let html="";
  const top3=fil.slice(0,3);
  if(top3.length>=3)html+='<div class="podio">'+pd(top3[1],2)+pd(top3[0],1)+pd(top3[2],3)+"</div>";
  else if(top3.length)html+='<div class="podio" style="grid-template-columns:'+("1fr ".repeat(top3.length))+'">'+top3.map((x,i)=>pd(x,i===0?1:i===1?2:3)).join("")+"</div>";
  html+='<div class="lista">'+
    fil.slice(3,30).map((x,k)=>{
      const i=k+4,mio=norma(x.n)===norma(miN)&&norma(x.s)===norma(seccion);
      return '<div class="fr'+(mio?" mio":"")+'"><span class="n">'+i+"</span>"+cara(x)+
        '<span><b>'+escH(nombreBonito(x.n))+"</b><small>"+(rankTab?"":escH(x.s)+" · ")+(x.partidas>1?x.partidas+" partidas":"1 partida")+"</small></span>"+
        '<span class="p">'+x.pts.toLocaleString("es-AR")+" pts</span></div>";}).join("")+"</div>";
  cuerpo.innerHTML=html;
}

/* ===== MI PERFIL ===== */
function pintarPerfil(){
  const p=perfilLeer(),c=$("perfil-cuerpo");
  const h=histLeer().filter(x=>norma(x.n)===norma((p.nombre||"")+" "+(p.apellido||"")));
  const pts=h.reduce((a,x)=>a+x.pts,0),oks=h.reduce((a,x)=>a+x.ok,0);
  let mejor=0;try{mejor=+(localStorage.getItem("bior-mejor")||0);}catch(e){}
  c.innerHTML=
    '<div class="perfil-cab vidrio"><img src="'+avSrc(p.avatar||0)+'" alt=""><div><b>'+
    (p.nombre?escH(nombreBonito(p.nombre+" "+(p.apellido||""))):"Sin perfil")+"</b><small>"+escH(p.seccion||"—")+"</small></div></div>"+
    '<div class="stats">'+
    '<div class="vidrio"><b>'+h.length+"</b><small>partidas en este celular</small></div>"+
    '<div class="vidrio"><b>'+oks+"</b><small>aciertos acumulados</small></div>"+
    '<div class="vidrio"><b>'+pts.toLocaleString("es-AR")+"</b><small>puntos acumulados</small></div>"+
    '<div class="vidrio"><b>'+mejor.toLocaleString("es-AR")+"</b><small>mejor puntaje</small></div></div>";
}

/* ============================================================
   EN LÍNEA · dos jugadores, cada uno en su celular
   Supabase Realtime: broadcast + presence, gratis, sin tablas.
   ============================================================ */
const RT_URL="wss://apehzspwbyqwsrdeezrn.supabase.co/realtime/v1/websocket?apikey=sb_publishable_GX9QGXoB3IuHbuLMKsgwgw_IVhGy0KL&vsn=1.0.0";
const ID=(function(){try{let v=sessionStorage.getItem("bior-id");if(!v){v=Math.random().toString(36).slice(2,10);sessionStorage.setItem("bior-id",v);}return v;}catch(e){return Math.random().toString(36).slice(2,10);}})();
const avOk=a=>{a=+a;return a>=0&&a<AVATARES.length-1?Math.floor(a):0;};

/* cliente mínimo del protocolo Phoenix (websocket de Supabase Realtime) */
const RT={ws:null,ref:0,abierto:false,canales:{},hb:null,espera:1000,onEstado:null};
function rtEnviar(o){if(RT.ws&&RT.abierto){try{RT.ws.send(JSON.stringify(o));return true;}catch(e){}}return false;}
function rtConectar(){
  if(RT.ws&&(RT.ws.readyState===0||RT.ws.readyState===1))return;
  let ws;try{ws=new WebSocket(RT_URL);}catch(e){return rtReintentar();}
  RT.ws=ws;
  ws.onopen=()=>{RT.abierto=true;RT.espera=1000;
    clearInterval(RT.hb);RT.hb=setInterval(()=>rtEnviar({topic:"phoenix",event:"heartbeat",payload:{},ref:String(++RT.ref)}),25000);
    Object.keys(RT.canales).forEach(k=>RT.canales[k].unir());
    if(RT.onEstado)RT.onEstado(true);};
  ws.onmessage=ev=>{let m;try{m=JSON.parse(ev.data);}catch(e){return;}
    const c=RT.canales[m.topic];if(c)c.recibir(m);};
  ws.onclose=()=>{const era=RT.abierto;RT.abierto=false;clearInterval(RT.hb);
    Object.keys(RT.canales).forEach(k=>RT.canales[k].unido=false);
    if(era&&RT.onEstado)RT.onEstado(false);rtReintentar();};
  ws.onerror=()=>{};
}
function rtReintentar(){if(!Object.keys(RT.canales).length)return;
  setTimeout(rtConectar,RT.espera);RT.espera=Math.min(RT.espera*2,8000);}
function rtCanal(nombre,h){
  const topic="realtime:"+nombre;
  const c={topic:topic,unido:false,joinRef:null,meta:null,pres:{},
    unir(){c.joinRef=String(++RT.ref);
      rtEnviar({topic:topic,event:"phx_join",ref:c.joinRef,join_ref:c.joinRef,
        payload:{config:{broadcast:{self:false,ack:false},presence:{key:ID},private:false}}});},
    recibir(m){
      if(m.event==="phx_reply"&&m.ref===c.joinRef){
        if(m.payload&&m.payload.status==="ok"){c.unido=true;if(c.meta)c.mandarMeta();if(h.unido)h.unido();}
        else setTimeout(()=>{if(RT.canales[topic])c.unir();},1500);return;}
      if(m.event==="phx_close"||m.event==="phx_error"){c.unido=false;setTimeout(()=>{if(RT.canales[topic]&&RT.abierto)c.unir();},1500);return;}
      if(m.event==="presence_state"){c.pres={};Object.keys(m.payload||{}).forEach(k=>{const x=m.payload[k].metas;if(x&&x.length)c.pres[k]=x[x.length-1];});if(h.pres)h.pres(c.pres);return;}
      if(m.event==="presence_diff"){const d=m.payload||{};
        Object.keys(d.leaves||{}).forEach(k=>{delete c.pres[k];});
        Object.keys(d.joins||{}).forEach(k=>{const x=d.joins[k].metas;if(x&&x.length)c.pres[k]=x[x.length-1];});
        if(h.pres)h.pres(c.pres);return;}
      if(m.event==="broadcast"&&m.payload){const p=m.payload.payload||{};
        if(p.para&&p.para!==ID)return;if(h.msg)h.msg(m.payload.event,p);}
    },
    enviar(ev,p){p=Object.assign({de:ID},p||{});
      return rtEnviar({topic:topic,event:"broadcast",ref:String(++RT.ref),join_ref:c.joinRef,payload:{type:"broadcast",event:ev,payload:p}});},
    mandarMeta(){rtEnviar({topic:topic,event:"presence",ref:String(++RT.ref),join_ref:c.joinRef,
      payload:c.meta?{type:"presence",event:"track",payload:c.meta}:{type:"presence",event:"untrack"}});},
    track(meta){c.meta=meta;if(c.unido)c.mandarMeta();},
    untrack(){if(!c.meta)return;c.meta=null;if(c.unido)c.mandarMeta();},
    salir(){if(c.unido)rtEnviar({topic:topic,event:"phx_leave",payload:{},ref:String(++RT.ref),join_ref:c.joinRef});
      delete RT.canales[topic];c.unido=false;}
  };
  RT.canales[topic]=c;
  if(RT.abierto)c.unir();else rtConectar();
  return c;
}

/* --- estado de la sala --- */
const red={sala:"",rol:"",canal:null,rival:null,rivalAqui:false,ronda:0,rondaT:0,seq:0,pend:null,
  quiero:false,rivalQuiere:false,lobby:null,salas:{},buscarT:null,ausenteT:null,jug:null,secRival:"",avatarRival:1,reanudar:false};
function redEnviar(ev,p){if(red.canal)red.canal.enviar(ev,Object.assign({ronda:red.ronda},p||{}));}
function guardarSesion(){try{sessionStorage.setItem("bior-sala",JSON.stringify({sala:red.sala,rol:red.rol,rival:red.rival,nombre:nombres[yo],t:Date.now()}));}catch(e){}}
function borrarSesion(){try{sessionStorage.removeItem("bior-sala");}catch(e){}}
function banda(txt,boton){const b=$("banda");if(!txt){b.classList.remove("on");return;}
  $("banda-txt").textContent=txt;$("banda-btn").style.display=boton?"":"none";b.classList.add("on");}
RT.onEstado=ok=>{if(!red.sala)return;
  if(!ok)banda("Se cortó tu conexión. Reconectando…",false);
  else if(red.rivalAqui||!red.rival)banda("");};

/* --- lobby: salas esperando rival --- */
function lobbyAbrir(){if(red.lobby)return;
  red.lobby=rtCanal("bior-lobby",{pres:m=>{red.salas=m;pintarSalas();}});}
function lobbyCerrar(){if(red.lobby&&!red.sala){red.lobby.salir();red.lobby=null;}}
function pintarSalas(){
  const cont=$("salas");if(!cont||modoSel!=="linea")return;
  const lista=Object.keys(red.salas).map(k=>red.salas[k]).filter(x=>x&&x.c&&x.id!==ID).sort((a,b)=>(b.t||0)-(a.t||0)).slice(0,10);
  cont.innerHTML=lista.length?lista.map(x=>
    '<button class="sala-item vidrio" type="button" data-c="'+escH(x.c)+'"><img src="'+avSrc(avOk(x.a))+'" alt=""><span><b style="font-size:14.5px">'+escH(corto(limpiaNom(x.n)))+
    '</b><small>'+escH(limpiaSec(x.s))+" · "+nombreModo(x.sg)+'</small></span><b class="cod">'+escH(x.c)+"</b></button>").join("")
    :'<p class="nota">Todavía no hay salas abiertas. Creá una y pasale el código a tu rival.</p>';
}
function codigoNuevo(){const L="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let c;
  const usados=Object.keys(red.salas).map(k=>red.salas[k].c);
  do{c="";for(let i=0;i<4;i++)c+=L[Math.floor(Math.random()*L.length)];}while(usados.indexOf(c)>=0);return c;}

function redEntrar(){
  const cod=$("in-sala").value.toUpperCase().replace(/[^A-Z0-9]/g,"");
  if(cod&&cod.length!==4){$("aviso").textContent="El código de la sala tiene 4 caracteres.";return;}
  if(cod)redUnirse(cod);else redCrear();
}
function redAbrirCanal(code){
  red.sala=code;red.canal=rtCanal("bior-sala-"+code,{pres:redPres,msg:redMsg});
}
function redCrear(){
  redReset();red.rol="host";yo=0;enLinea=false;solo=false;conBot=false;
  nombres=[nombres[0],""];red.avatarRival=1;
  const code=codigoNuevo();redAbrirCanal(code);
  red.canal.track({id:ID,rol:"host",n:nombres[0],a:avatarIdx,s:seccion});
  lobbyAbrir();red.lobby.track({id:ID,c:code,n:nombres[0],a:avatarIdx,s:seccion,sg:seg,t:Date.now()});
  guardarSesion();pintarSala();mostrar("p-sala");
}
function redUnirse(code){
  redReset();red.rol="guest";yo=1;enLinea=false;solo=false;conBot=false;
  nombres=["",nombres[0]];red.avatarRival=0;
  redAbrirCanal(code);
  red.canal.track({id:ID,rol:"guest",n:nombres[1],a:avatarIdx,s:seccion});
  pintarSala("Buscando la sala "+code+"…");mostrar("p-sala");
  clearTimeout(red.buscarT);
  red.buscarT=setTimeout(()=>{if(!red.rival&&red.rol==="guest"){
    pintarSala("No encontramos la sala "+code+". Revisá el código con tu rival: puede que todavía no la haya creado o que ya se haya cerrado.");}},7000);
}
function redReset(){
  if(red.canal)red.canal.salir();
  if(red.lobby)red.lobby.untrack();
  clearTimeout(red.buscarT);clearTimeout(red.ausenteT);
  chat.lista=[];
  Object.assign(red,{sala:"",rol:"",canal:null,rival:null,rivalAqui:false,ronda:0,rondaT:0,seq:0,pend:null,quiero:false,rivalQuiere:false,jug:null,secRival:"",avatarRival:1});
  banda("");
}
function redSalir(){
  if(red.canal)redEnviar("chau",{});
  redReset();enLinea=false;solo=true;conBot=false;partidaViva=false;borrarSesion();
  pararReloj();pararLetra();limpiarTimers();lobbyCerrar();
  mostrar("p-inicio");
}
$("btn-sala-salir").addEventListener("click",()=>{audio();redSalir();});
$("btn-sala-atras").addEventListener("click",()=>{audio();redSalir();});

/* --- presencia --- */
function redPres(m){
  const otros=Object.keys(m).filter(k=>k!==ID).map(k=>m[k]).filter(x=>x&&x.id);
  if(red.rol==="host"){
    if(!red.rival){const g=otros.filter(x=>x.rol==="guest")[0];if(g)redAceptar(g);}
    otros.forEach(x=>{if(x.rol==="guest"&&x.id!==red.rival)red.canal.enviar("llena",{para:x.id});});
    redRivalPresente(!!(red.rival&&m[red.rival]));
  }else if(red.rol==="guest"){
    const h=otros.filter(x=>x.rol==="host")[0];
    if(h&&!red.rival){clearTimeout(red.buscarT);pintarSala("Entrando a la sala…");}
    redRivalPresente(!!(h&&(!red.rival||h.id===red.rival)));
  }
}
function redAceptar(g){
  red.rival=g.id;red.secRival=limpiaSec(g.s);red.avatarRival=avOk(g.a);
  nombres[1]=limpiaNom(g.n)||"Rival";
  if(red.lobby)red.lobby.untrack();
  red.canal.enviar("bien",{para:g.id,hn:nombres[0],ha:avatarIdx,hs:seccion,ga:red.avatarRival,gn:nombres[1],sg:seg});
  guardarSesion();pintarSala();
}
function redRivalPresente(aqui){
  const antes=red.rivalAqui;red.rivalAqui=aqui;
  if(aqui&&red.reanudar){red.reanudar=false;redEnviar("pide",{});}
  if(aqui){clearTimeout(red.ausenteT);banda(RT.abierto?"":"Se cortó tu conexión. Reconectando…",false);
    if(!antes&&enLinea)redMandarEstado();
    if($("p-sala").classList.contains("activa"))pintarSala();
    redBotonFinal();return;}
  if(!antes||!red.rival)return;
  const nom=corto(nombres[1-yo])||"tu rival";
  if($("p-sala").classList.contains("activa")){
    if(red.rol==="host"){clearTimeout(red.ausenteT);red.ausenteT=setTimeout(()=>{if(!red.rivalAqui)redLiberar();},6000);}
    else pintarSala(nom+" se desconectó. Esperando que vuelva…");
    return;}
  if(enLinea&&partidaViva)banda("Se cortó la conexión de "+nom+". Esperando que vuelva…",true);
  redBotonFinal();
}
function redLiberar(){
  red.rival=null;red.rivalAqui=false;nombres[1]="";
  if(red.lobby)red.lobby.track({id:ID,c:red.sala,n:nombres[0],a:avatarIdx,s:seccion,sg:seg,t:Date.now()});
  guardarSesion();pintarSala();
}
$("banda-btn").addEventListener("click",()=>{banda("");
  if(enLinea&&partidaViva)terminar("Se cortó la conexión de "+(corto(nombres[1-yo])||"tu rival")+".");});

/* --- sala de espera --- */
function pintarSala(msg,cerrada){
  $("sala-cod").textContent=red.sala||"····";
  const slot=j=>{
    const lleno=j===0?!!nombres[0]&&(red.rol==="host"||!!red.rival):!!nombres[1]&&(red.rol==="guest"||!!red.rival);
    if(!lleno)return '<div class="vacio-av"><span class="pensando"><i></i><i></i><i></i></span></div><b>Esperando rival</b><small>'+(red.rol==="host"?"Pasale el código":"…")+"</small>";
    const sec=j===yo?seccion:red.secRival;
    const av=j===yo?avatarIdx:red.avatarRival;
    return '<img src="'+avSrc(av)+'" alt=""><b>'+escH(corto(nombres[j]))+(j===yo?" (vos)":"")+'</b><small>'+escH(sec||"")+"</small>";};
  $("sala-j0").innerHTML=slot(0);$("sala-j1").innerHTML=slot(1);
  $("sala-modo").textContent=red.sala?"Modo de la sala: "+nombreModo(seg):"";
  const listos=!!red.rival&&red.rivalAqui;
  let t;
  if(msg)t=msg;
  else if(red.rol==="host")t=listos?"¡Ya llegó "+corto(nombres[1])+"! Cuando estén listos, sorteá el rosco.":"Pasale este código a tu rival para que entre desde su celu. También aparece en la lista de salas abiertas.";
  else t=listos?"Estás en la sala. Esperá a que "+corto(nombres[0])+" sortee el rosco.":"Entrando a la sala…";
  $("sala-txt").textContent=t;
  $("btn-sala-empezar").style.display=red.rol==="host"?"":"none";
  $("btn-sala-empezar").disabled=!listos;
  $("btn-sala-salir").textContent=cerrada?"Volver al inicio":"Salir de la sala";
  chatUbicar();
}
$("btn-sala-empezar").addEventListener("click",()=>{audio();if(red.rol==="host"&&red.rival&&red.rivalAqui)redIniciar();});

/* --- arranque de cada rosco (lo sortea el host) --- */
function redIniciar(){
  red.quiero=false;red.rivalQuiere=false;
  nRosco=sortearRosco();
  const codes=LETRAS.map(l=>[l,Math.floor(Math.random()*POOL[l].length)]);
  const ns=red.jug?red.jug.nombres:nombres;
  const p={ronda:red.ronda+1,rondaT:Date.now(),it:codes,desde:ARRANQUES[nRosco],sg:seg,emp:Math.floor(Math.random()*2),
    nombres:ns.slice(),avatares:[avatarIdx,red.avatarRival],secs:yo===0?[seccion,red.secRival]:[red.secRival,seccion]};
  red.canal.enviar("inicio",p);redAplicarInicio(p);
}
const decodificar=codes=>codes.map(c=>{const l=String(c[0]);const lista=POOL[l]||POOL.A;const i=Math.max(0,Math.min(lista.length-1,+c[1]||0));
  return Object.assign({letra:l,ix:i},lista[i]);});
function redAplicarInicio(p){
  banda("");clearTimeout(red.buscarT);
  enLinea=true;solo=false;conBot=false;recuperacion=false;red.jug=null;
  red.ronda=+p.ronda||1;red.rondaT=+p.rondaT||0;red.seq=0;red.pend=null;red.quiero=false;red.rivalQuiere=false;
  nombres=[limpiaNom(p.nombres[0]),limpiaNom(p.nombres[1])];
  red.avatarRival=avOk(p.avatares[1-yo]);
  if(red.rol==="guest"&&p.secs)red.secRival=limpiaSec(p.secs[0]);
  seg=+p.sg||0;items=decodificar(p.it);
  iniciarRonda(+p.desde||0,seg,p.emp?1:0);guardarSesion();
}

/* --- jugadas --- */
function redJugada(res,txt,porTiempo){
  cortarTiempo();
  if(!enLinea)return;red.seq++;
  redEnviar("jug",{seq:red.seq,i:idx,res:res,tx:String(txt||"").slice(0,40),tiempo:porTiempo?1:0,rel:rel,us:usado});
}
function redPendiente(){
  const p=red.pend;if(!p||!enLinea)return;
  if(p.seq<=red.seq){red.pend=null;return;}
  if(p.seq>red.seq+1){red.pend=null;redEnviar("pide",{});return;}
  if(!jugando||bloqueado||miTurno())return;
  red.pend=null;
  if(p.i!==idx){redEnviar("pide",{});return;}
  red.seq=p.seq;if(Array.isArray(p.rel)){rel=[+p.rel[0]||0,+p.rel[1]||0];relojUI();}
  if(Array.isArray(p.us))usado=[+p.us[0]||0,+p.us[1]||0];
  resolverRival(p);
}
function resolverRival(p){
  const it=items[idx],nom=corto(nombres[turno]);pararLetra();
  if(p.res==="ok"){estado[idx]="acierto";respondio[idx]=turno;puntos[turno]++;rachas[turno]++;sOk();
    feedback("✓ "+nom+" acertó: "+it.p+(rachas[turno]>=3?" · racha de "+rachas[turno]:""));
    cerrarJugada("ok",it);}
  else if(p.res==="mal"){estado[idx]="error";respondio[idx]=turno;rachas[turno]=0;sMal();
    feedback("✕ Era "+it.p+(p.tiempo?" — "+nom+" se quedó sin tiempo.":p.tx?" — "+nom+' escribió «'+escH(p.tx)+"».":""));
    cerrarJugada("mal",it);}
  else if(p.res==="sin"){rel[turno]=0;rachas[turno]=0;if(estado[idx]==="pendiente"){estado[idx]="pasada";respondio[idx]=turno;}sPas();
    feedback("⏱ Se terminó el reloj de "+nom+(tieneTiempo(yo)&&quedan()?". Seguís vos con las letras que quedan.":""));
    cerrarJugada("pas",it);}
  else{if(estado[idx]==="pendiente"){estado[idx]="pasada";respondio[idx]=turno;}rachas[turno]=0;sPas();
    feedback("↻ "+nom+(p.tiempo?" se quedó sin tiempo":" pasó")+". La "+it.letra+" vuelve más adelante.");
    cerrarJugada("pas",it);}
}
function verRival(){
  feedback('<span class="pensando">'+escH(corto(nombres[turno]))+" está pensando <i></i><i></i><i></i></span>");
  $("entrada").value="";
  setTimeout(redPendiente,0);
}
let escribeT=null;
function rivalEscribe(){
  feedback('<span class="pensando">'+escH(corto(nombres[turno]))+" está escribiendo <i></i><i></i><i></i></span>");
  clearTimeout(escribeT);escribeT=setTimeout(()=>{if(jugando&&!miTurno()&&!bloqueado)
    feedback('<span class="pensando">'+escH(corto(nombres[turno]))+" está pensando <i></i><i></i><i></i></span>");},2500);
}
let tecT=0,tecPend=null;
function mandarTecleo(){tecPend=null;tecT=Date.now();if(enLinea&&miTurno()&&jugando&&!bloqueado)redEnviar("tec",{v:$("entrada").value.slice(0,40)});}
$("entrada").addEventListener("input",()=>{if(!enLinea||!miTurno()||!jugando)return;
  if(tecPend)return;const falta=300-(Date.now()-tecT);
  if(falta<=0)mandarTecleo();else tecPend=setTimeout(mandarTecleo,falta);});

/* --- estado completo (reconexión/recarga) --- */
function redMandarEstado(){
  if(!enLinea||!red.canal||!items.length||!red.rondaT)return;
  if(items.some(it=>typeof it.ix!=="number"))return;
  red.canal.enviar("estado",{ronda:red.ronda,rondaT:red.rondaT,seq:red.seq,it:items.map(it=>[it.letra,it.ix]),
    es:estado,rp:respondio,pu:puntos,ra:rachas,idx:idx,tu:turno,rel:rel,us:usado,sg:seg,li:letraIni,
    fin:partidaViva?0:1,nombres:nombres,avatares:[avatarIdx,red.avatarRival],secs:yo===0?[seccion,red.secRival]:[red.secRival,seccion]});
}
function redAplicarEstado(p){
  if(solo)return;
  const nuevo=(+p.rondaT>red.rondaT)||(+p.rondaT===red.rondaT&&+p.seq>red.seq);
  if(!nuevo)return;
  if(+p.rondaT===red.rondaT&&!partidaViva)return;
  enLinea=true;solo=false;conBot=false;recuperacion=false;
  red.ronda=+p.ronda;red.rondaT=+p.rondaT;red.seq=+p.seq;red.pend=null;
  nombres=[limpiaNom(p.nombres[0]),limpiaNom(p.nombres[1])];
  red.avatarRival=avOk((p.avatares||[])[1-yo]);
  if(p.secs)red.secRival=limpiaSec(p.secs[1-yo]);
  seg=+p.sg||0;items=decodificar(p.it);
  iniciarRonda(+p.idx||0,seg,p.tu?1:0);
  const okArr=a=>Array.isArray(a)&&a.length===items.length;
  if(okArr(p.es))estado=p.es.map(s=>["acierto","error","pasada","pendiente"].indexOf(s)>=0?s:"pendiente");
  if(okArr(p.rp))respondio=p.rp.map(x=>+x);
  puntos=[+p.pu[0]||0,+p.pu[1]||0];rachas=[+p.ra[0]||0,+p.ra[1]||0];
  usado=Array.isArray(p.us)?[+p.us[0]||0,+p.us[1]||0]:[0,0];
  rel=Array.isArray(p.rel)?[+p.rel[0]||0,+p.rel[1]||0]:[seg,seg];letraIni=String(p.li||"");arranque=false;relojUI();pintar();
  banda("");guardarSesion();
  if(p.fin){limpiarTimers();terminar("Partida terminada.");}
}

/* --- final: revancha, repaso a solas --- */
function redBotonFinal(){
  chatUbicar();
  const b=$("btn-otra"),t=$("btn-otra-t");
  if(!red.sala){t.textContent="Jugar de nuevo";b.disabled=false;return;}
  const nom=corto((red.jug?red.jug.nombres:nombres)[1-yo]||"tu rival");
  if(!red.rival||!red.rivalAqui){t.textContent=red.rival?"Esperando que vuelva "+nom:"Tu rival salió de la sala";b.disabled=true;return;}
  b.disabled=red.quiero&&!red.rivalQuiere;
  t.textContent=red.quiero?"Esperando a "+nom+"…":red.rivalQuiere?nom+" quiere la revancha: ¡dale!":"Pedir revancha";
}
function redRevancha(){
  red.quiero=true;redEnviar("rev",{});
  if(red.rol==="host"&&red.rivalQuiere)return redIniciar();
  redBotonFinal();
}
function redASolo(){
  red.jug={nombres:nombres.slice()};
  const n=nombres[yo];
  enLinea=false;solo=true;red.quiero=false;nombres=[n,""];
}

/* --- mensajes --- */
function redMsg(ev,p){
  if(ev==="bien"&&red.rol==="guest"){
    clearTimeout(red.buscarT);red.rival=p.de;red.rivalAqui=true;
    if(enLinea&&partidaViva){guardarSesion();return;}
    nombres=[limpiaNom(p.hn)||"Rival",limpiaNom(p.gn)||nombres[1]];
    red.avatarRival=avOk(p.ha);red.secRival=limpiaSec(p.hs);seg=+p.sg||0;sinReloj=seg===0;
    guardarSesion();pintarSala();return;}
  if(ev==="llena"&&red.rol==="guest"&&!red.rival){
    const c=red.sala;redReset();borrarSesion();mostrar("p-sala");
    pintarSala("La sala "+c+" ya tiene dos jugadores. Creá otra o probá con otro código.",true);return;}
  if(p.de!==red.rival)return;
  if(ev==="chat"){chatRecibir(p);return;}
  if(ev==="chau"){
    const nom=corto(nombres[1-yo])||"Tu rival";
    if(red.rol==="guest"){
      if(enLinea&&partidaViva){banda(nom+" salió de la sala.",true);red.rivalAqui=false;red.rival=null;redBotonFinal();return;}
      const c=red.sala;redReset();borrarSesion();enLinea=false;mostrar("p-sala");
      pintarSala(nom+" cerró la sala "+c+".",true);return;}
    red.rivalAqui=false;
    if($("p-sala").classList.contains("activa")){redLiberar();return;}
    if(enLinea&&partidaViva)banda(nom+" salió de la sala.",true);
    red.rival=null;redBotonFinal();return;}
  if(ev==="inicio"){redAplicarInicio(p);return;}
  if(ev==="estado"){redAplicarEstado(p);return;}
  if(ev==="pide"){redMandarEstado();return;}
  if(ev==="rev"){red.rivalQuiere=true;
    if(red.rol==="host"&&red.quiero)return redIniciar();
    redBotonFinal();return;}
  if(p.ronda!==red.ronda||!enLinea)return;
  if(ev==="jug"){red.pend=p;redPendiente();return;}
  if(ev==="tl"){if(!miTurno()&&p.i===idx)correrBarra(+p.s||0);return;}
  if(ev==="reloj"){if(!miTurno()&&typeof p.r==="number"){rel[+p.j||0]=p.r;relojUI();
    if(p.r<=10&&p.r>0)tic(true);}return;}
  if(ev==="tec"){if(!miTurno()&&jugando&&!bloqueado){$("entrada").value=String(p.v||"").replace(/[<>]/g,"").slice(0,40);rivalEscribe();}return;}
  if(ev==="fin"){if(Array.isArray(p.rel))rel=[+p.rel[0]||0,+p.rel[1]||0];if(Array.isArray(p.us))usado=[+p.us[0]||0,+p.us[1]||0];if(partidaViva)terminar(String(p.m||"Partida terminada.").slice(0,120));return;}
}

/* --- chat (sala de espera y pantalla final) --- */
const chat={lista:[],ultimo:0};
const MALAS=/^(bolud|pelotud|forr[oa]s?$|put[oa]s?$|putit|pute[ao]|mierd|conch|culo|orto$|idiot|estupid|tarad|mogol|imbecil|pendej|cagon|chot[oa]|pija|verga|garca|trolo|tont[oa]s?$|inutil|bob[oa]s?$|gord[oa]s?$|fe[oa]s?$|sorete|chupa|coger|cogid|manc[oa]s?$|burr[oa]s?$|matate|muerete|lpm|ctm|hdp|tarupi|zarpad)/;
function filtrar(t){return t.split(/(\s+)/).map(w=>{
  const n=w.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-zñ]/g,"");
  return n&&MALAS.test(n)?"•••":w;}).join("");}
const nomRival=()=>corto((red.jug?red.jug.nombres:nombres)[1-yo]||"tu rival");
function chatUbicar(id){
  const c=$("chat");if(!c)return;
  if(!id){const a=document.querySelector(".pantalla.activa");id=a?a.id:"";}
  const slot=id==="p-sala"?$("slot-sala"):id==="p-resultado"?$("slot-final"):null;
  const ver=!!(slot&&red.sala&&(red.rival||chat.lista.length));
  c.classList.toggle("oculto",!ver);if(!ver)return;
  if(c.parentNode!==slot)slot.appendChild(c);
  const activo=!!(red.rival&&red.rivalAqui);
  [...$("chat-rapidas").children].forEach(b=>b.disabled=!activo);
  chatPintar();
}
function chatPintar(){
  $("chat-tit").textContent="Chat con "+nomRival();
  const l=$("chat-lista");
  l.innerHTML=chat.lista.length?chat.lista.map(m=>m.aviso?'<p class="chat-aviso">'+escH(m.tx)+"</p>":
    '<div class="msg'+(m.mio?" mio":"")+'" style="--c:var(--j'+(m.j+1)+')"><b>'+escH(m.mio?"Vos":corto(m.n))+"</b>"+escH(m.tx)+"</div>").join("")
    :'<p class="chat-vacio">Mandale una frase a '+escH(nomRival())+". Por ejemplo, para ponerse de acuerdo y jugar otra.</p>";
  if(red.rival&&!red.rivalAqui&&chat.lista.length)l.innerHTML+='<p class="chat-aviso">'+escH(nomRival())+" no está conectado.</p>";
  l.scrollTop=l.scrollHeight;
}
function chatEnviar(tx){
  tx=filtrar(String(tx||"").replace(/\s+/g," ").trim().slice(0,80));
  if(!tx||!red.rival||!red.rivalAqui)return;
  const t=Date.now();if(t-chat.ultimo<700)return;chat.ultimo=t;
  redEnviar("chat",{tx:tx});
  chat.lista.push({mio:1,j:yo,n:nombres[yo]||(red.jug?red.jug.nombres[yo]:""),tx:tx});
  if(chat.lista.length>60)chat.lista.shift();
  chatPintar();
}
function chatRecibir(p){
  const tx=filtrar(String(p.tx||"").replace(/\s+/g," ").trim().slice(0,80));if(!tx)return;
  chat.lista.push({mio:0,j:1-yo,n:(red.jug?red.jug.nombres:nombres)[1-yo],tx:tx});
  if(chat.lista.length>60)chat.lista.shift();
  tono(1046,.09,"sine",.1);tono(1318,.12,"sine",.09,.08);
  chatUbicar();
}
$("chat-rapidas").addEventListener("click",e=>{const b=e.target.closest(".chip");if(b)chatEnviar(b.textContent);});
$("chat-form").addEventListener("submit",e=>{e.preventDefault();chatEnviar($("chat-in").value);$("chat-in").value="";});

/* --- volver a la sala si recargó la página --- */
(function(){let g=null;try{g=JSON.parse(sessionStorage.getItem("bior-sala")||"null");}catch(e){}
  if(!g||!g.sala||Date.now()-g.t>2*3600*1000)return;
  const nom=limpiaNom(g.nombre);if(!nom)return;
  const pf=perfilLeer();if(pf.nombre){$("in-nombre").value=pf.nombre;$("in-apellido").value=pf.apellido||"";}
  modoSel="linea";pintarModo();
  if(g.rol==="host"){redReset();red.rol="host";yo=0;nombres=[nom,""];redAbrirCanal(g.sala);red.rival=g.rival||null;
    red.canal.track({id:ID,rol:"host",n:nom,a:avatarIdx,s:seccion});
    if(!red.rival){lobbyAbrir();red.lobby.track({id:ID,c:g.sala,n:nom,a:avatarIdx,s:seccion,sg:seg,t:Date.now()});}}
  else{redReset();red.rol="guest";yo=1;nombres=["",nom];redAbrirCanal(g.sala);red.rival=g.rival||null;
    red.canal.track({id:ID,rol:"guest",n:nom,a:avatarIdx,s:seccion});}
  red.reanudar=true;pintarSala("Volviendo a la sala "+g.sala+"…");mostrar("p-sala");
  red.buscarT=setTimeout(()=>{if(!red.rivalAqui)pintarSala("Tu rival ya no está en la sala "+g.sala+".",true);},9000);
})();

pintarSonido();pintarVoz();pintarModo();

/* PWA: instalar como app para jugar a pantalla completa */
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));}
