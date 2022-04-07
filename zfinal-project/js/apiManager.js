const url = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
let characters = [];

function containsDuplicates(array) {
    if (array.length !== new Set(array).size) {
        return true;
    }
    return false;
}

function createRandomArray(max) {
    let randomArray = Array(10).fill().map(() => Math.floor(max * Math.random()));
    if (containsDuplicates(randomArray)) {
        createRandomArray(max);
    } else {
        return randomArray;
    }
}

function createArray(anArray) {
    let numbers = createRandomArray(characters.length - 1);
    let newArray = [];
    for (let n in numbers) {
        newArray.push(anArray[numbers[n]]);
    }
    return newArray;
}

async function fetchJSON() {
    const response = await fetch(url);
    const characters = await response.json();
    return characters;
}

export async function getArray() {
    if (characters.length <= 0) {
        characters = await fetchJSON();
        let randomArray = createArray(characters);
        return randomArray;
    } else {
        let randomArray = createArray(characters);
        return randomArray;
    }
}