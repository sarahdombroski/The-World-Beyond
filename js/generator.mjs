// character-generator.html
import { fetchData, setLocalStorage, characterImages } from "./utils.mjs";

const nameEl = document.querySelector('#character-name');
const classEl = document.querySelector('#character-class');
const subclassEl = document.querySelector('#character-subclass');
const raceEl = document.querySelector('#character-race');
const languageEl = document.querySelector('#character-language');
const heightEl = document.querySelector('#character-height');
const weightEl = document.querySelector('#character-weight');
const alignmentEl = document.querySelector('#character-alignment');
const skillEl = document.querySelector('#character-skill');
const traitsEl = document.querySelector('#character-traits');
const imageEl = document.querySelector('#character-img');

const imageModal = document.querySelector('#imageModal');
const imageGalleryEl = document.querySelector('#imageGallery');
const closeImageModalButtons = document.querySelectorAll('.closeImageModal');
const viewImagesButton = document.querySelector('#viewImages');

const randomButton = document.querySelector('#randomizeStats');
const allSelect = document.querySelectorAll('select');

const form = document.querySelector('form');

function setOption(c) {
    return `<option value="${c}">${c}</option>`;
}

async function setSelection(el, type) {
    const promise = await fetchData(type);
    const dataArray = promise.results;

    dataArray.forEach(d => {
        el.innerHTML += setOption(d.name);
    });
}

function randomizeSelection(selectElement) {
    const options = Array.from(selectElement.options).filter(opt => !opt.disabled && opt.value !== '');
    const randomIndex = Math.floor(Math.random() * options.length);
    selectElement.value = options[randomIndex].value;
}

function init() {
    setSelection(classEl, 'classes');
    setSelection(subclassEl, 'subclasses');
    setSelection(raceEl, 'races');
    setSelection(languageEl, 'languages');
    setSelection(alignmentEl, 'alignments');
    setSelection(skillEl, 'skills');
    setSelection(traitsEl, 'traits');

    characterImages.forEach(img => {
        imageEl.innerHTML += setOption(img);
    })
}

function imageDiv(img) {
    return `<div class="imageDisplay">
                <p>Code: ${img}</p>
                <img src="images/${img}" alt="${img}" />    
            </div>`;
}

function renderImageModal() {
    imageModal.show();
    characterImages.forEach(img => {
        imageGalleryEl.innerHTML += imageDiv(img);
    })

    closeImageModalButtons.forEach(button => {
        button.addEventListener('click', () => {
        imageModal.close();
        imageGalleryEl.innerHTML = '';
    })})
}

function sendToCharacterCard(e) {
    e.preventDefault();

    const languages = Array.from(languageEl.selectedOptions).map(opt => opt.value);
    const traits = Array.from(traitsEl.selectedOptions).map(opt => opt.value);

    const characterData = {
        name: nameEl.value,
        classSelected: classEl.value,
        subclass: subclassEl.value,
        race: raceEl.value,
        language: languages,
        height: heightEl.value,
        weight: weightEl.value,
        alignment: alignmentEl.value,
        skill: skillEl.value,
        traits: traits,
        imagePath: imageEl.value
    };

    setLocalStorage("characterForm", characterData);

    window.location.href = 'character-card.html';
}

init();
randomButton.addEventListener('click', () => {
    allSelect.forEach(s => {
        const lock = document.querySelector(`.lock[data-target="${s.id}"]`);
        
        if (lock && lock.checked) {
            return;
        }
        
        randomizeSelection(s);
    })
})

form.addEventListener('submit', sendToCharacterCard);

viewImagesButton.addEventListener('click', renderImageModal);