
let bom = [];



const output = (temples) => {
    temples.forEach(
        temple => {
            let article = document.createElement('article');


            let dedicated = document.createElement('h4');
            dedicated.textContent = temple.book_title + " " + temple.chapter_number + " " + temple.scripture_text; 

            

            
            article.appendChild(dedicated);
            

            document.querySelector('#con').appendChild(article);
        }
    );
}


fetch('https://msander87.github.io/cse121b/json/bom.json')
    .then(response => response.json())
    .then(scriptures => {
        bom = scriptures;
        const shuffled = bom.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 10);
        output(selected);    

    });



