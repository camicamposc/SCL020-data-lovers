import rickAndMortyData from "./data/rickandmorty/rickandmorty.js";
import {
  filterData,
  allSpecies,
  allStatus,
  allOrigin,
  selectCharacters,
  lookSelect,
  filterLetter,
  createDataNames,
  createNewCard,
  count,
  numberEpisodes,
  episodeStatistics,
} from "./data.js";
// import {example} from './data.js';
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screenCard = document.getElementById("screenCard");
const cardCharacter = document.getElementById("cardCharacter");
const containerStatus = document.getElementById("status");
const listAsSelected = document.getElementById("listAsSelected");

screen2.style.display = "none";
screenCard.style.display = "none";
listAsSelected.style.display = "none";
// footer.style.display = "none";

const allInfo = rickAndMortyData.results;
console.log(numberEpisodes(allInfo));

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
  // footer.style.display = "block";
  // -----------al seleccionar yes se cargan los selectores
  //selector por Species

  const onlySpecies = allSpecies(allInfo);

  let optionSpecies = `<option value="nothing" disabled selected>Select by Species</option>`;
  onlySpecies.forEach(
    (species) =>
      (optionSpecies += `<option value= "${species}">${species}</option>`)
  );
  document.getElementById("selSpecies").innerHTML = optionSpecies;
  // ----selector por planeta de origen
  const onlyOrigin = allOrigin(allInfo);
  let optionOrigin = `<option value="nothing" disabled selected>Select by Planet Origin</option>`;
  onlyOrigin.forEach(
    (origin) =>
      (optionOrigin += `<option value= "${origin}">${origin}</option>`)
  );
  document.getElementById("selOrigin").innerHTML = optionOrigin;

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
const messageError = document.getElementById("messageError");
const searchByName = document.getElementById("searchByName");
const lookDataNames = document.getElementById("lookDataNames");

let dataCharacterSelected = [];
searchByName.addEventListener("input", () => {
  let letterKeyUp = searchByName.value;
  let names = filterLetter(letterKeyUp, allInfo);
  lookDataNames.innerHTML = createDataNames(names);
});

go.addEventListener("click", (event) => {
  event.preventDefault();
  listAsSelected.innerHTML = "";
  resetSelects();
  dataCharacterSelected = filterData(searchByName.value, allInfo);
  console.log(dataCharacterSelected);
  if (dataCharacterSelected.length === 0) {
    messageError.innerHTML = "Name not found, try again";
  } else {
    screen2.style.display = "none";
    screenCard.style.display = "flex";
    let allCharacters = "";
    dataCharacterSelected.forEach((character) => {
      let totalEpisodes = count(character.episode);
      let statistics = episodeStatistics(
        totalEpisodes,
        numberEpisodes(allInfo)
      );
      const newCard = createNewCard(character);
      allCharacters += newCard;
      console.log(statistics);
    });
    document.getElementById("cardCharacter").innerHTML = allCharacters;
  }
});
//numero de episodios del character

const status = document.getElementById("status");
const origin = document.getElementById("selOrigin");
const species = document.getElementById("selSpecies");
// -------ver los personajes en (listAsSelected) que corresponden al planeta de origen seleccionada
origin.addEventListener("change", (event) => {
  clean(status, species);
  let originValue = event.target.value;
  let finalQuestOrigin = selectCharacters(originValue, allInfo);
  document.getElementById("listAsSelected").innerHTML = lookSelect(
    originValue,
    finalQuestOrigin
  );
  let closeList = document.getElementById("closeList");
  // -------list of characters "links"---------
  let namesSelector = document.getElementsByClassName("namesSelector");
  innerDataAndCard(namesSelector, originValue);
  listAsSelected.style.display = "block";
  eraseList(closeList);
});
// --------ver los personajes en (listAsSelected) que corresponden a la especie seleccionada
species.addEventListener("change", (event) => {
  clean(origin, status);
  let speciesValue = event.target.value;
  let finalQuestSpecies = selectCharacters(speciesValue, allInfo);
  document.getElementById("listAsSelected").innerHTML = lookSelect(
    speciesValue,
    finalQuestSpecies
  );
  let closeList = document.getElementById("closeList");
  // -------list of characters "links"---------
  let namesSelector = document.getElementsByClassName("namesSelector");
  innerDataAndCard(namesSelector, speciesValue);
  listAsSelected.style.display = "block";
  eraseList(closeList);
});
// ----------ver los estados

status.addEventListener("change", (event) => {
  clean(origin, species);
  let statusValue = event.target.value;
  let finalQuestStatus = selectCharacters(statusValue, allInfo); //todos lo personajes correscondiente al valor
  document.getElementById("listAsSelected").innerHTML = lookSelect(
    statusValue,
    finalQuestStatus
  );
  let closeList = document.getElementById("closeList");
  // -------list of characters "links"---------
  let namesSelector = document.getElementsByClassName("namesSelector");
  innerDataAndCard(namesSelector, statusValue);
  listAsSelected.style.display = "block";
  eraseList(closeList);
});

// ------ close cardCharacter button----------

closed.addEventListener("click", (event) => {
  event.preventDefault();
  screen2.style.display = "block";
  screenCard.style.display = "none";
  messageError.style.display = "none";
  cardCharacter.innerHTML = "";
  resetSelects();
});
//reset valueSelect
const resetSelects = () => {
  status.value = status.options[0].value;
  origin.value = origin.options[0].value;
  species.value = species.options[0].value;
};
// button eraseList
const eraseList = (button) =>
  button.addEventListener("click", () => {
    listAsSelected.innerHTML = "";
    resetSelects();
  });
// list of characters "links" and create card
let innerDataAndCard = (namesSelector, value) => {
  for (let i = 0; i < namesSelector.length; i++) {
    let name = namesSelector[i];
    name.addEventListener("click", () => {
      dataCharacterSelected = filterData(name.textContent, allInfo, value);
      screen2.style.display = "none";
      screenCard.style.display = "flex";
      listAsSelected.style.display = "none";
      let allCharacters = "";
      dataCharacterSelected.forEach((character) => {
        const newCard = createNewCard(character);
        allCharacters += newCard;
      });
      document.getElementById("cardCharacter").innerHTML = allCharacters;
    });
  }
};
// limpiar los select si eligen otro
const clean = (sel1, sel2) => {
  sel1.value = sel1.options[0].value;
  sel2.value = sel2.options[0].value;
};
