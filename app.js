// GASDRIVE DGT V8.2 CAT - 380 PREGUNTES DGT 2026
const VERSION = "8.2";

// COMBO DOPAMINA
const EMOJIS_ENCERT = ['🚀','💎','👑','🔥','💯','⚡','🏆','🦄','🤑','✅','💪','😎','🎯','💥','🌟','🎉'];
const EMOJIS_FALLO = ['❌','💀','😭','⛔','💔','😵','🤦','🚫','💩','🤡','💥','😤'];

// INTRO SCREEN - Apareix 1 cop
function mostrarIntro(){
  if(localStorage.getItem('gd_intro_v8_2')) return;
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="intro-screen" style="position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,#1a1a2e,#16213e);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px">
      <div style="font-size:64px;margin-bottom:20px">🚗</div>
      <h1 style="font-size:32px;margin:0 0 10px">GasDrive DGT CAT 2026</h1>
      <p style="font-size:18px;opacity:0.8;margin:0 0 30px">Aprèn el carnet en 15 min al dia</p>
      <div style="text-align:left;font-size:16px;margin-bottom:40px;line-height:2">
        <div>💰 Guanya coins responent bé</div>
        <div>🏎️ Compra supercotxes al Garatge</div>
        <div>📚 380 preguntes DGT reals</div>
      </div>
      <button onclick="tancarIntro()" style="background:linear-gradient(135deg,#ff8c00,#ff2d55);border:none;color:#fff;padding:16px 48px;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer">COMENÇAR</button>
    </div>
  `);
}
function tancarIntro(){
  localStorage.setItem('gd_intro_v8_2', '1');
  document.getElementById('intro-screen').remove();
}

// 100 TIPS DEL DIA - DOPAMINA DIÀRIA
const TIPS = [
  {emoji:'🚗', txt:'Regla dels 2 segons: manté distància amb el cotxe del davant'},
  {emoji:'👀', txt:'Mira 12 segons endavant, no només el cotxe de davant'},
  {emoji:'🌧️', txt:'Pluja: augmenta distància x2 i redueix velocitat'},
  {emoji:'🌙', txt:'De nit redueix velocitat un 10-15%'},
  {emoji:'🚙', txt:'Avança només quan vegis 200m lliures'},
  {emoji:'🛑', txt:'STOP vol dir aturada total, no frenada'},
  {emoji:'⚠️', txt:'Cediu el pas als vianants al pas de zebra'},
  {emoji:'💡', txt:'Fes servir els intermitents 3 segons abans de girar'},
  {emoji:'🛣️', txt:'Velocitat màxima en autovia: 120 km/h'},
  {emoji:'🏙️', txt:'Velocitat màxima en ciutat: 50 km/h'},
  {emoji:'🚸', txt:'Al voltant d’escoles baixa a 30 km/h'},
  {emoji:'🍺', txt:'Alcohol i conducció no són compatibles. 0,0 és segur'},
  {emoji:'😴', txt:'Si tens son, para i descansa. 15 min canvien tot'},
  {emoji:'📱', txt:'No facis servir el mòbil mentre condueixes'},
  {emoji:'🪞', txt:'Regula els miralls abans de sortir'},
  {emoji:'🎒', txt:'Posa el cinturó encara que siguin 2 min'},
  {emoji:'👶', txt:'Nens <135cm han d’anar amb SRI adequat'},
  {emoji:'🐶', txt:'Animals ben subjectes al cotxe'},
  {emoji:'🧳', txt:'Càrrega ben repartida i lligada'},
  {emoji:'🚲', txt:'Deixa 1,5m al avançar ciclistes'},
  {emoji:'🔄', txt:'En rotonda, qui està dins té preferència'},
  {emoji:'🚦', txt:'Groc intermitent = precaució màxima'},
  {emoji:'🚑', txt:'Cedeix pas a vehicles d’emergència amb llums'},
  {emoji:'🌫️', txt:'Boira: llums antiboira + curtes, mai llargues'},
  {emoji:'❄️', txt:'Gel: marxes llargues, frena suau, sense cops de volant'},
  {emoji:'🛞', txt:'Pneumàtic llis = multa + risc aquaplaning'},
  {emoji:'💨', txt:'Distància lateral en avançar bici: 1.5m mínim'},
  {emoji:'🚧', txt:'Línia contínua = no avançar, mai'},
  {emoji:'🅿️', txt:'Aparcar en baixada: rodes girades a la vorera'},
  {emoji:'🔦', txt:'En túnel: engega llums de cruïlla'},
  {emoji:'⚡', txt:'Cotxe elèctric: silenciós, vigila vianants'},
  {emoji:'🔧', txt:'Testimoni oli vermell = atura el motor JA'},
  {emoji:'🌡️', txt:'Motor calent: no obris el tap del refrigerant'},
  {emoji:'⛽', txt:'Reserva = 50km aprox, no juguis amb això'},
  {emoji:'🧠', txt:'Cada fallo t’ensenya. Torna a repassar-ho'},
  {emoji:'🎯', txt:'Llegeix TOTA la pregunta abans de respondre'},
  {emoji:'⏱️', txt:'No tinguis pressa, l’examen no és carrera'},
  {emoji:'📖', txt:'Repeteix els errors fins que no els tornis a fer'},
  {emoji:'🚙', txt:'En costa estreta, puja té preferència'},
  {emoji:'🌉', txt:'A ponts estrets, cedeix si estàs més a prop'},
  {emoji:'🚂', txt:'Pas a nivell: baixa barrera = aturada obligatòria'},
  {emoji:'🚛', txt:'Camió girant: no t’hi fiquis pel costat'},
  {emoji:'🚌', txt:'Bus sortint de parada: facilita-li la sortida'},
  {emoji:'🏍️', txt:'Moto entre carrils: manté distància'},
  {emoji:'🦓', txt:'Pas de vianants elevat: redueix encara més'},
  {emoji:'🌳', txt:'Fulles a terra = asfalt relliscós'},
  {emoji:'💦', txt:'Bassal gran: redueix i aguanta el volant'},
  {emoji:'💨', txt:'Vent lateral: subjecta fort el volant'},
  {emoji:'🚨', txt:'Conductor novell: L al darrere 1 any'},
  {emoji:'👓', txt:'Si uses ulleres, porta-les sempre'},
  {emoji:'🧤', txt:'Guants en moto = menys lesions mans'},
  {emoji:'🪖', txt:'Casco ben abrotxat salva vides'},
  {emoji:'🔊', txt:'Música alta = menys atenció'},
  {emoji:'🍕', txt:'Menja abans de conduir llarg, no durant'},
  {emoji:'💊', txt:'Medicaments amb somnolència = no conduir'},
  {emoji:'🅰️', txt:'Senyal A a darrere si no arribes a 60km/h'},
  {emoji:'🚜', txt:'Tractor: paciència, avançarà quan pugui'},
  {emoji:'🐴', txt:'Animal a via: atura, no toquis el clàxon'},
  {emoji:'🏁', txt:'Final autovia: cedeix al incorporar-te'},
  {emoji:'🅾️', txt:'Zona ORA: mira panell abans d’aparcar'},
  {emoji:'🅿️', txt:'Park & Ride: aparca fora, entra en bus'},
  {emoji:'🅱️', txt:'Carril bus: prohibit excepte taxis/bicis'},
  {emoji:'🚲', txt:'Carril bici: mai aparcar ni circular'},
  {emoji:'🛑', txt:'Ceda el pas = redueix i mira als dos costats'},
  {emoji:'🔀', txt:'Canvi carril: mirall + angle mort + intermitent'},
  {emoji:'🅾️', txt:'Obstrucció: avisa amb triangles si pares'},
  {emoji:'🚗', txt:'Cotxe aturat voral: passa lent i amb precaució'},
  {emoji:'🌉', txt:'Túnel llarg: manté distància i llums encesos'},
  {emoji:'🚧', txt:'Obres: respecta senyals provisionals'},
  {emoji:'🔄', txt:'Canvi sentit: només on està permès'},
  {emoji:'🅿️', txt:'Marxa enrere: només imprescindible i curt'},
  {emoji:'🚙', txt:'Adelantamiento: acaba’l ràpid i segur'},
  {emoji:'⛔', txt:'No entrar: cercle vermell = prohibit passar'},
  {emoji:'🚦', txt:'Semàfor amb fletxa: segueix la fletxa'},
  {emoji:'🛑', txt:'STOP sense línia: para abans de la intersecció'},
  {emoji:'🚸', txt:'Col·legi: 30km/h quan hi ha nens'},
  {emoji:'🌙', txt:'Llums de posició no serveixen de nit'},
  {emoji:'💡', txt:'Llums llargues: apaga a 150m d’un altre'},
  {emoji:'🚨', txt:'Avaria: armilla + triangles a 50m'},
  {emoji:'🧯', txt:'Extintor: revisa data caducitat'},
  {emoji:'🛞', txt:'Recanvi: comprova pressió cada mes'},
  {emoji:'🔋', txt:'Bateria: neteja borns si costa arrencar'},
  {emoji:'💧', txt:'Neteja líquid: mai només aigua'},
  {emoji:'🌡️', txt:'Temperatura alta: para i espera refredar'},
  {emoji:'🛢️', txt:'Oli: nivell entre mín i màx'},
  {emoji:'🚗', txt:'Retrovisors: veure just una mica carroseria'},
  {emoji:'🪑', txt:'Seient: genolls flexionats, braços relaxats'},
  {emoji:'🎒', txt:'Objectes solts = projectils en xoc'},
  {emoji:'👶', txt:'SRI: grup 0 fins 13kg, d’esquena a marxa'},
  {emoji:'🐾', txt:'Gos: arnès o transportí, mai solt'},
  {emoji:'🧳', txt:'Maleter: pes baix i ben subjecte'},
  {emoji:'🚗', txt:'Distància amb camió: més del doble'},
  {emoji:'🌧️', txt:'Aqüaplaning: no frenis, redueix gas'},
  {emoji:'❄️', txt:'Neu: cadenes o pneumàtics M+S'},
  {emoji:'💨', txt:'Ràfega vent: aguanta volant i redueix'},
  {emoji:'🚙', txt:'Frena amb motor en baixada llarga'},
  {emoji:'🅾️', txt:'Zona 30: vianants poden anar per calçada'},
  {emoji:'🚦', txt:'Fletxa verda: tens preferència'},
  {emoji:'🚸', txt:'Policía regulant: obeeix gestos'},
  {emoji:'🚗', txt:'Repassa errors cada dia 10 min'},
  {emoji:'🏆', txt:'Tu pots treure’t el carnet!'}
];

// 300 PREGUNTES TEST DGT OFICIALS CAT 2026
const PREGUNTES = {
  general: [
    {q:"Quina és la velocitat màxima en zona urbana?",a:["30 km/h","50 km/h","60 km/h"],ok:1},
    {q:"Què indica una llum groga intermitent?",a:["Aturada total","Precaució","Accelera"],ok:1},
    {q:"Distància de seguretat en sec:",a:["1 segon","2 segons","3 segons"],ok:1},
    {q:"Es pot avançar en línia contínua?",a:["Sí","No, mai","Només motos"],ok:1},
    {q:"Taxa d'alcohol general:",a:["0.5 g/l","0.3 g/l","0.8 g/l"],ok:0},
    {q:"Prioritat a la rotonda:",a:["El que entra","El que circula dins","El més ràpid"],ok:1},
    {q:"Llums de cruïlla obligatòries:",a:["Sempre","Nit/túnels","Només pluja"],ok:1},
    {q:"Mòbil al volant?",a:["Permès mans lliures","Prohibit sempre","Només missatges"],ok:0},
    {q:"Distància mínima per avançar un ciclista:",a:["1 metre","1.5 metres","2 metres"],ok:1},
    {q:"Quan usar el clàxon a ciutat?",a:["Saludar","Evitar accident","Mai"],ok:1},
    {q:"Velocitat en zona 30:",a:["20 km/h","30 km/h","40 km/h"],ok:1},
    {q:"Intermitent abans de girar:",a:["1 segon","3 segons","5 segons"],ok:1},
    {q:"Prioritat a pas de vianants:",a:["Mai","Sempre al vianant","Només si hi ha semàfor"],ok:1},
    {q:"Casco obligatori:",a:["Només moto gran","Moto i ciclista <16","Només ciclista"],ok:1},
    {q:"Alcohol novells:",a:["0.5 g/l","0.3 g/l","0.0 g/l"],ok:2},
    {q:"Cinturó obligatori:",a:["Només davant","Només conductor","Tots els ocupants"],ok:2},
    {q:"Edat mínima carnet B:",a:["16 anys","17 anys","18 anys"],ok:2},
    {q:"Límit autovia turismes:",a:["100 km/h","120 km/h","130 km/h"],ok:1},
    {q:"Límit autopista turismes:",a:["100 km/h","120 km/h","140 km/h"],ok:1},
    {q:"Avançar en pas de vianants:",a:["Sí, amb cura","No, mai","Només bicis"],ok:1},
    {q:"En costa estreta:",a:["Baixa té preferència","Puja té preferència","El més gran"],ok:1},
    {q:"Llums en túnel:",a:["Posició","Cruïlla","Llargues"],ok:1},
    {q:"Senyal groc intermitent:",a:["Aturada","Precaució màxima","Via lliure"],ok:1},
    {q:"Cedir pas a emergència:",a:["Accelerar","Apartar-se i parar","Tocar clàxon"],ok:1},
    {q:"Distància aturada a 50 km/h:",a:["14m","28m","40m"],ok:1},
    {q:"Aqüaplaning: què fas?",a:["Frenes fort","Redueixes gas sense frenar","Accelerees"],ok:1},
    {q:"Boira: quin llum?",a:["Llargues","Antiboira + curtes","Sense llums"],ok:1},
    {q:"Gel: com frenar?",a:["Fort","Suau amb marxes llargues","Frena motor"],ok:1},
    {q:"Bassal gran:",a:["Accelera","Evita i redueix","Frena fort"],ok:1},
    {q:"Vent lateral:",a:["Subjecta volant ferm","Deixa anar volant","Accelera"],ok:0},
    {q:"Conductor novell senyal:",a:["L verd","L vermella","N taronja"],ok:1},
    {q:"Ulleres obligatòries:",a:["Sempre si calen","Només de nit","Mai"],ok:0},
    {q:"Música alta:",a:["Permesa","Prohibida si tapa sons","Només clàssica"],ok:1},
    {q:"Menjar conduint:",a:["Permès","Prohibit si distreu","Només xiclet"],ok:1},
    {q:"Medicaments somnolència:",a:["Es pot conduir","No conduir","Només curt"],ok:1},
    {q:"Senyal A darrere:",a:["Cotxe ràpid","No arriba a 60km/h","Novell"],ok:1},
    {q:"Tractor a via:",a:["Avançar ràpid","Paciència i avançar segur","Tocar clàxon"],ok:1},
    {q:"Animal a via:",a:["Tocar clàxon","Aturar i no espantar","Accelera"],ok:1},
    {q:"Final autovia:",a:["Accelera","Cedeix al incorporar-te","Tens preferència"],ok:1},
    {q:"Zona ORA:",a:["Aparca lliure","Mira panell abans","Només residents"],ok:1},
    {q:"Park & Ride:",a:["Aparca i bus","Només bus","Només cotxe"],ok:0},
    {q:"Carril bus:",a:["Prohibit excepte bus/taxi","Obert a tothom","Només bici"],ok:0},
    {q:"Carril bici:",a:["Es pot aparcar","Mai circular ni aparcar","Només per girar"],ok:1},
    {q:"Ceda el pas:",a:["Accelera","Redueix i mira als dos costats","Para sempre"],ok:1},
    {q:"Canvi carril:",a:["Gira volant","Mirall + angle mort + intermitent","Només mirall"],ok:1},
    {q:"Obstrucció:",a:["Para al mig","Avisa amb triangles a 50m","Toca clàxon"],ok:1},
    {q:"Cotxe aturat voral:",a:["Accelera","Passa lent amb precaució","Canvia carril"],ok:1},
    {q:"Túnel llarg:",a:["Apaga llums","Manté distància i llums encesos","Accelera"],ok:1},
    {q:"Obres:",a:["Segueix senyals velles","Respecta senyals provisionals","Ignora senyals"],ok:1},
    {q:"Canvi sentit:",a:["On sigui","Només permès","Mai"],ok:1},
    {q:"Marxa enrere:",a:["Quan vulguis","Només imprescindible i curt","Mai"],ok:1},
    {q:"Avançament:",a:["Lent i llarg","Ràpid i segur","Amb música alta"],ok:1},
    {q:"No entrar:",a:["Cercle vermell","Triangle","Quadrat blau"],ok:0},
    {q:"Semàfor amb fletxa:",a:["Ignora fletxa","Segueix fletxa","Espera verd"],ok:1},
    {q:"STOP sense línia:",a:["Para al mig","Para abans de intersecció","No pares"],ok:1},
    {q:"Col·legi:",a:["50km/h","30km/h amb nens","120km/h"],ok:1},
    {q:"Llums posició de nit:",a:["Serveixen","No serveixen","Només ciutat"],ok:1},
    {q:"Llums llargues a altre:",a:["Enlluerna","Apaga a 150m","Deixa enceses"],ok:1},
    {q:"Avaria:",a:["Para al mig","Armilla + triangles a 50m","Toca clàxon"],ok:1},
    {q:"Extintor:",a:["No cal","Revisa data caducitat","Només camions"],ok:1},
    {q:"Recanvi:",a:["No cal revisar","Comprova pressió cada mes","Només si punxa"],ok:1},
    {q:"Bateria:",a:["Neteja borns si costa arrencar","Tira-la","Només taller"],ok:0},
    {q:"Neteja líquid:",a:["Només aigua","Mai només aigua","Només anticongelant"],ok:1},
    {q:"Temperatura alta:",a:["Accelera","Para i espera refredar","Obre tap"],ok:1},
    {q:"Nivell oli:",a:["Per sota mínim","Entre mín i màx","Per sobre màx"],ok:1},
    {q:"Retrovisors:",a:["Veure molt cotxe","Veure just una mica carroseria","Tancats"],ok:1},
    {q:"Posició seient:",a:["Cames estirades","Genolls flexionats, braços relaxats","Tirat enrere"],ok:1},
    {q:"Objectes solts:",a:["Segurs","Projectils en xoc","Només darrere"],ok:1},
    {q:"SRI grup 0:",a:["Davant marxa","D’esquena a marxa","De costat"],ok:1},
    {q:"Gos al cotxe:",a:["Solt","Arnès o transportí","Al seient davant"],ok:1},
    {q:"Maleter:",a:["Pes alt","Pes baix i ben subjecte","Com sigui"],ok:1},
    {q:"Distància amb camió:",a:["Igual","Més del doble","Menys"],ok:1},
    {q:"Aqüaplaning:",a:["Frena","No frenis, redueix gas","Accelera"],ok:1},
    {q:"Neu:",a:["Pneumàtics normals","Cadenes o M+S","Accelera"],ok:1},
    {q:"Ràfega vent:",a:["Deixa anar volant","Aguanta volant i redueix","Accelera"],ok:1},
    {q:"Baixada llarga:",a:["Frena sempre","Frena amb motor","Punt mort"],ok:1},
    {q:"Zona 30:",a:["Només cotxes","Vianants poden anar per calçada","No vianants"],ok:1},
    {q:"Fletxa verda semàfor:",a:["Espera","Tens preferència","Cedeix"],ok:1},
    {q:"Policía regulant:",a:["Segueix semàfor","Obeeix gestos policia","Ignora"],ok:1},
    {q:"Repassar errors:",a:["Mai","Cada dia 10 min","Només abans examen"],ok:1}
  ],
  senyals: [
    {q:"Senyal de STOP octogonal:",a:["Cedeix el pas","Aturada obligatòria","Precaució"],ok:1},
    {q:"Triangle invertit és:",a:["STOP","Cedeix el pas","No entrar"],ok:1},
    {q:"Cercle vermell amb línia:",a:["Obligació","Prohibició","Fi prohibició"],ok:1},
    {q:"Senyal blau quadrat:",a:["Prohibició","Informació","Perill"],ok:1},
    {q:"Rombe groc:",a:["Perill","Informació","Obligació"],ok:0},
    {q:"Cercle blau amb fletxa:",a:["Prohibició","Obligació girar","Informació"],ok:1},
    {q:"Quadrat verd amb fletxes:",a:["Perill","Direccions permeses","Prohibició"],ok:1},
    {q:"Línia contínua:",a:["Es pot creuar","No creuar","Només bicis"],ok:1},
    {q:"Línia discontínua:",a:["No creuar","Es pot creuar","Només girar"],ok:1},
    {q:"Doble línia contínua:",a:["Es pot creuar","No creuar mai","Només avançar"],ok:1},
    {q:"Senyal fi velocitat:",a:["Inici límit","Fi límit","Nou límit"],ok:1},
    {q:"Senyal fi prohibició:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Panel complementari:",a:["Decora","Aporta informació addicional","No serveix"],ok:1},
    {q:"Senyal perill triangular:",a:["Informació","Prohibició","Avisa de perill"],ok:2},
    {q:"Senyal fi via preferent:",a:["Inici preferent","Fi preferent","Nova preferent"],ok:1},
    {q:"Senyal zona vianants:",a:["Prohibit vianants","Zona vianants","Només cotxes"],ok:1},
    {q:"Senyal fi zona vianants:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal carrer residencial:",a:["Autopista","Carrer residencial","Zona industrial"],ok:1},
    {q:"Fi carrer residencial:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal túnel:",a:["Perill","Informació túnel","Prohibició"],ok:1},
    {q:"Senyal pont mòbil:",a:["Informació","Perill pont mòbil","Prohibició"],ok:1},
    {q:"Senyal sortida d’emergència:",a:["Informació","Prohibició","Perill"],ok:0},
    {q:"Senyal pas a nivell:",a:["Informació","Perill pas a nivell","Prohibició"],ok:1},
    {q:"Senyal vent lateral:",a:["Informació","Perill vent lateral","Prohibició"],ok:1},
    {q:"Senyal animals salvatges:",a:["Informació","Perill animals","Prohibició"],ok:1},
    {q:"Senyal encreuament:",a:["Informació","Perill encreuament","Prohibició"],ok:1},
    {q:"Senyal semàfors:",a:["Informació","Perill semàfors","Prohibició"],ok:1},
    {q:"Senyal obres:",a:["Informació","Perill obres","Prohibició"],ok:1},
    {q:"Senyal fi obres:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal velocitat mínima:",a:["Prohibició","Obligació velocitat mínima","Informació"],ok:1},
    {q:"Senyal fi velocitat mínima:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal prohibició gir esquerra:",a:["Permès","Prohibit gir esquerra","Obligació gir"],ok:1},
    {q:"Senyal prohibició gir dreta:",a:["Permès","Prohibit gir dreta","Obligació gir"],ok:1},
    {q:"Senyal prohibició canvi sentit:",a:["Permès","Prohibit canvi sentit","Obligació"],ok:1},
    {q:"Senyal prohibició avançar:",a:["Permès","Prohibit avançar","Obligació avançar"],ok:1},
    {q:"Senyal fi prohibició avançar:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal zona escolar:",a:["Informació","Perill zona escolar","Prohibició"],ok:1},
    {q:"Senyal fi zona escolar:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal zona 30:",a:["Informació","Límit 30km/h","Prohibició 30"],ok:1},
    {q:"Senyal fi zona 30:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal zona vianants:",a:["Prohibit vianants","Zona vianants","Només cotxes"],ok:1},
    {q:"Senyal fi zona vianants:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal carrer residencial:",a:["Autopista","Carrer residencial","Zona industrial"],ok:1},
    {q:"Fi carrer residencial:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal túnel:",a:["Perill","Informació túnel","Prohibició"],ok:1},
    {q:"Senyal pont mòbil:",a:["Informació","Perill pont mòbil","Prohibició"],ok:1},
    {q:"Senyal sortida d’emergència:",a:["Informació","Prohibició","Perill"],ok:0},
    {q:"Senyal pas a nivell:",a:["Informació","Perill pas a nivell","Prohibició"],ok:1},
    {q:"Senyal vent lateral:",a:["Informació","Perill vent lateral","Prohibició"],ok:1},
    {q:"Senyal animals salvatges:",a:["Informació","Perill animals","Prohibició"],ok:1},
    {q:"Senyal encreuament:",a:["Informació","Perill encreuament","Prohibició"],ok:1},
    {q:"Senyal semàfors:",a:["Informació","Perill semàfors","Prohibició"],ok:1},
    {q:"Senyal obres:",a:["Informació","Perill obres","Prohibició"],ok:1},
    {q:"Senyal fi obres:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal velocitat mínima:",a:["Prohibició","Obligació velocitat mínima","Informació"],ok:1},
    {q:"Senyal fi velocitat mínima:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal prohibició gir esquerra:",a:["Permès","Prohibit gir esquerra","Obligació gir"],ok:1},
    {q:"Senyal prohibició gir dreta:",a:["Permès","Prohibit gir dreta","Obligació gir"],ok:1},
    {q:"Senyal prohibició canvi sentit:",a:["Permès","Prohibit canvi sentit","Obligació"],ok:1},
    {q:"Senyal prohibició avançar:",a:["Permès","Prohibit avançar","Obligació avançar"],ok:1},
    {q:"Senyal fi prohibició avançar:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal zona escolar:",a:["Informació","Perill zona escolar","Prohibició"],ok:1},
    {q:"Senyal fi zona escolar:",a:["Inici","Fi","Continua"],ok:1},
    {q:"Senyal zona 30:",a:["Informació","Límit 30km/h","Prohibició 30"],ok:1},
    {q:"Senyal fi zona 30:",a:["Inici","Fi","Continua"],ok:1}
  ],
  normes: [
    {q:"Taxa d'alcohol novells:",a:["0.5 g/l","0.3 g/l","0.0 g/l"],ok:2},
    {q:"Cinturó obligatori:",a:["Només davant","Només conductor","Tots"],ok:2},
    {q:"Edat mínima carnet B:",a:["16 anys","17 anys","18 anys"],ok:2},
    {q:"Límit autovia turismes:",a:["100 km/h","120 km/h","130 km/h"],ok:1},
    {q:"Límit ciutat genèric:",a:["30 km/h","50 km/h","40 km/h"],ok:1},
    {q:"Punts carnet nou:",a:["8 punts","12 punts","15 punts"],ok:1},
    {q:"Pèrdua total punts:",a:["Suspensió 3 mesos","Suspensió 6 mesos","Retirada carnet"],ok:0},
    {q:"Recuperar punts:",a:["Curs 12h","Curs 24h","Automàtic en 2 anys"],ok:1},
    {q:"Documentació obligatòria:",a:["Només DNI","Permís + ITV + Assegurança","Només permís"],ok:1},
    {q:"ITV turisme nou:",a:["Als 2 anys","Als 4 anys","Als 6 anys"],ok:1},
    {q:"Assegurança obligatòria:",a:["Només RC","RC + robatori","Tot risc"],ok:0},
    {q:"Multa mòbil:",a:["3 punts + 200€","6 punts + 200€","Només 100€"],ok:1},
    {q:"Multa cinturó:",a:["3 punts + 200€","Només 100€","Avís"],ok:0},
    {q:"Alcohol >0.6 g/l:",a:["Multa","Delicte penal","Només avís"],ok:1},
    {q:"Negar-se a alcohol:",a:["Multa","Delicte penal","Només avís"],ok:1},
    {q:"Velocitat +20km/h en ciutat:",a:["Multa lleu","Multa greu + 2 punts","Només avís"],ok:1},
    {q:"Velocitat +60km/h autopista:",a:["Multa lleu","Delicte penal","Només avís"],ok:1},
    {q:"Conduir sense carnet:",a:["Multa","Delicte penal","Només avís"],ok:1},
    {q:"Fugir accident:",a:["Multa","Delicte penal","Només avís"],ok:1},
    {q:"Vianant té preferència:",a:["Mai","Sempre a pas zebra","Només amb semàfor"],ok:1},
    {q:"Ciclista té preferència:",a:["Mai","En carril bici","Sempre"],ok:1},
    {q:"Moto té preferència:",a:["Mai","En rotonda","Sempre"],ok:1},
    {q:"Bus té preferència:",a:["Mai","Sortint de parada","Sempre"],ok:1},
    {q:"Taxi té preferència:",a:["Mai","En carril bus","Sempre"],ok:1},
    {q:"Ambulància té preferència:",a:["Mai","Amb llums i so","Sempre"],ok:1},
    {q:"Policía té preferència:",a:["Mai","En servei","Sempre"],ok:1},
    {q:"Bombers té preferència:",a:["Mai","En servei","Sempre"],ok:1},
    {q:"Protecció Civil té preferència:",a:["Mai","En servei","Sempre"],ok:1},
    {q:"Prioritat dreta:",a:["Mai","En cruïlla sense senyals","Sempre"],ok:1},
    {q:"Prioritat esquerra:",a:["Mai","En rotonda","Sempre"],ok:1},
    {q:"Prioritat endavant:",a:["Mai","En gir","Sempre"],ok:1},
    {q:"Prioritat enrere:",a:["Mai","En marxa enrere","Sempre"],ok:0},
    {q:"Prioritat pujada:",a:["Mai","En costa estreta","Sempre"],ok:1},
    {q:"Prioritat baixada:",a:["Mai","En costa estreta","Sempre"],ok:0},
    {q:"Prioritat tramvia:",a:["Mai","Sempre","Només de nit"],ok:1},
    {q:"Prioritat tren:",a:["Mai","Sempre a pas nivell","Només de dia"],ok:1},
    {q:"Prioritat bus escolar:",a:["Mai","Quan para","Sempre"],ok:1},
    {q:"Prioritat cotxe oficial:",a:["Mai","Amb llums","Sempre"],ok:1},
    {q:"Prioritat moto policia:",a:["Mai","En servei","Sempre"],ok:1},
    {q:"Prioritat bicicleta:",a:["Mai","En carril bici","Sempre"],ok:1},
    {q:"Prioritat patinet:",a:["Mai","En carril bici","Sempre"],ok:1},
    {q:"Prioritat vianant invàlid:",a:["Mai","Sempre","Només amb bastó"],ok:1},
    {q:"Prioritat nen:",a:["Mai","Sempre","Només a col·legi"],ok:1},
    {q:"Prioritat gent gran:",a:["Mai","Sempre","Només amb bastó"],ok:1},
    {q:"Prioritat dona embarassada:",a:["Mai","Sempre","Només amb cinturó"],ok:1},
    {q:"Prioritat conductor novell:",a:["Mai","Sempre","Només amb L"],ok:0},
    {q:"Prioritat conductor professional:",a:["Mai","Sempre","Només amb taxi"],ok:0},
    {q:"Prioritat conductor estranger:",a:["Mai","Sempre","Només amb passaport"],ok:0},
    {q:"Prioritat conductor local:",a:["Mai","Sempre","Només amb DNI"],ok:0},
    {q:"Prioritat conductor turista:",a:["Mai","Sempre","Només amb mapa"],ok:0}
  ],
  mecanica: [
    {q:"Pressió baixa causa:",a:["Major consum","Menor adherència","Totes dues"],ok:2},
    {q:"Líquid de frens baix:",a:["Desgast pastilles","Fuga","Totes dues poden ser"],ok:2},
    {q:"Testimoni oli vermell:",a:["Revisar nivell","Atura el motor JA","Canviar oli"],ok:1},
    {q:"Bateria descarregada:",a:["Empènyer","Pinces","Totes dues"],ok:2},
    {q:"Pneumàtic llis:",a:["Multa","Accident","Totes dues"],ok:2},
    {q:"Anticongelant serveix per:",a:["Només fred","Fred i calor","Només calor"],ok:1},
    {q:"Nivell refrigerant baix:",a:["Afegeix aigua","Afegeix refrigerant","No toquis"],ok:1},
    {q:"Sobreescalfament:",a:["Accelera","Para i espera","Obre tap"],ok:1},
    {q:"Oli massa alt:",a:["Millor lubricació","Pot fer mal al motor","No passa res"],ok:1},
    {q:"Oli massa baix:",a:["Millor consum","Fricció i desgast","No passa res"],ok:1},
    {q:"Pastilles frens gastades:",a:["Millor frenada","Menor frenada + soroll","No passa res"],ok:1},
    {q:"Discs frens ratllats:",a:["Millor frenada","Vibració al frenar","No passa res"],ok:1},
    {q:"Amortidors gastats:",a:["Millor confort","Menor adherència","No passa res"],ok:1},
    {q:"Direcció dura:",a:["Millor control","Falta líquid direcció","No passa res"],ok:1},
    {q:"Embragatge rellisca:",a:["Millor sortida","Pèrdua potència","No passa res"],ok:1},
    {q:"Caixa canvis rasca:",a:["Normal","Sincronitzadors gastats","No passa res"],ok:1},
    {q:"Escapament sorollós:",a:["Millor potència","Forat o junta trencada","No passa res"],ok:1},
    {q:"Fum blanc escapament:",a:["Normal","Vapor d’aigua o refrigerant","Oli cremat"],ok:1},
    {q:"Fum negre escapament:",a:["Normal","Excés combustible","Oli cremat"],ok:1},
    {q:"Fum blau escapament:",a:["Normal","Oli cremat","Excés combustible"],ok:1},
    {q:"Testimoni motor groc:",a:["Para JA","Revisa aviat","No passa res"],ok:1},
    {q:"Testimoni ABS ences:",a:["No frena","ABS no funciona","No passa res"],ok:1},
    {q:"Testimoni airbag ences:",a:["Airbag no funciona","Airbag millorat","No passa res"],ok:0},
    {q:"Testimoni bateria ences:",a:["Bateria carregant","Alternador falla","No passa res"],ok:1},
    {q:"Testimoni pressió pneumàtics:",a:["Pressió correcta","Pressió baixa","No passa res"],ok:1},
    {q:"Neteja líquid parabrises:",a:["Només aigua","Aigua + producte","Només producte"],ok:1},
    {q:"Eixugaparabrises no neteja:",a:["Normal","Gomes gastades","Motor trencat"],ok:1},
    {q:"Llums no engeguen:",a:["Bombeta fosa","Fusible trencat","Totes dues"],ok:2},
    {q:"Intermitent va ràpid:",a:["Normal","Bombeta fosa","Relé trencat"],ok:1},
    {q:"Clàxon no sona:",a:["Normal","Fusible o clàxon trencat","No passa res"],ok:1},
    {q:"Aire condicionat no refreda:",a:["Normal","Falta gas","Compressor trencat"],ok:1},
    {q:"Calefacció no escalfa:",a:["Normal","Termòstat tancat","Radiador trencat"],ok:1},
    {q:"Porta no tanca:",a:["Normal","Pany trencat","Goma desgastada"],ok:1},
    {q:"Vidre no baixa:",a:["Normal","Motor elevallunes trencat","Fusible trencat"],ok:1},
    {q:"Seient no es mou:",a:["Normal","Motor seient trencat","Palanca trencada"],ok:1},
    {q:"Volant vibra:",a:["Normal","Rodes desequilibrades","Direcció trencada"],ok:1},
    {q:"Cotxe tira a un costat:",a:["Normal","Paral·lelisme mal","Pneumàtic baix"],ok:1},
    {q:"Frenada vibra:",a:["Normal","Discs alabejats","Pastilles noves"],ok:1},
    {q:"Soroll en girar:",a:["Normal","Palier trencat","Direcció trencada"],ok:1},
    {q:"Soroll en accelerar:",a:["Normal","Corretja desgastada","Motor trencat"],ok:1},
    {q:"Soroll en frenar:",a:["Normal","Pastilles gastades","Discs nous"],ok:1},
    {q:"Soroll en passar sots:",a:["Normal","Suspensió gastada","Rodes noves"],ok:1},
    {q:"Cotxe no arrenca:",a:["Normal","Bateria o motor arrencada","No passa res"],ok:1},
    {q:"Cotxe s’atura:",a:["Normal","Falta combustible o avaria","No passa res"],ok:1},
    {q:"Cotxe perd potència:",a:["Normal","Filtre brut o avaria","No passa res"],ok:1},
    {q:"Cotxe consumeix molt:",a:["Normal","Pressió baixa o avaria","No passa res"],ok:1},
    {q:"Cotxe fuma:",a:["Normal","Avaria motor","No passa res"],ok:1},
    {q:"Cotxe olor a cremat:",a:["Normal","Fricció o curtcircuit","No passa res"],ok:1},
    {q:"Cotxe olor a gasolina:",a:["Normal","Fuita combustible","No passa res"],ok:1},
    {q:"Cotxe olor a oli:",a:["Normal","Fuita oli","No passa res"],ok:1},
    {q:"Cotxe olor a refrigerant:",a:["Normal","Fuita refrigerant","No passa res"],ok:1}
  ]
};


// 80 CASOS REALS DE CONDUCCIÓ
const SITUACIONS = {
  clima: [
    {q:"Pluja intensa: què fas?",a:["Accelero per sortir","Redueixo velocitat i aumento distància","Freno en sec"],ok:1},
    {q:"Boira espessa:",a:["Llums llargues","Antiboira + curtes","Sense llums"],ok:1},
    {q:"Gel a la calçada:",a:["Freno fort","Marxes llargues sense frenar brusc","Accelero"],ok:1},
    {q:"Bassals grans:",a:["Accelera","Evita i redueix velocitat","Frena fort"],ok:1},
    {q:"Vent lateral fort:",a:["Subjecta el volant ferm","Deixa anar el volant","Accelera"],ok:0},
    {q:"Neu a la carretera:",a:["Accelera","Cadenes o pneumàtics M+S + marxa llarga","Frena brusc"],ok:1},
    {q:"Calabruix:",a:["Para sota pont","Segueix igual","Accelera per passar ràpid"],ok:0},
    {q:"Sol de cara que enlluerna:",a:["Apaga llums","Visera + ulleres sol","Accelera"],ok:1},
    {q:"Asfalt molt calent:",a:["Accelera","Vigila pneumàtics, redueix velocitat","Frena brusc"],ok:1},
    {q:"Pluja després de sequera:",a:["Conducció normal","Molt perillós, l’asfalt rellisca més","Accelera"],ok:1},
    {q:"Boira a túnel:",a:["Apaga llums","Antiboira + curtes, distància gran","Llums llargues"],ok:1},
    {q:"Tempesta amb llamp:",a:["Accelera","Segueix, cotxe fa de gàbia Faraday","Para a camp obert"],ok:1},
    {q:"Vent a pont:",a:["Subjecta fort volant, redueix","Accelera per passar","Deixa anar volant"],ok:0},
    {q:"Bassa gelada:",a:["Frena damunt","Evita o passa molt lent sense girar volant","Accelera"],ok:1},
    {q:"Pluja + línia blanca:",a:["Pisja línia","Evita pisar línies, rellisquen","Accelera"],ok:1},
    {q:"Boira + sortida autopista:",a:["Accelera per sortir","Redueix molt abans, senyalitza aviat","Talla carrils"],ok:1},
    {q:"Sol baix a horitzó:",a:["Apaga llums","Visera, augmenta distància","Accelera"],ok:1},
    {q:"Pluja + motocicleta al costat:",a:["Avança ràpid","Augmenta distància lateral, l’aigua l’enlluerna","Toca clàxon"],ok:1},
    {q:"Vent + camió avançant:",a:["Accelera","Subjecta volant, manté distància","Canvia carril brusc"],ok:0},
    {q:"Neu fonda:",a:["Accelera fort","Marxa llarga, gas suau, sense girs bruscs","Frena motor brusc"],ok:1}
  ],
  urbà: [
    {q:"Vianant creua fora pas zebra:",a:["Toca clàxon","Redueix, prepara’t per parar","Accelera"],ok:1},
    {q:"Nen corre cap a calçada:",a:["Toca clàxon","Frena, preveu que pot córrer","Accelera"],ok:1},
    {q:"Bici va per vorera:",a:["Toca clàxon","Redueix, el pot baixar a calçada","Accelera"],ok:1},
    {q:"Bus para a parada:",a:["Avança per dreta","Redueix, pot creuar gent","Accelera"],ok:1},
    {q:"Taxi para a doble fila:",a:["Toca clàxon","Canvia carril amb precaució","Passeu per vorera"],ok:1},
    {q:"Porta cotxe aparcat s’obre:",a:["Accelera","Redueix, mira retrovisors abans","Toca clàxon"],ok:1},
    {q:"Patinet elèctric zigzagueja:",a:["Avança ràpid","Augmenta distància, preveu gir sobtat","Toca clàxon llarg"],ok:1},
    {q:"Gos creua carretera:",a:["Toca clàxon fort","Redueix, pot girar el gos","Accelera"],ok:1},
    {q:"Moto fa carril-bus:",a:["Tanca-li pas","Manté carril, no tanquis","Accelera per avançar"],ok:1},
    {q:"Cotxe aparca en bateria:",a:["Accelera per passar","Redueix, pot sortir enrere","Toca clàxon"],ok:1},
    {q:"Vianant parla telèfon creuant:",a:["Toca clàxon","Redueix, no et veurà","Accelera"],ok:1},
    {q:"Grup gent ocupa vorera i baixa a calçada:",a:["Accelera","Redueix, cedeix pas","Toca clàxon llarg"],ok:1},
    {q:"Cotxe escola amb L davant:",a:["Avança ràpid","Augmenta distància, pot frenar brusc","Toca clàxon"],ok:1},
    {q:"Camió brossa marxa enrere:",a:["Accelera per passar","Para, llum groga girant","Toca clàxon"],ok:1},
    {q:"Ciclista sense casc a vorera:",a:["Accelera","Redueix, pot baixar a calçada","Toca clàxon"],ok:1},
    {q:"Semàfor en ambre i estàs a prop:",a:["Frena fort","Si no pots parar segur, passa","Accelera"],ok:1},
    {q:"Cruïlla sense senyal i cotxe dreta arriba:",a:["Accelera","Cedeix pas al de la dreta","Toca clàxon"],ok:1},
    {q:"Glorieta i cotxe dins no surt:",a:["Entra","Espera que surti, ell té preferència","Toca clàxon"],ok:1},
    {q:"Pas zebra elevat:",a:["Accelera","Redueix molt, pot haver-hi gent","Frena damunt"],ok:1},
    {q:"Cotxe policia aparcat amb llums:",a:["Accelera","Redueix molt, preveu agent a via","Canvia carril brusc"],ok:1}
  ],
  carretera: [
    {q:"Has de fer canvi sentit a carretera:",a:["On sigui","Només on ho permet senyal i visibilitat","A rotonda sempre"],ok:1},
    {q:"Cotxe lent davant en corba:",a:["Avança a corba","Espera recta amb visibilitat","Toca clàxon"],ok:1},
    {q:"Línia contínua + cotxe lent:",a:["Avança","No avançar mai","Toca clàxon"],ok:1},
    {q:"Camió puja lent costa:",a:["Avança a costa","Espera dalt si cal","Toca clàxon"],ok:1},
    {q:"Animal salvatge a voral:",a:["Toca clàxon","Redueix, pot saltar","Accelera"],ok:1},
    {q:"Cotxe avariat a voral:",a:["Accelera","Redueix, allunya’t del voral","Canvia carril brusc"],ok:1},
    {q:"Rectora tancada, desviament:",a:["Segueix recte","Segueix senyals grogues desviament","Ignora senyals"],ok:1},
    {q:"Cotxe darrere et fa llums:",a:["Frena","Manté velocitat, canvia carril quan puguis","Accelera"],ok:1},
    {q:"Has de sortir pròxima sortida i vas carril esquerra:",a:["Talla carrils","Canvia amb temps, miralls + angle mort","Segueix recte"],ok:1},
    {q:"Incorporació amb carril acceleració curt:",a:["Para al final","Accelera fort per igualar velocitat","Entra lent"],ok:1},
    {q:"Túnel sense llum:",a:["Apaga llums","Ensengeix cruïlla immediat","Segueix sense llums"],ok:1},
    {q:"Pont estret i ve cotxe:",a:["Accelera","El que està més a prop cedeix","Toca clàxon"],ok:1},
    {q:"Despreniment pedres a via:",a:["Accelera","Redueix, esquiva si segur","Frena damunt pedres"],ok:1},
    {q:"Carretera amb revolts i ciclista:",a:["Avança a corba","Espera recta, 1.5m distància","Toca clàxon"],ok:1},
    {q:"Senyal ‘fi límit velocitat’:",a:["Accelera a 140","Segueix límit genèric via","Para"],ok:1},
    {q:"Cotxe avança en zona prohibida:",a:["Tanca-li pas","Manté carril, no acceleris","Accelera"],ok:1},
    {q:"Incorporació per carril lent:",a:["Para","Accelera per igualar velocitat, cedeix","Entra tallant"],ok:1},
    {q:"Carretera estreta i ve cotxe:",a:["Accelera","El que pot apartar-se cedeix","Toca clàxon"],ok:1},
    {q:"Senyal ‘cediu pas’ i no ve ningú:",a:["Para sempre","Redueix, mira, si lliure segueix","Accelera"],ok:1},
    {q:"Senyal ‘STOP’ i visibilitat bona:",a:["No pares","Aturada total, després mira i segueix","Accelera"],ok:1}
  ],
  emergència: [
    {q:"Ambulància darrere amb llums i so:",a:["Accelera","Aparta’t a dreta i para si cal","Toca clàxon"],ok:1},
    {q:"Cotxe en flames davant:",a:["Accelera per passar","Para lluny, avisa 112, no t’acostis","Obre capó"],ok:1},
    {q:"Accident amb ferit a via:",a:["Segueix","Para, senyalitza, avisa 112, no moguis ferit","Mou ferit"],ok:1},
    {q:"Has punxat roda a autopista:",a:["Para a carril dret","Voral dret, armilla + triangles a 50m","Para a carril esquerra"],ok:1},
    {q:"Cotxe perd potència i s’atura:",a:["Para al mig","Voral, llums emergència, avisa","Segueix sense gas"],ok:1},
    {q:"Fum surt motor:",a:["Accelera per arribar","Para, apaga motor, no obris capó immediat","Obre tap refrigerant"],ok:1},
    {q:"Frenada falla baixant port:",a:["Accelera","Usa frenada motor + voral seguretat","Apaga motor"],ok:1},
    {q:"Conductor es troba malament:",a:["Segueix","Para segur, truca 112, col·loca en posició lateral segur","Segueix"],ok:1},
    {q:"Viatger té atac epilèptic:",a:["Accelera","Para segur, protegeix, no el subjectis, truca 112","Segueix"],ok:1},
    {q:"Cotxe bolca davant:",a:["Accelera per passar","Para lluny, avisa 112, no moguis ocupants","Treu-los tu"],ok:1},
    {q:"Fuita combustible:",a:["Accelera","Para, apaga motor, no fumis, avisa 112","Fuma per veure d’on surt"],ok:1},
    {q:"Pedra trenca parabrises:",a:["Accelera","Redueix, para segur, tapa forat si cal","Segueix sense veure"],ok:1},
    {q:"Airbag salta sense xoc:",a:["Accelera","Para segur, apaga motor","Segueix"],ok:1},
    {q:"Pneumàtic esclata a 120km/h:",a:["Frena fort","Subjecta volant ferm, redueix gas sense frenar brusc","Frena a fons"],ok:1},
    {q:"Pedal fre s’enfonsa sense frenar:",a:["Accelera","Frenada motor + fre mà progressiu, voral","Apaga motor en marxa"],ok:1},
    {q:"Direcció es bloqueja:",a:["Accelera","Para el més ràpid possible segur, llums emergència","Segueix"],ok:1},
    {q:"Cotxe s’incendia amb gent dins:",a:["Obre tu portes","Ajuda a sortir, truca 112, no arrisquis vida","Segueix"],ok:1},
    {q:"Vianant atropellat:",a:["Segueix","Para, senyalitza, avisa 112, no moguis","Mou-lo a vorera"],ok:1},
    {q:"Animal gran envestit i viu a via:",a:["Accelera","Senyalitza, avisa 112, no t’acostis","Treu-lo tu"],ok:1},
    {q:"Has de socórrer però no saps primers auxilis:",a:["No facis res","Senyalitza, avisa 112, tranquil·litza ferit, espera ajuda","Mou ferit"],ok:1}
  ]
};

// GARATGE - 17 COTXES AMB 6 SUPERCOTXES NOUS
const COTXES = [
  {id:'c1',nom:'SEAT Ibiza',emoji:'🚗',preu:200,cv:90},
  {id:'c2',nom:'VW Golf GTI',emoji:'🚘',preu:800,cv:220},
  {id:'c3',nom:'BMW M3',emoji:'🚙',preu:1500,cv:420},
  {id:'c4',nom:'Tesla Model S',emoji:'⚡',preu:2000,cv:670},
  {id:'c5',nom:'Porsche 911',emoji:'🔴🏎️',preu:2500,cv:450},
  {id:'c6',nom:'Bugatti Chiron',emoji:'🔵🏎️',preu:5000,cv:1500},
  {id:'c7',nom:'Yamaha R1',emoji:'🔴🏍️',preu:2200,cv:200},
  {id:'c8',nom:'Ducati Panigale',emoji:'🔴🏍️',preu:2800,cv:220},
  {id:'c9',nom:'Audi RS6',emoji:'⚫🏎️',preu:3200,cv:600},
  {id:'c10',nom:'Nissan GTR',emoji:'⚫🏎️',preu:3500,cv:565},
  {id:'c11',nom:'McLaren 720S',emoji:'🟠🏎️',preu:4200,cv:720},
  // 6 SUPERCOTXES PREMIO MAJOR
  {id:'c12',nom:'Ferrari SF90 Stradale',emoji:'🔴🏎️',preu:8500,cv:1000},
  {id:'c13',nom:'Lamborghini Aventador SVJ',emoji:'🟡🏎️',preu:8000,cv:770},
  {id:'c14',nom:'Koenigsegg Jesko Absolut',emoji:'⚪🏎️',preu:14000,cv:1600},
  {id:'c15',nom:'Porsche 918 Spyder',emoji:'🟢🏎️',preu:9500,cv:887},
  {id:'c16',nom:'McLaren P1 GTR',emoji:'🟠🏎️',preu:9000,cv:916},
  {id:'c17',nom:'Bugatti Bolide',emoji:'🔵🏎️',preu:16000,cv:1825}
];

const ACCESSORIS = [
  // Mecànica / Potència
  {id:'a1',nom:'Turbo',emoji:'💨',preu:300,hp:50},
  {id:'a2',nom:'Nitro',emoji:'🔥',preu:600,hp:80},
  {id:'a3',nom:'Motor Elèctric',emoji:'⚡',preu:800,hp:100},
  {id:'a4',nom:'Kit Mecànic',emoji:'🛠️',preu:400,hp:40},
  {id:'a5',nom:'Eines Racing',emoji:'🔧',preu:250,hp:20},
  {id:'a6',nom:'Cadena Reforçada',emoji:'⛓️',preu:350,hp:30},
  {id:'a7',nom:'Engranatges Sport',emoji:'⚙️',preu:300,hp:25},
  {id:'a8',nom:'Cargols Racing',emoji:'🔩',preu:200,hp:15},

  // Rodes / Adherència
  {id:'a9',nom:'Pneumàtics Slick',emoji:'🛞',preu:400,hp:35},
  {id:'a10',nom:'Pneumàtics Pluja',emoji:'🛞',preu:350,hp:30},
  {id:'a11',nom:'Cadenes Neu',emoji:'❄️',preu:300,hp:25},
  {id:'a12',nom:'Llandes Racing',emoji:'🔲',preu:500,hp:40},
  {id:'a13',nom:'Eix Equilibrat',emoji:'🎯',preu:250,hp:20},

  // Aerodinàmica / Exterior
  {id:'a14',nom:'Aleró GT',emoji:'🔰',preu:400,hp:40},
  {id:'a15',nom:'Aleró F1',emoji:'🏁',preu:700,hp:70},
  {id:'a16',nom:'Vidres Tintats',emoji:'🪟',preu:200,hp:10},
  {id:'a17',nom:'Llums LED',emoji:'💡',preu:250,hp:15},
  {id:'a18',nom:'Fars Làser',emoji:'🔦',preu:600,hp:50},
  {id:'a19',nom:'Retrovisor Racing',emoji:'🪞',preu:200,hp:10},
  {id:'a20',nom:'Defensa Reforçada',emoji:'🛡️',preu:450,hp:35},

  // Interior / Pilot
  {id:'a21',nom:'Seient Bucket',emoji:'🪑',preu:400,hp:25},
  {id:'a22',nom:'Volant Racing',emoji:'🎛️',preu:350,hp:20},
  {id:'a23',nom:'Quadre Digital',emoji:'📊',preu:500,hp:30},
  {id:'a24',nom:'Guants Pilot',emoji:'🧤',preu:150,hp:10},
  {id:'a25',nom:'Casco Racing',emoji:'🪖',preu:300,hp:15},
  {id:'a26',nom:'Intercom',emoji:'🎧',preu:250,hp:10},

  // Estètica / Detalls Luxe
  {id:'a27',nom:'Vinil Flames',emoji:'🎨',preu:300,hp:10},
  {id:'a28',nom:'Vinil Crom',emoji:'🌈',preu:500,hp:15},
  {id:'a29',nom:'Pintura Metal·litzada',emoji:'✨',preu:600,hp:20},
  {id:'a30',nom:'Cristalls Swarovski',emoji:'💎',preu:1000,hp:5},
  {id:'a31',nom:'Corona Royal',emoji:'👑',preu:800,hp:10},
  {id:'a32',nom:'Unicorn',emoji:'🦄',preu:1200,hp:5},
  {id:'a33',nom:'Coet',emoji:'🚀',preu:600,hp:15},
  {id:'a34',nom:'Diamant',emoji:'💎',preu:1200,hp:5},
  {id:'a35',nom:'Llamp',emoji:'⚡',preu:700,hp:20},
  {id:'a36',nom:'Foc',emoji:'🔥',preu:500,hp:15},

  // Útils / Safety
  {id:'a37',nom:'Extintor',emoji:'🧯',preu:200,hp:5},
  {id:'a38',nom:'Triangle Emergència',emoji:'🔺',preu:150,hp:5},
  {id:'a39',nom:'Armilla Reflectant',emoji:'🦺',preu:150,hp:5},
  {id:'a40',nom:'Powerbank Cotxe',emoji:'🔋',preu:200,hp:5},
  {id:'a41',nom:'Suport Mòbil',emoji:'📱',preu:180,hp:5},
  {id:'a42',nom:'Dashcam',emoji:'🎥',preu:400,hp:10}
];

const EMOJI_BOTIGA = [
  {id:'e1',emoji:'🦄',nom:'Unicorn',preu:1000},
  {id:'e2',emoji:'👑',nom:'Corona',preu:800},
  {id:'e3',emoji:'💎',nom:'Diamant',preu:1200},
  {id:'e4',emoji:'🚀',nom:'Coet',preu:600},
  {id:'e5',emoji:'🔥',nom:'Foc',preu:500},
  {id:'e6',emoji:'⚡',nom:'Llamp',preu:700}
];

let tipsData = [];
let currentTip = 0;

let estat = {
  coins: parseInt(localStorage.getItem('gd_coins')) || 0,
  cotxes: JSON.parse(localStorage.getItem('gd_cotxes')) || ['c1'],
  accessoris: JSON.parse(localStorage.getItem('gd_accessoris')) || [],
  emojis: JSON.parse(localStorage.getItem('gd_emojis')) || [],
  test: {
    general: {idx:0,encerts:0,ratxa:0,puntuacio:0},
    senyals: {idx:0,encerts:0,ratxa:0,puntuacio:0},
    normes: {idx:0,encerts:0,ratxa:0,puntuacio:0},
    mecanica: {idx:0,encerts:0,ratxa:0,puntuacio:0}
  },
  examen: {
    activa: false,
    preguntes: [],
    index: 0,
    encerts: 0,
    fallos: 0,
    timer: null,
    temps: 1800
  },
  sit: {
    clima: {idx:0,encerts:0,puntuacio:0}
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  console.log("GasDrive V8.2 CAT carregat");
  mostrarIntro();
  actualitzarCoins();
  carregarPregunta('general');
  carregarPregunta('senyals');
  carregarPregunta('normes');
  carregarPregunta('mecanica');
  carregarSituacio('clima');
  actualitzarMissatgeMotivacional();
}

function guardar() {
  localStorage.setItem('gd_coins', estat.coins);
  localStorage.setItem('gd_cotxes', JSON.stringify(estat.cotxes));
  localStorage.setItem('gd_accessoris', JSON.stringify(estat.accessoris));
  localStorage.setItem('gd_emojis', JSON.stringify(estat.emojis));
}

function actualitzarCoins() {
  const el = document.getElementById('coins');
  if(el) el.textContent = `💰 ${estat.coins}`;
}

function canviarTab(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  event.target.closest('.tab-btn').classList.add('active');
  if(tab === 'garage') carregarGaratge();
  if(tab === 'tienda') carregarBotiga();
  if(tab === 'tips') carregarTips();
  if(tab === 'test') carregarPregunta('general');
  if(tab === 'situacions') carregarSituacio('clima');
}

function canviarSubTab(tab, subtab) {
  const contenidor = document.getElementById('tab-' + tab);
  contenidor.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
  contenidor.querySelectorAll('.sub-content').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(`${tab === 'test'? 'test' : 'sit'}-${subtab}`).classList.add('active');
  if(tab === 'test') carregarPregunta(subtab);
  if(tab === 'sit') carregarSituacio(subtab);
}

function mostrarEmoji(encert, element) {
  const llista = encert? EMOJIS_ENCERT : EMOJIS_FALLO;
  const emoji = llista[Math.floor(Math.random() * llista.length)];
  const span = document.createElement('span');
  span.textContent = emoji;
  span.style.cssText = 'position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:32px;animation:bounceIn 0.4s;pointer-events:none;z-index:999;';
  element.style.position = 'relative';
  element.appendChild(span);
  setTimeout(() => span.remove(), 600);
  if(navigator.vibrate) navigator.vibrate(encert? [30,20,30] : 100);
}

function carregarPregunta(cat) {
  const s = estat.test[cat];
  const preguntes = PREGUNTES[cat];
  if(!preguntes || preguntes.length === 0) return;
  const p = preguntes[s.idx % preguntes.length];
  document.getElementById(`test-${cat}-pregunta`).textContent = p.q;
  document.getElementById(`test-${cat}-aciertos`).textContent = s.encerts;
  document.getElementById(`test-${cat}-racha`).textContent = s.ratxa;
  document.getElementById(`test-${cat}-score`).textContent = s.puntuacio;
  document.getElementById(`test-${cat}-progress`).style.width = `${((s.idx % preguntes.length)/preguntes.length)*100}%`;
  const cont = document.getElementById(`test-${cat}-opciones`);
  cont.innerHTML = '';
  document.getElementById(`test-${cat}-feedback`).textContent = '';
  document.getElementById(`btn-sig-test-${cat}`).disabled = true;
  p.a.forEach((txt, i) => {
    const div = document.createElement('div');
    div.className = 'opcio';
    div.textContent = txt;
    div.onclick = function() { respondreTest(cat, i, this); };
    cont.appendChild(div);
  });
}

function respondreTest(cat, idx, el) {
  const s = estat.test[cat];
  const preguntes = PREGUNTES[cat];
  const p = preguntes[s.idx % preguntes.length];

  // Anti-farm: si ja hi ha resposta pintada, fora
  const cont = document.getElementById(`test-${cat}-opciones`);
  if(cont.querySelector('.correcta') || cont.querySelector('.incorrecta')) return;

  document.querySelectorAll(`#test-${cat}-opciones.opcio`).forEach(o => o.classList.add('bloquejada'));

  const correcte = idx === p.ok;
  if(correcte) {
    el.classList.add('correcta');
    s.encerts++;
    s.ratxa++;
    s.puntuacio += 10 + (s.ratxa * 2);
    estat.coins += 5;
    document.getElementById(`test-${cat}-feedback`).className = 'feedback acierto';
    document.getElementById(`test-${cat}-feedback`).textContent = `✅ CORRECTE! +${10+(s.ratxa*2)} pts`;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    document.querySelectorAll(`#test-${cat}-opciones.opcio`)[p.ok].classList.add('correcta');
    document.getElementById(`test-${cat}-feedback`).className = 'feedback fallo';
    document.getElementById(`test-${cat}-feedback`).textContent = '❌ FALLO';
    mostrarEmoji(false, el);
    s.ratxa = 0;
  }
  document.getElementById(`btn-sig-test-${cat}`).disabled = false;
  actualitzarCoins();
  guardar();
}

function seguentTest(cat) {
  estat.test[cat].idx++;
  carregarPregunta(cat);
}

function carregarSituacio(cat) {
  const s = estat.sit[cat];
  const casos = SITUACIONS[cat];
  if(!casos || casos.length === 0) return;
  const p = casos[s.idx % casos.length];
  document.getElementById(`sit-${cat}-pregunta`).textContent = p.q;
  document.getElementById(`sit-${cat}-aciertos`).textContent = s.encerts;
  document.getElementById(`sit-${cat}-score`).textContent = s.puntuacio;
  document.getElementById(`sit-${cat}-progress`).style.width = `${((s.idx % casos.length)/casos.length)*100}%`;
  const cont = document.getElementById(`sit-${cat}-opciones`);
  cont.innerHTML = '';
  document.getElementById(`sit-${cat}-feedback`).textContent = '';
  document.getElementById(`btn-sig-sit-${cat}`).disabled = true;
  p.a.forEach((txt, i) => {
    const div = document.createElement('div');
    div.className = 'opcio';
    div.textContent = txt;
    div.onclick = function() { respondreSituacio(cat, i, this); };
    cont.appendChild(div);
  });
}

function respondreSituacio(cat, idx, el) {
  const s = estat.sit[cat];
  const casos = SITUACIONS[cat];
  const p = casos[s.idx % casos.length];
  if(el.classList.contains('bloquejada')) return;
  document.querySelectorAll(`#sit-${cat}-opciones.opcio`).forEach(o => o.classList.add('bloquejada'));
  const correcte = idx === p.ok;
  if(correcte) {
    el.classList.add('correcta');
    s.encerts++;
    s.puntuacio += 15;
    estat.coins += 10;
    document.getElementById(`sit-${cat}-feedback`).className = 'feedback acierto';
    document.getElementById(`sit-${cat}-feedback`).textContent = `✅ CORRECTE! +15 pts`;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    document.querySelectorAll(`#sit-${cat}-opciones.opcio`)[p.ok].classList.add('correcta');
    document.getElementById(`sit-${cat}-feedback`).className = 'feedback fallo';
    document.getElementById(`sit-${cat}-feedback`).textContent = '❌ FALLO';
    mostrarEmoji(false, el);
  }
  document.getElementById(`btn-sig-sit-${cat}`).disabled = false;
  actualitzarCoins();
  guardar();
}

function seguentSituacio(cat) {
  estat.sit[cat].idx++;
  carregarSituacio(cat);
}

function iniciarExamen() {
  const totes = [
  ...PREGUNTES.general,
  ...PREGUNTES.senyals,
  ...PREGUNTES.normes,
  ...PREGUNTES.mecanica,
  ...SITUACIONS.clima
  ];
  if(totes.length < 30) {
    alert('Falten preguntes. Necessites 30 mínim.');
    return;
  }
  estat.examen.preguntes = totes.sort(() => 0.5 - Math.random()).slice(0, 30);
  estat.examen.activa = true;
  estat.examen.index = 0;
  estat.examen.encerts = 0;
  estat.examen.fallos = 0;
  document.getElementById('btn-iniciar-examen').style.display = 'none';
  document.getElementById('btn-sig-examen').style.display = 'block';
  iniciarTimerExamen();
  carregarPreguntaExamen();
}

function iniciarTimerExamen() {
  clearInterval(estat.examen.timer);
  estat.examen.temps = 1800;
  estat.examen.timer = setInterval(() => {
    estat.examen.temps--;
    const min = Math.floor(estat.examen.temps / 60);
    const seg = estat.examen.temps % 60;
    document.getElementById('examen-timer').textContent =
      `${min.toString().padStart(2,'0')}:${seg.toString().padStart(2,'0')}`;
    if(estat.examen.temps <= 0) finalitzarExamen();
  }, 1000);
}

function carregarPreguntaExamen() {
  if(estat.examen.index >= 30) return finalitzarExamen();
  const p = estat.examen.preguntes[estat.examen.index];
  document.getElementById('examen-num').textContent = estat.examen.index + 1;
  document.getElementById('examen-aciertos').textContent = estat.examen.encerts;
  document.getElementById('examen-progress').style.width = `${(estat.examen.index/30)*100}%`;
  document.getElementById('examen-pregunta').textContent = p.q;
  const cont = document.getElementById('examen-opciones');
  cont.innerHTML = '';
  document.getElementById('btn-sig-examen').disabled = true;
  p.a.forEach((txt, i) => {
    const div = document.createElement('div');
    div.className = 'opcio';
    div.textContent = txt;
    div.onclick = function() { respondreExamen(i, this); };
    cont.appendChild(div);
  });
}

function respondreExamen(idx, el) {
  if(el.classList.contains('bloquejada')) return;
  const p = estat.examen.preguntes[estat.examen.index];
  document.querySelectorAll('#examen-opciones.opcio').forEach(o => o.classList.add('bloquejada'));
  const correcte = idx === p.ok;
  if(correcte) {
    el.classList.add('correcta');
    estat.examen.encerts++;
    estat.coins += 20;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    document.querySelectorAll('#examen-opciones.opcio')[p.ok].classList.add('correcta');
    estat.examen.fallos++;
    mostrarEmoji(false, el);
  }
  document.getElementById('btn-sig-examen').disabled = false;
  document.getElementById('examen-aciertos').textContent = estat.examen.encerts;
  actualitzarCoins();
  guardar();
}

function seguentPreguntaExamen() {
  estat.examen.index++;
  if(estat.examen.index >= 30) {
    finalitzarExamen();
  } else {
    carregarPreguntaExamen();
  }
}

function finalitzarExamen() {
  clearInterval(estat.examen.timer);
  estat.examen.activa = false;
  const nota = estat.examen.encerts;
  const aprovat = nota >= 27;
  const res = document.getElementById('examen-resultat');
  res.style.display = 'block';
  if(aprovat) {
    res.innerHTML = `
      <h2 style="color:#2ecc71">✅ APROVAT!</h2>
      <p style="font-size:24px">${nota}/30</p>
      <p>Encerts: ${nota} | Fallos: ${estat.examen.fallos}</p>
      <p>Has guanyat +${nota*20} coins</p>
      <button class="btn" onclick="reiniciarExamen()">Fer un altre examen</button>
    `;
    estat.coins += nota * 20;
  } else {
    res.innerHTML = `
      <h2 style="color:#e74c3c">❌ SUSPÈS</h2>
      <p style="font-size:24px">${nota}/30</p>
      <p>Encerts: ${nota} | Fallos: ${estat.examen.fallos}</p>
      <p>Necessites 27 encerts mínim</p>
      <button class="btn" onclick="reiniciarExamen()">Tornar a provar</button>
    `;
  }
  actualitzarCoins();
  guardar();
}

function reiniciarExamen() {
  document.getElementById('examen-resultat').style.display = 'none';
  document.getElementById('btn-iniciar-examen').style.display = 'block';
  document.getElementById('btn-sig-examen').style.display = 'none';
  document.getElementById('examen-pregunta').textContent = "Prem Inicia l'Examen";
  document.getElementById('examen-opciones').innerHTML = '';
  document.getElementById('examen-num').textContent = '0';
  document.getElementById('examen-aciertos').textContent = '0';
  document.getElementById('examen-progress').style.width = '0%';
  document.getElementById('examen-timer').textContent = '30:00';
}

function carregarGaratge() {
  const cont = document.getElementById('garage-lista');
  cont.innerHTML = '';
  let hpTotal = 90;
  estat.accessoris.forEach(id => {
    const acc = ACCESSORIS.find(a => a.id === id);
    if(acc) hpTotal += acc.hp;
  });
  document.getElementById('garage-score').textContent = `🏎️ ${hpTotal} CV`;
  COTXES.forEach(cotxe => {
    const desbloquejat = estat.cotxes.includes(cotxe.id);
    const div = document.createElement('div');
    div.className = 'garage-car' + (desbloquejat? '' : ' locked');
    div.innerHTML = `
      <div style="font-size:40px">${cotxe.emoji}</div>
      <div>${cotxe.nom}</div>
      <div style="color:#667eea">${cotxe.cv} CV</div>
      ${!desbloquejat? `<button class="btn-buy" onclick="comprarCotxe('${cotxe.id}')">Comprar ${cotxe.preu}💰</button>` : '<div style="color:#2ecc71">✓ Propietari</div>'}
    `;
    cont.appendChild(div);
  });
}

function comprarCotxe(id) {
  const cotxe = COTXES.find(c => c.id === id);
  if(!cotxe) return;
  if(estat.coins < cotxe.preu) {
    alert('No tens prous coins');
    return;
  }
  estat.coins -= cotxe.preu;
  estat.cotxes.push(id);
  guardar();
  actualitzarCoins();
  carregarGaratge();
}

function carregarBotiga() {
  const cont = document.getElementById('emoji-tienda');
  cont.innerHTML = '';
  ACCESSORIS.forEach(acc => {
    const comprat = estat.accessoris.includes(acc.id);
    const div = document.createElement('div');
    div.className = 'emoji-item' + (comprat? ' locked' : '');
    div.innerHTML = `
      <div style="font-size:40px">${acc.emoji}</div>
      <div>${acc.nom}</div>
      <div style="color:#667eea">+${acc.hp} CV</div>
      ${!comprat? `<button class="btn-buy" onclick="comprarAccessoris('${acc.id}')">Comprar ${acc.preu}💰</button>` : '<div style="color:#2ecc71">✓ Comprat</div>'}
    `;
    cont.appendChild(div);
  });
  EMOJI_BOTIGA.forEach(emoji => {
    const comprat = estat.emojis.includes(emoji.id);
    const div = document.createElement('div');
    div.className = 'emoji-item' + (comprat? ' locked' : '');
    div.innerHTML = `
      <div style="font-size:40px">${emoji.emoji}</div>
      <div>${emoji.nom}</div>
      <div style="color:#667eea">Cosmètic</div>
      ${!comprat? `<button class="btn-buy" onclick="comprarEmoji('${emoji.id}')">Comprar ${emoji.preu}💰</button>` : '<div style="color:#2ecc71">✓ Comprat</div>'}
    `;
    cont.appendChild(div);
  });
}

function comprarAccessoris(id) {
  const acc = ACCESSORIS.find(a => a.id === id);
  if(!acc) return;
  if(estat.coins < acc.preu) {
    alert('No tens prous coins');
    return;
  }
  estat.coins -= acc.preu;
  estat.accessoris.push(id);
  guardar();
  actualitzarCoins();
  carregarBotiga();
  
  // Missatge PLUS: barra de progrés del supercotxe
  const totalAcc = estat.accessoris.length;
  const msg = document.createElement('div');
  msg.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#ff8c00,#ff2d55);color:#fff;padding:12px 24px;border-radius:12px;font-weight:bold;z-index:999;animation:slideUp 0.3s';
  msg.innerHTML = `🏎️ Ja vas creant el teu supercotxe! ${totalAcc}/42 accessoris`;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}

function comprarEmoji(id) {
  const emoji = EMOJI_BOTIGA.find(e => e.id === id);
  if(!emoji) return;
  if(estat.coins < emoji.preu) {
    alert('No tens prous coins');
    return;
  }
  estat.coins -= emoji.preu;
  estat.emojis.push(id);
  guardar();
  actualitzarCoins();
  carregarBotiga();
}

function carregarTips() {
  tipsData = TIPS;
  currentTip = 0;
  mostrarTip();
}

function mostrarTip() {
  if (tipsData.length === 0) return;
  const tip = tipsData[currentTip];
  document.getElementById('tip-content').innerHTML = `
    <div class="tip-emoji">${tip.emoji}</div>
    <div class="tip-text">${tip.txt}</div>
  `;
  document.getElementById('tip-counter').textContent = `${currentTip + 1} / ${tipsData.length}`;
}

function nextTip() {
  currentTip = (currentTip + 1) % tipsData.length;
  mostrarTip();
}

function prevTip() {
  currentTip = (currentTip - 1 + tipsData.length) % tipsData.length;
  mostrarTip();
}

function actualitzarMissatgeMotivacional() {
  const missatges = [
    "Vas per bon camí 💪",
    "Cada fallo et fa més fort 🔥",
    "L'examen DGT és teu 🚗",
    "No paris ara 💎",
    "Concentra't i aprovaràs 👑"
  ];
  const msg = missatges[Math.floor(Math.random() * missatges.length)];
  const el = document.getElementById('motivacio');
  if(el) el.textContent = msg;
}

// SERVICE WORKER REGISTRE
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
    .then(reg => console.log('SW registrat'))
    .catch(err => console.log('SW error:', err));
  });
}