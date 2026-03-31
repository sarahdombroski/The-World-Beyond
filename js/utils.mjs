const BASEURL = 'https://www.dnd5eapi.co/api/2014/';

export async function fetchData(endpoint) {
    try {
        const res = await fetch(`${BASEURL}${endpoint}`);
        if (!res.ok) {
            throw new Error('Network did not respond: ' + res.statusText);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.textContent = "✦";
    sparkle.style.left = (x + (Math.random() - 0.5) * 10) + "px";
    sparkle.style.top = (y + (Math.random() - 0.5) * 10) + "px";
    sparkle.style.width = sparkle.style.height = Math.random() * 6 + 3 + "px";
    const colors = ["#fff", "#aef", "#c8f", "#ffd"];
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(sparkle);
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}

export const characterImages = [
    'barbarian1.jpg', 'barbarian2.jpg', 'barbarian3.jpg', 'barbarian4.jpg',
    'bard1.png', 'bard2.jpeg', 'bard3.jpg',
    'cleric1.jpg', 'cleric2.jpg', 'cleric3.jpg', 'cleric4.jpg',
    'dragonborn1.jpeg', 'dragonborn2.jpg', 'dragonborn3.jpg', 'dragonborn4.jpg',
    'druid1.jpeg', 'druid2.jpeg', 'druid3.jpeg', 'druid4.jpg',
    'fighter1.jpeg', 'fighter2.jpeg', 'fighter3.jpg', 'fighter4.jpg',
    'monk1.jpg', 'monk2.jpg', 'monk3.jpg', 'monk4.jpg',
    'paladin1.jpeg', 'paladin2.jpg', 'paladin3.jpg', 'paladin4.jpg',
    'ranger1.jpg', 'ranger2.jpg', 'ranger3.jpg', 'ranger4.jpg',
    'rogue1.jpeg', 'rogue2.jpg', 'rogue3.jpg', 'rogue4.jpg',
    'sorcerer1.jpeg', 'sorcerer2.jpg', 'sorcerer3.jpg', 'sorcerer4.jpg',
    'tiefling1.jpg', 'tiefling2.jpg', 'tiefling3.jpg', 'tiefling4.jpg',
]

export const summoningText = [
    'SUMMONING...',
    'CONSULTING THE ARCHIVES...',
    'WEAVING FATE...',
    'DRAWING FROM THE VOID...'
]

const names = [
"Aelrion", "Thalindra", "Vaelion", "Nymeris", "Dravok",
"Elowen", "Kaelthas", "Sylvara", "Vorin", "Mystral",
"Zephyra", "Orinvald", "Liora", "Draeven", "Faelar",
"Xandor", "Isolde", "Velkyn", "Aerith", "Malrik",
"Seraphine", "Theron", "Caldris", "Nyxara", "Eryndor"
];

export const elfNames = [
"Aelar", "Faelar", "Luthien", "Sylvaris", "Aeris",
"Thalion", "Eldrin", "Vaelith", "Myriil", "Saelwen",
"Nymeriel", "Calenwe", "Ithilra", "Elunara", "Sylwen",
"Aerdrie", "Loriel", "Velatha", "Eryndra", "Faenor"
];

export const dwarfNames = [
"Thorin", "Bromgar", "Durik", "Kazador", "Morgran",
"Thrag", "Orsik", "Balgrim", "Dainor", "Kragar",
"Barundin", "Gimliar", "Torbek", "Rurik", "Grumdal",
"Khazrin", "Dorun", "Brakka", "Storn", "Harbek"
];

export const darkNames = [
"Malakar", "Zarvok", "Vorlath", "Nyxar", "Draekon",
"Velzareth", "Morvane", "Xyros", "Zareth", "Kaevor",
"Threxus", "Abyrion", "Varkul", "Noctyra", "Zytheris",
"Drakonis", "Velkor", "Azrath", "Xalvador", "Neroth"
];

export const mageNames = [
"Altharion", "Meridion", "Zyphros", "Calithar",
"Arcanis", "Velmora", "Eldros", "Myzrael",
"Thamior", "Orivann", "Zerethis", "Aelthas",
"Vandros", "Kelvior", "Iskandar", "Rhalion"
];

export const rogueNames = [
"Shade", "Nyx", "Vex", "Kairo", "Zin",
"Riven", "Silas", "Drake", "Kael", "Sable",
"Varyn", "Hex", "Zarek", "Noir", "Talon",
"Virex", "Kade", "Zylo", "Raze", "Nylo"
];

export const knightNames = [
"Aldric", "Cedric", "Thorne", "Valen", "Garrick",
"Lucian", "Roland", "Alaric", "Benedict", "Tristan",
"Leoric", "Darian", "Evander", "Hadrian", "Corvin",
"Arthas", "Tiberon", "Maximus", "Cassian", "Gideon"
];

export const natureNames = [
"Willow", "Thorne", "Briar", "Sylva", "Rowan",
"Fern", "Ashen", "Larkspur", "Moss", "Cedar",
"Ivyra", "Bloom", "Elderon", "Florian", "Verdan",
"Oakryn", "Petal", "Rill", "Grove", "Zephyra"
];

export const chaosNames = [
"Snaggle", "Grib", "Zonk", "Nib", "Skrit",
"Blorp", "Crank", "Zibble", "Mog", "Trik",
"Gibble", "Snark", "Wob", "Drib", "Zog",
"Flip", "Bork", "Skrag", "Niblet", "Grunk"
];

export const randomNames = [
    names, elfNames, dwarfNames, darkNames, mageNames, 
    rogueNames, knightNames, natureNames, chaosNames
]