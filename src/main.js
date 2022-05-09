import rickAndMortyData from "./data/rickandmorty/rickandmorty.js";
import {
  filterData,
  allSpecies,
  allPlanet,
  allStatus,  
  characterSpecies,
  characterPlanet,
  charactersStatus,  
  clean,
  lookSelectSpecies,
  lookSelectPlanet,
  lookSelectStatus,
} from "./data.js";
// import {example} from './data.js';
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screenCard = document.getElementById("screenCard");
const cardCharacter = document.getElementById("cardCharacter");
const containerStatus = document.getElementById("status");
screen2.style.display = "none";
screenCard.style.display = "none";

const allInfo = rickAndMortyData.results;

// ----------------screen1--------------------------------
const btnNo = document.getElementById("no");
btnNo.addEventListener("click", function () {
  alert("You will be redirected to google");
  window.location.assign("https://www.google.com");
});

const btnYes = document.getElementById("yes");
btnYes.addEventListener("click", () => {
  screen1.style.display = "none";
  screen2.style.display = "block";
  // -----------al seleccionar yes se cargan los selectores
  //----selector por Species
  const onlySpecies = allSpecies(allInfo);
  let optionSpecies = `<option value="nothing" disabled selected>Select by Species</option>`;
  onlySpecies.forEach(
      (species) => optionSpecies += `<option value= "${species}">${species}</option>`
    );
  document.getElementById("selSpecies").innerHTML = optionSpecies;
  // ----selector por planeta de origen
  const onlyPlanet = allPlanet(allInfo);
  let optionPlanet = `<option value="nothing" disabled selected>Select Bu Planet</option>`;
  onlyPlanet.forEach(
    (planet) =>
      (optionPlanet += `<option value= "${planet}">${planet}</option>`)
  );
  document.getElementById("origin").innerHTML = optionPlanet;
  // ----selector por estado
  const onlyStatus = allStatus(allInfo);
  let optionStatus = `<option value="nothing" disabled selected>Select by Status</option>`;
  onlyStatus.forEach(
    (status) =>
      (optionStatus += `<option value= "${status}">${status}</option><br>`)
  );
  containerStatus.innerHTML = optionStatus;
});

// ----------------screen2-----------------------------------
const go = document.getElementById("goName");
const closed = document.getElementById("closed");
const textError = document.getElementById("textError");
const searchByName = document.getElementById("searchByName");

let dataCharacterSelected = []; //3 personajes con mismo nombre

go.addEventListener("click", (event) => {
  event.preventDefault();
  screen2.style.display = "none";
  screenCard.style.display = "block";
  dataCharacterSelected = filterData(searchByName.value, allInfo);
  console.log(dataCharacterSelected);
  let allCharacters = "";
  dataCharacterSelected.forEach((character) => {
    const newCard = createNewCard(character);
    allCharacters += newCard;
  });
  document.getElementById("cardCharacter").innerHTML = allCharacters;
});
// -------funcion para mostrar los estados segun lo seleccionado------
const status = document.getElementById("status");
const origin = document.getElementById("origin");
const species = document.getElementById("selSpecies");

origin.addEventListener("change", () => {
  clean(status, species);
});
// --------ver los personajes en (listAsSelected) que corresponden a la especie seleccionada
species.addEventListener("change",(event)=> {
  clean(origin,status);
  let speciesValue = event.target.value;
  let finalQuestSpecies = characterSpecies(speciesValue, allInfo);
  document.getElementById("listAsSelected").innerHTML = lookSelectSpecies(
    speciesValue,
    finalQuestSpecies
  );
})
// ----------Ver los Planetas
  origin.addEventListener("change", (event) => {
    clean(status,species);
    let planetValue = event.target.value;
    let finalQuestPlanet = characterPlanet (planetValue, allInfo);
    document.getElementById("listAsSelected").innerHTML = lookSelectPlanet(
      planetValue,
      finalQuestPlanet
    );
  })
// ----------ver los estados

status.addEventListener("change", (event) => {
  clean(origin, species);
  let statusValue = event.target.value;
  let finalQuestStatus = charactersStatus(statusValue, allInfo); //todos lo personajes correscondiente al valor
  document.getElementById("listAsSelected").innerHTML = lookSelectStatus(
    statusValue,
    finalQuestStatus
  );
});
// ------------------------------funcion que crea cada tarjeta-------
const createNewCard = (info) => {
  let { id, image, name, species, status, gender, origin, episode } = info;
  console.log(episode); // lo trae como un array con objetos, cada objeto es 1 episodio
  let episodes = "";
  episode.forEach((ep) => (episodes += `<li>${ep}</li>`));
  console.log(episodes);
  const structureCard = `<div id="cardCharacter">
    <div>
    <img id="image-${id}" src="${image}">
    </div>
     <ul>
        <li id="name-${id}">Name: ${name}</li>
        <li id="status-${id}">Status: ${status}</li>
        <li id="species-${id}">Specie: ${species}</li>
        <li id="gender-${id}">Gender: ${gender}</li>
        <li id="origin-${id}">Origin planet: ${origin.name}</li>
        <li id="allEpisode">Episodes:<ul id="listEpisode">${episodes}</ul></li>
     </ul>
  </div>`;
  return structureCard;
};

// ------ close cardCharacter button----------

closed.addEventListener("click", (event) => {
  event.preventDefault();
  screen2.style.display = "block";
  screenCard.style.display = "none";
  textError.style.display = "none";
  cardCharacter.innerHTML = "";
});

