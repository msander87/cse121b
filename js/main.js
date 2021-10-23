
const templeList = [];



const output = (temples) => {
  temples.forEach(
      temple => {
          let article = document.createElement('article');

          let templeName = document.createElement('h3');
          templeName.textContent = temple.book_title;

          let location = document.createElement('h4');
          location.textContent = temple.chapter_number;

          let dedicated = document.createElement('p');
          dedicated.textContent = temple.scripture_text;

          

          article.appendChild(templeName);
          article.appendChild(location);
          article.appendChild(dedicated);
          

          document.querySelector('#con').appendChild(article);
      }
  );
}


fetch('https://msander87.github.io/cse121b/json/bom.json')
    .then(response => response.json())
    .then(temples => {
        templeList = temples;
        output(templeList);
    });
