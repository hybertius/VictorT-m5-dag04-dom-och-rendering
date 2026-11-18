import { meny } from "./data";
import { visaMeny, uppdateraRubrik, markeraDagensRatt } from "./ui";
import { billigast } from "./meny";

const h1 = document.querySelector("h1");
if (h1) {
	console.log(h1.textContent);
}

const heroRubrik = document.querySelector<HTMLElement>("#hero-rubrik");
if (heroRubrik) {
	heroRubrik.textContent = "Välkommen in!";
}

const menyLankar = document.querySelectorAll<HTMLAnchorElement>("nav a");
for (const länk of menyLankar) {
	console.log(`Href: ${länk.href}, Text: ${länk.textContent}`);
}

const p = document.createElement("p");
p.textContent = "Dagens tips: prova en kardemummabulle.";
const hero = document.querySelector<HTMLElement>("#hero");
if (hero) {
	hero.append(p);
}

const heroElement = document.querySelector<HTMLElement>("#hero");
if (heroElement) {
	heroElement.classList.add("dagens");
	heroElement.classList.remove("dagens");
}

// Det står attack i console när innerHTML används och img-taggen försöker ladda en ogiltig bild.
// När textContent används visas bara texten som den är, ingen kod exekveras.

//p.textContent = '<img src="x" onerror="console.log(\'Attack!\')">';

const menyLista = document.querySelector<HTMLElement>("#meny-lista");
const menyRubrik = document.querySelector<HTMLElement>("#meny-rubrik");
// 8. Anropa visaMeny med menyn, och uppdateraRubrik med antalet rätter.
if (menyLista && menyRubrik) {
	visaMeny(menyLista, meny);
	uppdateraRubrik(menyRubrik, meny.length);
}

const luncher = meny.filter((r) => r.kategori === "lunch");
const billigasteLunch = billigast(luncher);
if (menyLista && billigasteLunch) {
	markeraDagensRatt(menyLista, billigasteLunch.id);
}
