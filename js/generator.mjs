// character-generator.html
import { fetchData, createSparkle, setLocalStorage, characterImages, getLocalStorage, summoningText, randomNames, elfNames, dwarfNames, darkNames, knightNames, chaosNames, mageNames, rogueNames, natureNames } from "./utils.mjs";

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

const overlay = document.querySelector('#summonOverlay');
const overlayTextEl = document.querySelector('.summon-text');
const randomButton = document.querySelector('#randomizeStats');
const allSelect = document.querySelectorAll('select');
const allTypingInputs = document.querySelectorAll('input:not([type="checkbox"])');

const randomNameButton = document.querySelector('#randomName');
const nameModal = document.querySelector('#nameModal');
const closeNameModal = document.querySelector('#closeNameModal');
const modalNameEl = document.querySelector('#selectedName');

const anyRandomNameButton = document.querySelector('#anyName');
const elfNameButton = document.querySelector('#elfName');
const dwarfNameButton = document.querySelector('#dwarfName');
const darkNameButton = document.querySelector('#darkName');
const mageNameButton = document.querySelector('#mageName');
const rogueNameButton = document.querySelector('#rogueName');
const knightNameButton = document.querySelector('#knightName');
const natureNameButton = document.querySelector('#natureName');
const chaosNameButton = document.querySelector('#chaosName');

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

function getRandomArrayText(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
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

function typeText(element, text, speed = 75) {
    element.textContent = "";
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

function handleNameButtonClick(array) {
    const modalRandomName = getRandomArrayText(array);
    typeText(modalNameEl, modalRandomName);
}

function renderNameModal() {
    nameModal.show();

    anyRandomNameButton.addEventListener('click', () => {
        const randomArray = getRandomArrayText(randomNames);
        handleNameButtonClick(randomArray);
    })
    elfNameButton.addEventListener('click', () => {handleNameButtonClick(elfNames)});
    dwarfNameButton.addEventListener('click', () => {handleNameButtonClick(dwarfNames)});
    darkNameButton.addEventListener('click', () => {handleNameButtonClick(darkNames)});
    mageNameButton.addEventListener('click', () => {handleNameButtonClick(mageNames)});
    rogueNameButton.addEventListener('click', () => {handleNameButtonClick(rogueNames)});
    knightNameButton.addEventListener('click', () => {handleNameButtonClick(knightNames)});
    natureNameButton.addEventListener('click', () => {handleNameButtonClick(natureNames)});
    chaosNameButton.addEventListener('click', () => {handleNameButtonClick(chaosNames)});

    closeNameModal.addEventListener('click', () => {
        nameModal.close();
    })
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
    overlay.classList.add('active');
    overlayTextEl.innerText = getRandomArrayText(summoningText);

    setTimeout(() => {
        allSelect.forEach(s => {
            const lock = document.querySelector(`.lock[data-target="${s.id}"]`);
            
            if (lock && lock.checked) {
                return;
            }
            
            randomizeSelection(s);
        });
        allTypingInputs.forEach(i => {
            const lock = document.querySelector(`.lock[data-target="${i.id}"]`);

            if (lock && lock.checked) {
                return;
            }

            if (i.type === 'number') {
                const randomNumber = Math.floor(Math.random() * (108 - 24)) + 24
                i.value = randomNumber;
            } 
            else {
                const randomNameType = getRandomArrayText(randomNames);
                const randomName = getRandomArrayText(randomNameType);
                i.value = randomName;
            }
        });
        overlay.classList.remove('active');
    }, 1800);
})

form.addEventListener('submit', sendToCharacterCard);

viewImagesButton.addEventListener('click', renderImageModal);
randomNameButton.addEventListener('click', renderNameModal);

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