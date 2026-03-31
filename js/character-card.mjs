// character-card.html

import { getLocalStorage, setLocalStorage, createSparkle, getList } from "./utils.mjs";

const nameEl = document.querySelector('#Name');
const classEl = document.querySelector('#class');
const subclassEl = document.querySelector('#subclass');
const raceEl = document.querySelector('#stats-race');
const traitsEl = document.querySelector('#stats-traits');
const languageEl = document.querySelector('#stats-language');
const heightEl = document.querySelector('#stats-height');
const weightEl = document.querySelector('#stats-weight');
const imageEl = document.querySelector('#characterCardImage');
const alignmentEl = document.querySelector('#stats-alignment');

const saveButton = document.querySelector('#saveCharacterButton');

const characterData = getLocalStorage('characterForm');

function init() {
    if (characterData) {
        nameEl.innerText += characterData.name;
        classEl.innerText += characterData.classSelected;
        subclassEl.innerText += characterData.subclass;
        raceEl.innerText += characterData.race;
        traitsEl.innerText += getList(characterData.traits);
        languageEl.innerText += getList(characterData.language);
        heightEl.innerText += characterData.height;
        weightEl.innerText += characterData.weight;
        alignmentEl.innerHTML += characterData.alignment;
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

document.addEventListener('mousemove', (e) => {
    createSparkle(e.clientX, e.clientY);
})

let lastSparkle = 0;

document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastSparkle > 30) {
        createSparkle(e.clientX, e.clientY);
        lastSparkle = now;
    }
});

document.addEventListener("click", (e) => {
    for (let i = 0; i < 10; i++) {
        createSparkle(e.clientX, e.clientY);
    }
});