// Dag 4: Funktioner som bygger sidans innehåll med DOM. Gör alla tester gröna på tests.html.
// Röda understrykningar tills du skrivit return är normalt. ratt.bild och ratt.beskrivning är valfria (string | undefined): använd ?? "" för att få en text.
// Regel: använd createElement och textContent. Använd INTE innerHTML med data.
import { formateraPris } from "./pris";
import type { Ratt } from "./typer";

// 1. Bygger ett kort för en rätt och returnerar det (anropar inte append själv).
//    <article data-id="1">
//      <img src="..." alt="Illustration av kardemummabulle">
//      <h3>Kardemummabulle</h3>
//      <p>Beskrivning</p>
//      <p class="pris">35 kr</p>
//    </article>

export function skapaRattKort(ratt: Ratt): HTMLElement {
  const article = document.createElement("article");
  article.dataset.id = ratt.id.toString();

  const img = document.createElement("img");
  img.src = ratt.bild ?? "";
  img.alt = `Illustration av ${ratt.namn}`;
  article.append(img);

  const h3 = document.createElement("h3");
  h3.textContent = ratt.namn;
  article.append(h3);

  const beskrivning = document.createElement("p");
  beskrivning.textContent = ratt.beskrivning ?? "";
  article.append(beskrivning);

  const pris = document.createElement("p");
  pris.classList.add("pris");
  pris.textContent = formateraPris(ratt.pris);
  article.append(pris);

  return article;
}

// 2. Töm containern och lägg in ett kort per rätt.
//    Är listan tom: visa <p class="tom">Inga rätter hittades.</p> istället.

export function visaMeny(container: HTMLElement, ratter: Ratt[]): void {
  container.replaceChildren();
  if (ratter.length === 0) {
    const p = document.createElement("p");
    p.classList.add("tom");
    p.textContent = "Inga rätter hittades.";
    container.append(p);
    return;
  }
  for (const ratt of ratter) {
    const kort = skapaRattKort(ratt);
    container.append(kort);
  }
}

// 3. Sätt rubrikens text: "Meny (8 rätter)". Ett enda: "Meny (1 rätt)".
export function uppdateraRubrik(element: HTMLElement, antal: number): void {
  element.textContent = `Meny (${antal} ${antal === 1 ? "rätt" : "rätter"})`;
}

// 4. Markera EN rätt som dagens rätt: klassen "dagens" ska finnas på kortet med rätt
//    data-id, och inte på något annat kort. Anropas igen = markeringen flyttas.

export function markeraDagensRatt(container: HTMLElement, id: number): void {
  // Ta bort "dagens" från alla kort först

  const kort = container.querySelectorAll<HTMLElement>("article");
  for (const k of kort) {
    k.classList.remove("dagens");
  }
  // Lägg till "dagens" på kortet med rätt data-id

  const dagensKort = container.querySelector<HTMLElement>(`article[data-id="${id}"]`);
  if (dagensKort) {
    dagensKort.classList.add("dagens");
  }
}
