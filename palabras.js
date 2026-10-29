/* ===== BIOROSCO · banco de palabras =====
   Es la tabla completa del Pasapalabra de Biología (repo pasapalabra-bio).
   Cada letra tiene varias palabras: en cada partida se sortea una por letra.
   m: E = "empieza por", C = "contiene"
   p: palabra · v: variantes aceptadas · k: pista clave · d: definición */
const E="empieza",C="contiene";
const POOL={
A:[
 {m:E,p:"ADAPTACIÓN",v:["adaptaciones"],k:"heredable y ventajosa en ese ambiente",d:"Característica heredable que resulta ventajosa en un determinado ambiente y se vuelve común en la población a lo largo de las generaciones."},
 {m:E,p:"ÁCIDOS NUCLEICOS",v:["ácido nucleico","ácidos nucléicos"],k:"la información hereditaria",d:"Biomoléculas que guardan y transmiten la información hereditaria. <b>(Dos palabras.)</b>"},
 {m:E,p:"APARATO DE GOLGI",v:["golgi","aparato golgi"],k:"organela que empaqueta y envía",d:"Organela con membrana que empaqueta y envía a su destino las sustancias que fabrica la célula, después de modificarlas. <b>(Tres palabras.)</b>"},
 {m:E,p:"ADULTO",v:["adulta","adultos"],k:"la etapa final del ciclo",d:"Etapa final del ciclo de vida, en la que el individuo ya alcanzó la madurez y puede reproducirse."},
 {m:E,p:"ADN",v:["dna","ácido desoxirribonucleico","acido desoxirribonucleico"],k:"la doble hélice",d:"Ácido nucleico formado por dos cadenas enlazadas en forma de doble hélice, que guarda la información hereditaria de la célula."},
 {m:E,p:"ARN",v:["rna","ácido ribonucleico","acido ribonucleico"],k:"la cadena simple que copia las instrucciones",d:"Ácido nucleico formado por una sola cadena, que copia las instrucciones del material genético y participa en la fabricación de las proteínas."},
 {m:E,p:"ÁTOMO",v:["atomo"],k:"la unidad básica",d:"Unidad básica de la materia."},
 {m:E,p:"AEROBIA",v:["aeróbica","aerobica","aeróbico","aerobico"],k:"respiración con oxígeno",d:"Tipo de respiración celular que requiere oxígeno."},
 {m:E,p:"AGUA",v:["aguas","h2o"],k:"la fórmula H₂O",d:"Sustancia de fórmula H₂O que las plantas usan en la fotosíntesis y que se forma en la respiración aerobia."}],
B:[
 {m:E,p:"BIOMOLÉCULA",v:["biomoléculas"],k:"cuatro familias propias de lo vivo",d:"Molécula característica de los seres vivos, necesaria para formar sus estructuras y cumplir sus funciones; se agrupa en cuatro familias."},
 {m:C,p:"CATABOLISMO",v:[],k:"romper y liberar energía",d:"Proceso metabólico de ruptura de moléculas complejas en piezas más pequeñas, con liberación de la energía contenida en sus enlaces."},
 {m:E,p:"BIOELEMENTOS",v:["bioelemento"],k:"los elementos químicos de lo vivo",d:"Elementos químicos que forman a los seres vivos; seis de ellos forman casi todo lo que está vivo."},
 {m:C,p:"ANABOLISMO",v:[],k:"construir gastando energía",d:"Proceso metabólico de construcción de moléculas complejas a partir de piezas pequeñas, usando energía."},
 {m:C,p:"METABOLISMO",v:[],k:"todas las reacciones de la célula",d:"Conjunto de todas las reacciones químicas que ocurren dentro de las células, transformando unas sustancias en otras."},
 {m:E,p:"BIOLOGÍA",v:["biologia"],k:"la ciencia de lo vivo",d:"Ciencia que estudia a los seres vivos, su estructura, su funcionamiento, su origen y su relación con el ambiente."},
 {m:E,p:"BIOMA",v:["biomas"],k:"muchos ecosistemas con el mismo clima",d:"Conjunto de ecosistemas que comparten un mismo clima, vegetación y fauna característicos."},
 {m:E,p:"BIOSFERA",v:[],k:"donde existe la vida en el planeta",d:"Conjunto de todos los ecosistemas del planeta; es la parte de la Tierra donde existe vida."}],
C:[
 {m:E,p:"CRECIMIENTO",v:[],k:"aumento de tamaño y de masa",d:"Aumento de tamaño y de masa del organismo a lo largo del tiempo."},
 {m:E,p:"CÉLULA",v:["células","celula"],k:"la unidad de lo vivo",d:"Unidad estructural, funcional y de origen de los seres vivos."},
 {m:E,p:"CITOPLASMA",v:[],k:"el medio gelatinoso de la célula",d:"Medio gelatinoso que rodea a las organelas; en él ocurren muchas de las reacciones químicas de la célula."},
 {m:E,p:"CITOESQUELETO",v:[],k:"la red de fibras que sostiene la forma",d:"Red de fibras que sostiene la forma de la célula y mueve sus partes internas."},
 {m:E,p:"CLOROPLASTOS",v:["cloroplasto"],k:"organelas de la fotosíntesis",d:"Organelas con membrana que captan la luz del sol y la usan para transformar agua y dióxido de carbono en alimento. En ellas ocurre la fotosíntesis."},
 {m:E,p:"CLOROFILA",v:["clorofila"],k:"el pigmento verde",d:"Pigmento verde que capta la energía de la luz en la fotosíntesis."},
 {m:E,p:"CENTRÍOLOS",v:["centríolo","centriolos","centriolo"],k:"organelas sin membrana de la división",d:"Organelas sin membrana que organizan las fibras que reparten el material genético cuando la célula se divide."},
 {m:E,p:"COMUNIDAD",v:["comunidades"],k:"todas las poblaciones juntas",d:"Conjunto de poblaciones de distintas especies que viven e interactúan en un mismo lugar y tiempo."},
 {m:E,p:"CARBONO",v:[],k:"el esqueleto de las biomoléculas",d:"Elemento químico que forma el esqueleto de las biomoléculas, porque sus átomos se unen entre sí formando cadenas."},
 {m:E,p:"CRESTA",v:["crestas"],k:"pliegue de la mitocondria",d:"Pliegue de la membrana interna de la mitocondria."}],
D:[
 {m:E,p:"DESARROLLO",v:[],k:"formas y capacidades nuevas",d:"Aparición de nuevas formas, estructuras y capacidades a lo largo de la vida del organismo."},
 {m:E,p:"DESARROLLO DIRECTO",v:[],k:"el recién nacido ya se parece al maduro",d:"Conjunto de cambios en el que el individuo joven tiene un aspecto parecido al del adulto. <b>(Dos palabras.)</b>"},
 {m:E,p:"DESARROLLO INDIRECTO",v:[],k:"crece por etapas, con metamorfosis",d:"Conjunto de cambios en el que el individuo joven tiene un aspecto muy distinto al del adulto y cambia su cuerpo por etapas hasta parecerse a él. <b>(Dos palabras.)</b>"},
 {m:E,p:"DIÓXIDO DE CARBONO",v:["dioxido de carbono","co2","dióxido","dioxido"],k:"el gas que libera la respiración",d:"Gas que se libera en la respiración aerobia y que las plantas usan en la fotosíntesis. <b>(Tres palabras.)</b>"}],
E:[
 {m:E,p:"ENERGÍA",v:[],k:"no pesa, pero produce cambios",d:"Capacidad de producir transformaciones, cambios o calor. No es un objeto físico con peso, pero permite que la materia se active y los procesos de la vida sucedan."},
 {m:E,p:"ESTÍMULO",v:["estímulo","estimulo","estímulos","estimulos"],k:"el cambio que se detecta",d:"Cambio del ambiente externo o interno de un ser vivo que es detectado por este y provoca en él una reacción."},
 {m:E,p:"ESTOMA",v:["estomas"],k:"poros que respiran",d:"Poro de la epidermis vegetal por el que la planta intercambia gases con el ambiente."},
 {m:E,p:"ECOSISTEMA",v:["ecosistemas"],k:"la comunidad más su ambiente",d:"Conjunto formado por una comunidad y el ambiente físico con el que intercambia materia y energía."}],
F:[
 {m:E,p:"FOTOAUTÓTROFOS",v:["fotoautótrofo","fotoautótrofa","fotoautótrofas"],k:"fabrican su alimento con luz",d:"Autótrofos que usan la energía de la luz solar para fabricar materia orgánica."},
 {m:E,p:"FOTOSÍNTESIS",v:["fotosintesis"],k:"luz convertida en alimento",d:"Proceso mediante el cual los organismos fotosintéticos transforman la energía de la luz en energía química, produciendo glucosa a partir de dióxido de carbono y agua."},
 {m:E,p:"FECUNDACIÓN",v:[],k:"se unen las dos células sexuales",d:"Proceso en el que se unen la célula sexual masculina y la femenina; en las plantas con flor ocurre después de que el polen llega a la parte femenina."},
 {m:E,p:"FUNCIONES VITALES",v:["función vital"],k:"nutrición, relación y reproducción",d:"Los tres procesos que realizan todos los seres vivos y que los distinguen de los objetos inertes: nutrición, relación y reproducción. <b>(Dos palabras.)</b>"}],
G:[
 {m:E,p:"GLUCÓGENO",v:[],k:"reserva de energía rápida",d:"Hidrato de carbono con el que la parina almacena energía para usarla rápido."},
 {m:E,p:"GLUCOSA",v:[],k:"el azúcar del alimento",d:"Molécula del alimento que, al romperse, libera la energía guardada en sus enlaces."},
 {m:C,p:"ÓRGANO",v:["órganos","organo","organos"],k:"varios tejidos coordinados",d:"Conjunto de dos o más tejidos que trabajan coordinadamente para cumplir una función determinada."}],
H:[
 {m:E,p:"HOMEOSTASIS",v:[],k:"mantener estable lo interno",d:"Capacidad de mantener condiciones internas estables aunque el ambiente cambie."},
 {m:E,p:"HIDRATOS DE CARBONO",v:["hidrato de carbono","glúcidos","glúcido","carbohidratos","carbohidrato"],k:"energía rápida y sostén",d:"Biomoléculas que aportan energía rápida a la célula y forman estructuras de sostén. <b>(Tres palabras.)</b>"},
 {m:E,p:"HUEVO",v:["huevos"],k:"la primera etapa del ciclo",d:"Primera etapa del ciclo de vida de muchos animales, en la que el embrión se desarrolla protegido dentro de una cubierta."},
 {m:E,p:"HIDRÓGENO",v:["hidrogeno"],k:"el elemento más liviano",d:"Elemento químico más liviano que existe, presente en el agua y en las biomoléculas."}],
I:[{m:E,p:"IRRITABILIDAD",v:[],k:"detectar y responder",d:"Capacidad de detectar estímulos del ambiente y responder a ellos."}],
J:[
 {m:C,p:"TEJIDO",v:["tejidos"],k:"células semejantes cooperando",d:"Conjunto de células semejantes que cooperan para cumplir una función específica."}],
L:[
 {m:E,p:"LÍPIDOS",v:["lípido"],k:"guardan energía y forman la membrana",d:"Biomoléculas que guardan energía de reserva y forman la membrana de las células."},
 {m:E,p:"LUZ SOLAR",v:["luz","luz del sol"],k:"la energía que capta el cardón",d:"Energía que los fotoautótrofos capturan para fabricar materia orgánica. <b>(Dos palabras.)</b>"},
 {m:E,p:"LISOSOMAS",v:["lisosoma"],k:"organelas que digieren",d:"Organelas con membrana que digieren sustancias que ingresan a la célula, desechos y partes dañadas."},
 {m:E,p:"LARVA",v:["larvas","oruga","renacuajo"],k:"la juvenil que se alimenta y crece",d:"Etapa juvenil que se alimenta y crece, con un aspecto muy distinto al del individuo maduro, como la oruga o el renacuajo."}],
M:[
 {m:E,p:"MATERIA",v:[],k:"tiene masa y ocupa volumen",d:"Todo lo que tiene masa y ocupa un lugar en el espacio (volumen). Se puede pesar y medir."},
 {m:E,p:"MEMBRANA PLASMÁTICA",v:["membrana plasmatica","membrana celular"],k:"la envoltura que controla entradas y salidas",d:"Envoltura flexible que controla qué sustancias entran y salen de la célula. <b>(Dos palabras.)</b>"},
 {m:E,p:"MITOCONDRIAS",v:["mitocondria"],k:"organelas de la respiración celular",d:"Organelas con membrana que liberan la energía de los nutrientes. En ellas ocurre la respiración celular."},
 {m:E,p:"MOLÉCULA",v:["moléculas","molecula"],k:"átomos unidos por enlaces",d:"Unión de dos o más átomos mediante enlaces químicos."}],
N:[
 {m:E,p:"NUTRICIÓN",v:[],k:"incorporar, transformar y eliminar",d:"Conjunto de procesos por los cuales los organismos incorporan materia y energía del ambiente, las transforman dentro del cuerpo y eliminan los desechos."},
 {m:E,p:"NÚCLEO",v:["nucleo"],k:"la organela que guarda la información genética",d:"Organela con membrana que guarda la mayor parte de la información genética y dirige las actividades de la célula."}],
"Ñ":[{m:C,p:"VICUÑA",v:["vicuñas"],k:"la de la Puna, con vellón espeso",d:"Mamífero de la Puna con vellón espeso que baja a los valles cuando las heladas destruyen el ichu."}],
O:[{m:C,p:"NIVEL DE ORGANIZACIÓN",v:["niveles de organización","nivel organización"],k:"los escalones del átomo a la biósfera",d:"Cada uno de los escalones que ordenan la materia desde el átomo hasta la biósfera, donde cada nivel incluye al anterior. Es un modelo científico creado para estudiar a los seres vivos. <b>(Tres palabras.)</b>"},
 {m:E,p:"ORGANELA",v:["organelas","orgánulo","organulo","orgánulos","organulos"],k:"la pieza con función propia dentro de la célula",d:"Estructura con una función específica que se encuentra dentro de la célula."},
 {m:E,p:"ORGANISMO",v:["organismos"],k:"el ser vivo individual",d:"Ser vivo individual capaz de cumplir todas las funciones vitales."},
 {m:E,p:"OXÍGENO",v:["oxigeno"],k:"el gas de la respiración celular",d:"Gas que las plantas liberan en la fotosíntesis y que se usa en la respiración aerobia."}],
P:[
 {m:E,p:"PROTEÍNAS",v:["proteína"],k:"estructura, defensa, transporte y enzimas",d:"Biomoléculas que forman las estructuras del cuerpo, defienden al organismo, transportan sustancias y aceleran reacciones químicas."},
 {m:E,p:"PARED CELULAR",v:["pared"],k:"la cubierta rígida que da forma",d:"Cubierta rígida que protege a la célula y le da forma. <b>(Dos palabras.)</b>"},
 {m:E,p:"PUPA",v:["pupas"],k:"la etapa de aparente reposo",d:"Etapa de aparente reposo en la que el cuerpo se reorganiza por completo para transformarse en el individuo maduro, como ocurre dentro del capullo de una mariposa."},
 {m:E,p:"PARINA GRANDE",v:["parina","flamenco andino"],k:"el flamenco de Socompa",d:"Ave rosada que filtra el agua salada de la Laguna Socompa. <b>(Dos palabras.)</b>"},
 {m:E,p:"POBLACIÓN",v:["poblaciones"],k:"los de una especie en un lugar y tiempo",d:"Conjunto de organismos de la misma especie que viven en un mismo lugar y tiempo."},
 {m:E,p:"PLURICELULAR",v:["pluricelulares","multicelular","multicelulares"],k:"muchas células en conjunto",d:"Tipo de organismo formado por muchas células que trabajan en conjunto."},
 {m:E,p:"PUNA",v:[],k:"los Andes arriba de todo",d:"Región de gran altura de los Andes, de clima frío y seco."}],
Q:[
 {m:E,p:"QUIMIOAUTÓTROFOS",v:["quimioautótrofo","quimioautótrofa","quimioautótrofas"],k:"energía sin luz, de sustancias inorgánicas",d:"Autótrofos que obtienen energía de reacciones con sustancias inorgánicas del ambiente, en lugar de la luz solar."}],
R:[
 {m:E,p:"REPRODUCCIÓN",v:[],k:"dejar nuevos individuos",d:"Capacidad de generar nuevos individuos que continúan la especie."},
 {m:E,p:"RETÍCULO ENDOPLASMÁTICO RUGOSO",v:["retículo rugoso","reticulo endoplasmatico rugoso","rer"],k:"organela que transporta las proteínas",d:"Organela con membrana que prepara y transporta las proteínas que fabrican los ribosomas pegados a su superficie. <b>(Tres palabras.)</b>"},
 {m:E,p:"RETÍCULO ENDOPLASMÁTICO LISO",v:["retículo liso","reticulo endoplasmatico liso","rel"],k:"organela que produce grasas",d:"Organela con membrana que produce grasas y transforma algunas sustancias tóxicas para que puedan eliminarse. <b>(Tres palabras.)</b>"},
 {m:E,p:"RIBOSOMAS",v:["ribosoma"],k:"organelas sin membrana que fabrican proteínas",d:"Organelas sin membrana que fabrican las proteínas de la célula."},
 {m:E,p:"RESPUESTA",v:["respuestas"],k:"la reacción frente al estímulo",d:"Reacción de un ser vivo frente a un cambio detectado en su ambiente, como alejarse, cerrar una hoja o liberar una hormona."},
 {m:E,p:"RESPIRACIÓN CELULAR",v:["respiracion celular","respiración"],k:"del alimento a la energía",d:"Conjunto de procesos catabólicos que permiten convertir el alimento en energía. <b>(Dos palabras.)</b>"}],
S:[
 {m:E,p:"SEXUAL",v:["reproducción sexual"],k:"dos progenitores, hijos distintos",d:"Tipo de reproducción con dos progenitores, donde se unen sus células reproductivas y los descendientes son genéticamente distintos entre sí y respecto de los progenitores."},
 {m:E,p:"SELECCIÓN NATURAL",v:["selección"],k:"las ventajosas se vuelven comunes",d:"Proceso por el cual ciertas características heredables hacen que sus portadores dejen más descendencia y se vuelvan comunes. <b>(Dos palabras.)</b>"},
 {m:E,p:"SISTEMA",v:["sistemas"],k:"partes que funcionan como un todo",d:"Conjunto de partes relacionadas entre sí que funcionan como un todo y que se estudia separado de su entorno."},
 {m:E,p:"SISTEMA ABIERTO",v:[],k:"intercambia materia y energía sin parar",d:"Porción delimitada que intercambia materia y energía con su ambiente. Los seres vivos son de este tipo. <b>(Dos palabras.)</b>"},
 {m:E,p:"SISTEMA CERRADO",v:[],k:"intercambia energía, pero no materia",d:"Porción delimitada que intercambia energía con su ambiente, pero no materia. <b>(Dos palabras.)</b>"},
 {m:E,p:"SISTEMA AISLADO",v:[],k:"no intercambia nada con el ambiente",d:"Porción delimitada que no intercambia ni materia ni energía con su ambiente. <b>(Dos palabras.)</b>"},
 {m:E,p:"SALES MINERALES",v:["sal mineral"],k:"lo que el cardón toma del suelo",d:"Materia que el cardón absorbe del suelo junto con el agua. <b>(Dos palabras.)</b>"},
 {m:E,p:"SISTEMA DE ÓRGANOS",v:["sistema de organos","sistemas de órganos","sistemas de organos"],k:"órganos trabajando en conjunto",d:"Conjunto de órganos que trabajan coordinadamente para cumplir una función común. <b>(Tres palabras.)</b>"}],
T:[
 {m:C,p:"HETERÓTROFOS",v:["heterótrofo","heterótrofa","heterótrofas"],k:"comen materia orgánica ya formada",d:"Organismos que no pueden fabricar su propia materia orgánica y la incorporan ya formada, comiendo a otros seres vivos o sus restos."},
 {m:E,p:"TUCÁN GRANDE",v:["tucán"],k:"el del pico naranja hueco",d:"Ave de pico naranja hueco que siembra la selva de las Yungas. <b>(Dos palabras.)</b>"}],
U:[
 {m:E,p:"UNIFORMIDAD MOLECULAR",v:["uniformidad"],k:"todos con las mismas biomoléculas",d:"Evidencia del origen común de los seres vivos, que surge de que todos están formados por los mismos tipos de biomoléculas. <b>(Dos palabras.)</b>"},
 {m:C,p:"AUTÓTROFOS",v:["autótrofo","autótrofa","autótrofas"],k:"fabrican su propia materia orgánica",d:"Organismos que fabrican su propia materia orgánica a partir de materia inorgánica del ambiente."},
 {m:E,p:"UNICELULAR",v:["unicelulares"],k:"una sola célula lo hace todo",d:"Tipo de organismo formado por una sola célula, que cumple en ella todas las funciones vitales."}],
V:[
 {m:E,p:"VACUOLA CENTRAL",v:["vacuola"],k:"organela que almacena agua y mantiene firme la célula",d:"Organela con membrana que almacena agua y otras sustancias, mantiene firme la célula y digiere desechos. <b>(Dos palabras.)</b>"}],
X:[
 {m:C,p:"ASEXUAL",v:["reproducción asexual"],k:"un solo progenitor, sin células sexuales",d:"Tipo de reproducción con un solo progenitor, sin unión de células reproductivas, donde los descendientes son numerosos y genéticamente idénticos a él."}],
Y:[{m:E,p:"YUNGAS",v:["yunga"],k:"la nuboselva salteña",d:"Selva de montaña húmeda del este de Salta, también llamada nuboselva."}],

};
const LETRAS=["A","B","C","D","E","F","G","H","I","J","L","M","N","Ñ","O","P","Q","R","S","T","U","V","X","Y"];
const ARRANQUES=[7,19,2,21,10,15,4,22,12,17];
