// Dag 4: DOM. Kör npm run dev och titta i Console (F12).
// querySelector kan ge null om elementet saknas. Hantera det med if eller ?. (TypeScript kräver det).
// Tips: document.querySelector<HTMLElement>("#id") säger vilken sorts element du får.
import { meny } from "./data";
import { visaMeny, uppdateraRubrik, markeraDagensRatt } from "./ui";
import { billigast } from "./meny";

// DEL 1: utforska DOM:en ----------------------------------------------
// 1. Hämta h1 med document.querySelector("h1") och skriv ut dess textContent.

const h1 = document.querySelector("h1");
if (h1) {
	console.log(h1.textContent);
}
// 2. Ändra texten i #hero-rubrik till "Välkommen in!"

const heroRubrik = document.querySelector<HTMLElement>("#hero-rubrik");
if (heroRubrik) {
	heroRubrik.textContent = "Välkommen in!";
}
// 3. Hämta alla länkar i menyn med document.querySelectorAll("nav a").
//    Loopa med for...of och skriv ut varje länks href och text.

const menyLankar = document.querySelectorAll<HTMLAnchorElement>("nav a");
for (const länk of menyLankar) {
	console.log(`Href: ${länk.href}, Text: ${länk.textContent}`);
}
// 4. Skapa ett nytt p-element (document.createElement), ge det texten
//    "Dagens tips: prova en kardemummabulle." och lägg det sist i #hero med append.

const p = document.createElement("p");
p.textContent = "Dagens tips: prova en kardemummabulle.";
const hero = document.querySelector<HTMLElement>("#hero");
if (hero) {
	hero.append(p);
}

// 5. Lägg klassen "dagens" på #hero med classList.add. Ta bort den med classList.remove.

const heroElement = document.querySelector<HTMLElement>("#hero");
if (heroElement) {
	heroElement.classList.add("dagens");
	heroElement.classList.remove("dagens");
}

// 6. Säkerhetsförsök: sätt p.innerHTML = '<img src="x" onerror="console.log(\'Attack!\')">'
//    Vad händer i Console? Byt sedan till p.textContent med samma text. Vad händer nu?

// Det står attack i console när innerHTML används och img-taggen försöker ladda en ogiltig bild.
// När textContent används visas bara texten som den är, ingen kod exekveras.

//p.textContent = '<img src="x" onerror="console.log(\'Attack!\')">';


// DEL 2: koppla ihop med funktionerna i ui.js ----------------------------
// 7. Hämta #meny-lista och #meny-rubrik.
const menyLista = document.querySelector<HTMLElement>("#meny-lista");
const menyRubrik = document.querySelector<HTMLElement>("#meny-rubrik");
// 8. Anropa visaMeny med menyn, och uppdateraRubrik med antalet rätter.
if (menyLista && menyRubrik) {
	visaMeny(menyLista, meny);
	uppdateraRubrik(menyRubrik, meny.length);
}
// 9. Dagens rätt = den billigaste lunchen. Använd filter och billigast (från meny.js)
//    och markeraDagensRatt.
const luncher = meny.filter(r => r.kategori === "lunch");
const billigasteLunch = billigast(luncher);
if (menyLista && billigasteLunch) {
	markeraDagensRatt(menyLista, billigasteLunch.id);
// visaMeny(menyLista, []);
}

// Testa att visa en tom meny


