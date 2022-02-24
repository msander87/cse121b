let apiURL = "https://swapi.dev/api/people";
let charactersArray = [];
let next, prev;
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');


function createCharacters(characters) {

  characters.forEach(item => {

    let section = document.createElement('section');
    let h4 = document.createElement("h4");
    let div = document.createElement('div');

    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let p4 = document.createElement("p");
    let p5 = document.createElement("p");
    let p6 = document.createElement("p");
    let p7 = document.createElement("p");
    let p8 = document.createElement("p");

    h4.textContent = item.name;
    p1.textContent = `Height: ${item.height}`;
    p2.textContent = `Mass: ${item.mass}`;
    p3.textContent = `Hair color: ${item.hair_color}`;
    p4.textContent = `Skin color: ${item.skin_color}`;
    p5.textContent = `Eye color: ${item.eye_color}`;
    p6.textContent = `Birth year: ${item.birth_year}`;
    p7.textContent = `Gender: ${item.gender}`;
    fetch(item.homeworld)
      .then((response) => response.json())
      .then((jsObject) => {
        p8.textContent = `Homeworld: ${jsObject.name}`;
      });

    h4.addEventListener('click', function () {
      if (div.style.display == 'none') {
        div.style.display = 'block';
      } else {
        div.style.display = 'none';
      }
    });

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    div.appendChild(p5);
    div.appendChild(p6);
    div.appendChild(p7);
    div.appendChild(p8);
    div.style.display = 'none';

    section.appendChild(h4);
    section.appendChild(div);
    document.querySelector('.container').appendChild(section);

  });
}


function fetching(url) {
  fetch(url)
    .then((response) => response.json())
    .then((jsObject) => {
      charactersArray = jsObject['results'];
      next = jsObject.next;
      prev = jsObject.previous;
      createCharacters(charactersArray);
    });
}


function setPrevBtn() {
  if (prev) {
    document.querySelector('.container').textContent = '';
    fetching(prev);
  }
}

function setNextBtn() {
  if (next) {
    document.querySelector('.container').textContent = '';
    fetching(next);
  }
}




window.addEventListener("load", fetching(apiURL), false);