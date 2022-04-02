const url = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
let maxLength = 0;


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
    let numbers = createRandomArray(maxLength);
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
    let result = await fetchJSON();
    maxLength = result.length - 1;
    let randomArray = createArray(result);
    return randomArray;
}
