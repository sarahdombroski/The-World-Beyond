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