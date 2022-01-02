
let bom = [];
let formatedArray = [];
let randomChapters = [];
let questions = [];
let points = 0;
let playerName = "";
let turn = 0;
const btnName = document.querySelector("#startGame");
const btnNext = document.querySelector("#next");
const btnNextQ = document.querySelector("#nextQ");
const btnPlayAgain = document.querySelector("#playAgain");


const bookNumChapters = 
    [
        { book: "1 Nephi", chapters: 22 },
        { book: "2 Nephi", chapters: 55 },
        { book: "Jacob", chapters: 62 },
        { book: "Enos", chapters: 63 },
        { book: "Jarom", chapters: 64 },
        { book: "Omni", chapters: 65 },
        { book: "Words of Mormon", chapters: 66 },
        { book: "Mosiah", chapters: 95 },
        { book: "Alma", chapters: 158 },
        { book: "Helaman", chapters: 174 },
        { book: "3 Nephi", chapters: 204 },
        { book: "4 Nephi", chapters: 205 },
        { book: "Mormon", chapters: 214 },
        { book: "Ether", chapters: 229 },
        { book: "Moroni", chapters: 239 }
    ]

    
    
function createRamdomItems(array){
    

    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor(Math.random() * 239) + 1;
        let book = '';
        let chapter = 0;
        
        if (randomNumber <= 22){
            book = '1 Nefi';
            chapter = Math.floor(Math.random() * 22) + 1;
        }
        else if (randomNumber > 22 && randomNumber <=55){
            book = '2 Nefi';
            chapter = Math.floor(Math.random() * 33) + 1;
        }
        else if (randomNumber > 55 && randomNumber <=62){
            book = 'Jacob';
            chapter = Math.floor(Math.random() * 7) + 1;
        }
        else if (randomNumber > 62 && randomNumber <=63){
            book = 'Enos';
            chapter = 1;
        }
        else if (randomNumber > 63 && randomNumber <=64){
            book = 'Jarom';
            chapter = 1;
        }
        else if (randomNumber > 64 && randomNumber <=65){
            book = 'Omni';
            chapter = 1;
        }
        else if (randomNumber > 65 && randomNumber <=66){
            book = 'Palabras de Mormon';
            chapter = 1;
        }
        else if (randomNumber > 66 && randomNumber <=95){
            book = 'Mosiah';
            chapter = Math.floor(Math.random() * 29) + 1;
        }
        else if (randomNumber > 95 && randomNumber <=158){
            book = 'Alma';
            chapter = Math.floor(Math.random() * 63) + 1;
        }
        else if (randomNumber > 158 && randomNumber <=174){
            book = 'Helaman';
            chapter = Math.floor(Math.random() * 16) + 1;
        }
        else if (randomNumber > 174 && randomNumber <=204){
            book = '3 Nefi';
            chapter = Math.floor(Math.random() * 30) + 1;
        }
        else if (randomNumber > 204 && randomNumber <=205){
            book = '4 Nefi';
            chapter = 1;
        }
        else if (randomNumber > 205 && randomNumber <=214){
            book = 'Mormon';
            chapter = Math.floor(Math.random() * 9) + 1;
        }
        else if (randomNumber > 214 && randomNumber <=229){
            book = 'Eter';
            chapter = Math.floor(Math.random() * 15) + 1;
        }
        else if (randomNumber > 229 && randomNumber <=239){
            book = 'Moroni';
            chapter = Math.floor(Math.random() * 10) + 1;
        }


        
        
        
        let obj = { book: book, chapter: chapter }
        if(randomChapters.length === 0){
            randomChapters.push(obj);
        }
        else if(randomChapters.length > 0){
            let exist = 0;
            for (let n = 0; n < randomChapters.length; n++) {
                
                if (randomChapters[n].book == book && randomChapters[n].chapter == randomChapter) {
                    exist = 1;
                }
            }
            if(exist == 0){
                randomChapters.push(obj);
            }
            else{
                exist = 0;
                i--; 
            }
        }                
    }   
}

function getName(){
    let name = document.querySelector("#nameInp").value;
    if (name == ""){
        document.querySelector("#lblname").innerHTML = "Please, Enter a Name"

    }
    else{
        playerName = name.toUpperCase();
        document.querySelector("#name").innerHTML = playerName;
        document.querySelector(".smallWin").style.display = 'none';
        document.querySelector(".bigWin").style.display = 'none';
        displayQuestions();
    }
      

}


function createQuestions(){
    
    for(i = 0; i < randomChapters.length; i++){
        let book = "";
        let chapter = 0;
        let verse1 = '';
        let verse2 = '';
        let verse3 = '';
        let turn = 0;
        for(n = 0; n < bom.length; n++){
            
            if(randomChapters[i].book == bom[n].book_title && randomChapters[i].chapter == bom[n].chapter_number && turn == 0){
                book = bom[n].book_title;
                chapter = bom[n].chapter_number;
                verse1 = bom[n].verse_number + " - " + bom[n].scripture_text;
                turn = 1;
                
            }
            else if(randomChapters[i].book == bom[n].book_title && randomChapters[i].chapter == bom[n].chapter_number && turn == 1){
                verse2 = bom[n].verse_number + " - " + bom[n].scripture_text;
                turn = 2;
            }
            else if(randomChapters[i].book == bom[n].book_title && randomChapters[i].chapter == bom[n].chapter_number && turn == 2){
                verse3 = bom[n].verse_number + " " + bom[n].scripture_text;
                turn = 3;
            }else if(turn == 3){
                let obj = { book: book, chapter: chapter, verse1: verse1, verse2: verse2, verse3: verse3 }
                questions.push(obj)
                turn = 0; 
                break              
            }
            }
        }
}
   
function ckeckInput(){
    let inpBook = document.querySelector("#book").value.toLowerCase();
    let inpChapter = document.querySelector("#chapter").value.toLowerCase();
    let correctBook = questions[turn].book.toLowerCase();
    let correctChapter = questions[turn].chapter;
    let difference = correctChapter - inpChapter;
    
        if(inpBook == "" && inpChapter == ""){
            document.querySelector("#output").innerHTML = "<p class='red'>Please, enter a Book and Chapter</p>"
        }
        else if(inpBook == correctBook){
            if(inpChapter == correctChapter){
                document.querySelector("#output").innerHTML = "<p class='green'>Perfect! this verses are from " + questions[turn].book + ":" + questions[turn].chapter +"</p>"
                points += 3;
                turn += 1;
                document.querySelector("#next").style.display = 'none';
                document.querySelector("#nextQ").style.display = 'inline';
            }
            else if(difference == 1 || difference == -1){
                document.querySelector("#output").innerHTML = "<p class='green'>Very close! this verses are from " + questions[turn].book + ":" + questions[turn].chapter +"</p>"
                points += 2;
                turn += 1;
                document.querySelector("#next").style.display = 'none';
                document.querySelector("#nextQ").style.display = 'inline';
            }
            else{
                document.querySelector("#output").innerHTML = "<p class='green'>Well, at least you guessed the book. This verses are from " + questions[turn].book + ":" + questions[turn].chapter +"</p>"
                points += 1;
                turn += 1;
                document.querySelector("#next").style.display = 'none';
                document.querySelector("#nextQ").style.display = 'inline';
            }
        }
        else{
            document.querySelector("#output").innerHTML = "<p class='red'>Wrong! This verses are from " + questions[turn].book + ":" + questions[turn].chapter +"</p>"
            turn += 1;
            document.querySelector("#next").style.display = 'none';
            document.querySelector("#nextQ").style.display = 'inline';    
        }
    
  
}


function displayQuestions(){
    if(turn < 10){
        document.querySelector("#score").innerHTML = points;
        document.querySelector("#nq").innerHTML = turn + 1;
        document.querySelector("#verse1").innerHTML = questions[turn].verse1;
        document.querySelector("#verse2").innerHTML = questions[turn].verse2;
        document.querySelector("#verse3").innerHTML = questions[turn].verse3;
    }
    else{
        document.querySelector("#h3q").innerHTML = "Game finished!";
        document.querySelector("#display").style.display = 'none';
        document.querySelector("#endText").innerHTML = "<p class='green'>Thanks for playing " + playerName +", Your final score is " + points + " points!</p>";
        document.querySelector("#playAgain").style.display = 'inline';

    }
}


function startPlaying(){
    createRamdomItems(bookNumChapters);
    createQuestions();
    getName();
    
    // let str = JSON.stringify(randomChapters);
    // document.querySelector("#con").innerHTML = str; 
}
btnPlayAgain.addEventListener('click', function() {
    location.reload();    
    
});

btnNextQ.addEventListener('click', function() {
    document.querySelector("#output").innerHTML = "";
    document.querySelector("#book").value = "";
    document.querySelector("#chapter").value = "";
    document.querySelector("#nextQ").style.display = 'none';
    document.querySelector("#next").style.display = 'inline';
    displayQuestions();       
    
});

btnNext.addEventListener('click', function() { 
    ckeckInput();
});

btnName.addEventListener('click', function() { 
    fetchUrl();
});

function fetchUrl(){
    fetch('https://msander87.github.io/cse121b/json/bom.json')
        .then(response => response.json())
        .then(scriptures => {
            bom = scriptures;
            startPlaying();
        });
}

