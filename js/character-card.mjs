// character-card.html

import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const nameEl = document.querySelector('#Name');
const classEl = document.querySelector('#class');
const subclassEl = document.querySelector('#subclass');
const raceEl = document.querySelector('#stats-race');
const traitsEl = document.querySelector('#stats-traits');
const languageEl = document.querySelector('#stats-language');
const heightEl = document.querySelector('#stats-height');
const weightEl = document.querySelector('#stats-weight');
const imageEl = document.querySelector('#characterCardImage');

const saveButton = document.querySelector('#saveCharacterButton');

const characterData = getLocalStorage('characterForm');
console.log(characterData);

function init() {
    if (characterData) {
        nameEl.innerText = characterData.name;
        classEl.innerText = characterData.classSelected;
        subclassEl.innerText = characterData.subclass;
        raceEl.innerText = characterData.race;
        traitsEl.innerText = characterData.traits;
        languageEl.innerText = characterData.language;
        heightEl.innerText = characterData.height;
        weightEl.innerText = characterData.weight;
        imageEl.src = `images/${characterData.imagePath}`;
    } else {
        console.log('No Data');
        nameEl.innerText = "Not sure how you got on this page... Please go back and create a character."
        classEl.innerText = "I guess you found an easter egg though. Pat yourself on the back!";
        raceEl.innerText = "But for real, you should probably go back and create a character.";
        traitsEl.innerText = "You have no stats :(";
    }
}

function saveCharacter(e) {
    e.preventDefault();

    let savedCharacters = getLocalStorage('savedCharacters');
    if (!savedCharacters) {
        savedCharacters = [];
    }

    savedCharacters.push(characterData);

    setLocalStorage('savedCharacters', savedCharacters);

    alert('Character Saved Successfully!');
    window.location.href = 'saved-characters.html';
}

init();

saveButton.addEventListener('click', saveCharacter);