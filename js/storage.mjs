// saved-characters.html
import { getLocalStorage, setLocalStorage, createSparkle } from "./utils.mjs";

const savedGallery = document.querySelector('#saved-gallery');
const editModal = document.querySelector('#editModal');

function cardTemplate(c) {
    return `
    <div class="character-card" data-id="${c.id}">
        <div class="card-outline">
            <h2 class="Name">${c.name}</h2>
            <div class="card-main-stats">
                <p class="characterClass">Class: ${c.classSelected}</p>
                <p class="subclass">Subclass: ${c.subclass}</p>
            </div>
            <img src="images/${c.imagePath}" alt="Card Image" class="characterCardImage" />
            <p class="stats-title">Stats:</p>
            <div class="card-all-stats">
                <p class="stats-race">Race: ${c.race}</p>
                <p class="stats-alignment">Alignment: ${c.alignment}</p>
                <p class="stats-traits">Traits: ${c.traits}</p>
                <p class="stats-language">Language: ${c.language}</p>
                <p class="stats-height">Height: ${c.height}</p>
                <p class="stats-weight">Weight: ${c.weight}</p>
            </div>
            <div class="buttons">
                <button class="edit-character">Edit</button>
                <button class="delete-character">Delete</button>
            </div>
        </div>
    </div>`;
}

function getCharacters() {
    const savedCharacters = getLocalStorage('savedCharacters');
    return savedCharacters;
}

function init() {
    const savedCharacters = getCharacters();
    savedGallery.innerHTML = '';
    savedCharacters.forEach(c => {
        savedGallery.innerHTML += cardTemplate(c);
    });
}

function deleteCharacter(id) {
    let allCharacters = getLocalStorage('savedCharacters');
    allCharacters = allCharacters.filter(c => c.id !== id);

    setLocalStorage('savedCharacters', allCharacters);
}

init();

document.addEventListener('click', function(e) {
    const card = e.target.closest('.character-card');
    if (!card) return;

    const id = card.dataset.id;

    if (e.target.classList.contains('delete-character')) {
        let forSure = confirm("Are you sure you want to delete?");
        if (forSure) {
            deleteCharacter(id);
            init();
        }
    }
    if (e.target.classList.contains('edit-character')) {
        window.location.href = `character-generator.html?edit=${id}`;
    }
})

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