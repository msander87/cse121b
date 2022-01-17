
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
        { book: "2 Nephi", chapters: 33 },
        { book: "Jacob", chapters: 7 },
        { book: "Enos", chapters: 1 },
        { book: "Jarom", chapters: 1 },
        { book: "Omni", chapters: 1 },
        { book: "Words of Mormon", chapters: 1 },
        { book: "Mosiah", chapters: 29 },
        { book: "Alma", chapters: 63 },
        { book: "Helaman", chapters: 16 },
        { book: "3 Nephi", chapters: 30 },
        { book: "4 Nephi", chapters: 1 },
        { book: "Mormon", chapters: 9 },
        { book: "Ether", chapters: 15 },
        { book: "Moroni", chapters: 10 }
    ]

    
    
function createRamdomItems(array){
    for (let i = 0; i < 10; i++) {
        let randomElement = array[Math.floor(Math.random() * array.length)];
        let book = randomElement.book;
        let chapter = randomElement.chapters;
        let randomChapter = Math.floor(Math.random() * chapter) + 1;
        let obj = { book: book, chapter: randomChapter }
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
