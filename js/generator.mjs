// character-generator.html
import { fetchData, setLocalStorage, characterImages, getLocalStorage } from "./utils.mjs";

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
const submitButton = form.querySelector('button[type="submit"]');

const params = new URLSearchParams(window.location.search);
const editId = params.get('edit');

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

async function init() {
    await setSelection(classEl, 'classes');
    await setSelection(subclassEl, 'subclasses');
    await setSelection(raceEl, 'races');
    await setSelection(languageEl, 'languages');
    await setSelection(alignmentEl, 'alignments');
    await setSelection(skillEl, 'skills');
    await setSelection(traitsEl, 'traits');

    characterImages.forEach(img => {
        imageEl.innerHTML += setOption(img);
    })

    if (editId) {
        submitButton.innerText = 'Update Character';
        const characters = getLocalStorage('savedCharacters');
        const character = characters.find(c => c.id === editId);

        if (character) {
            nameEl.value = character.name;
            classEl.value = character.classSelected;
            subclassEl.value = character.subclass;
            raceEl.value = character.race;
            heightEl.value = character.height;
            weightEl.value = character.weight;
            alignmentEl.value = character.alignment;
            skillEl.value = character.skill;
            imageEl.value = character.imagePath;

            [...languageEl.options].forEach(opt => {
                opt.selected = character.language.includes(opt.value);
            });
            [...traitsEl.options].forEach(opt => {
                opt.selected = character.traits.includes(opt.value);
            });
        }
    }
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

    if (editId) {
        const characters = getLocalStorage('savedCharacters');
        const index = characters.findIndex(c => c.id === editId);
        const languages = Array.from(languageEl.selectedOptions).map(opt => opt.value);
        const traits = Array.from(traitsEl.selectedOptions).map(opt => opt.value);

        characters[index] = {
            ...characters[index],
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
        }

        setLocalStorage("savedCharacters", characters);
        window.location.href = 'saved-characters.html';
    } else {
        const languages = Array.from(languageEl.selectedOptions).map(opt => opt.value);
        const traits = Array.from(traitsEl.selectedOptions).map(opt => opt.value);

        const characterData = {
            id: crypto.randomUUID(),
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