import {getArray} from "./apiManager.js";
import {setTopScores, getPlayer, updateScore} from "./localStorage.js";
import {renderViews} from "./views.js";
import Buttons from "./buttons.js";
//views: 0 login | 1 instructions | 2 scores | 3 home_buttons
//views: 4 playing | 5 hints | 6 result | 7 scoreboard | 8 finished_game

export default class Controller {
    constructor() {
        this.player = '';
        this.questions = [];
        this.topScore = 0;
        this.currentScore = 0;
        this.round = 0;
        this.character = '';
        this.characterSecret = '';
        this.buttons = new Buttons();
    }
    async init() {
        await renderViews('03');
        await this.buttons.setHomeButtons();
        let topscores = await setTopScores();
        let scoresContent = "";
        topscores.forEach(element => {
            scoresContent += `<li>${element.user}: ${element.maxScore}</li>`;
        });
        document.querySelector("#scores-ol").innerHTML = scoresContent;
        console.log(topscores);
        document.querySelector("#select_user").addEventListener("click", login);    
    }
    
    async startPlaying(){
        this.questions = await getArray();
        console.log(this.questions);
        document.querySelector("#player-name").innerHTML = this.player;
        document.querySelector("#best-score").innerHTML = this.topScore;
        this.currentScore = 0;
        this.round = 0;
        this.setRound();
    }

    async setRound(){
        /*round*/
        document.querySelector("#num-question").innerHTML = this.round + 1;
        this.character = this.questions[this.round].name.toUpperCase();
        /*starter make hints*/        
        let contentHints = `<li>Gender: ${this.questions[this.round].appearance.gender}</li>
        <li>Race: ${this.questions[this.round].appearance.race}</li>
        <li>Place of Birth: ${this.questions[this.round].biography.placeOfBirth}</li>
        <li>Height: ${this.questions[this.round].appearance.height[1]}</li>
        <li>Weight: ${this.questions[this.round].appearance.weight[1]}</li>
        <li>Intelligence: ${this.questions[this.round].powerstats.intelligence}</li>
        <li>Strength: ${this.questions[this.round].powerstats.strength}</li>
        <li>Speed: ${this.questions[this.round].powerstats.speed}</li>
        <li>Durability: ${this.questions[this.round].powerstats.durability}</li>
        <li>Power: ${this.questions[this.round].powerstats.power}</li>
        <li>Combat: ${this.questions[this.round].powerstats.combat}</li>
        <li>Occupation: ${this.questions[this.round].work.ocupation}</li>
        <li>Publisher: ${this.questions[this.round].biography.publisher}</li>`
        document.querySelector("#hints-ul").innerHTML = contentHints;    
        document.querySelector("#current-score").innerHTML = this.currentScore;            

        /*create formatted character*/
        let formatedCharacter = '';
        for(let l in this.character){
            if(this.character[l] === " "){
                formatedCharacter += " ";
            }
            else{
                formatedCharacter += "■";
            }
        }
        this.characterSecret = formatedCharacter;
        document.querySelector("#hidden-name").innerHTML = this.characterSecret;
        
        
        //set buttons
        document.querySelector("#hint-letter").addEventListener("click", showLetter);
        document.querySelector("#hint-relatives").addEventListener("click", addRelatives);
        document.querySelector("#hint-group").addEventListener("click", addGroup);
        document.querySelector("#hint-real-name").addEventListener("click", addName);
        document.querySelector("#hint-image").addEventListener("click", addImage);

        document.querySelector("#skip-question").addEventListener("click", nextQuestion);
        document.querySelector("#answerBtn").addEventListener("click", checkAnswer);
        document.querySelector("#nextBtn").addEventListener("click", nextQuestion);
        document.querySelector("#returnBtn3").addEventListener("click", returnMenu);
        document.querySelector("#restartBtn").addEventListener("click", restart);
        renderViews('475');
    }   
    uptade(){
        document.querySelector("#hidden-name").innerHTML = this.characterSecret;
        document.querySelector("#current-score").innerHTML = this.currentScore;
    }
    showQuestionResult(){

    }
    showFinalResult(){

    }
}

const newInst = new Controller();

async function returnMenu(){
    let topscores = await setTopScores();
        let scoresContent = "";
        topscores.forEach(element => {
            scoresContent += `<li>${element.user}: ${element.maxScore}</li>`;
        });
        document.querySelector("#scores-ol").innerHTML = scoresContent;
    renderViews("30");
}

function restart(){
    newInst.topScore = newInst.currentScore;
    newInst.startPlaying();
}

function checkAnswer(event){
    event.preventDefault();
    let value = document.querySelector("#answer").value;
    let answer = value.trim().toUpperCase();
    if(answer == ""){
        document.querySelector(".error2").textContent = "You must write something!"; 
    }
    else if(answer == newInst.character){
        document.querySelector(".error2").textContent = ""; 
        document.querySelector("#answer").value = "";
        newInst.currentScore += 10;
        document.querySelector("#result-name").textContent = newInst.character;
        document.querySelector("#result-status").textContent = "your answer is correct!";
        let newImg = document.createElement("img");
        newImg.setAttribute('src', newInst.questions[newInst.round].images.lg);
        newImg.setAttribute('id', 'image-result');
        newImg.setAttribute('alt', "character picture");
        document.querySelector(".result-container").appendChild(newImg);
        renderViews("6");
    }
    else{
        document.querySelector(".error2").textContent = ""; 
        document.querySelector("#answer").value = "";
        document.querySelector("#result-name").textContent = newInst.character;
        document.querySelector("#result-status").textContent = "your answer is wrong!";
        let newImg = document.createElement("img");
        newImg.setAttribute('src', newInst.questions[newInst.round].images.lg);
        newImg.setAttribute('id', 'image-result');
        newImg.setAttribute('alt', "character picture");
        document.querySelector(".result-container").appendChild(newImg);
        renderViews("6");
    }
}

async function login(event) {
    event.preventDefault();
    let user = document.querySelector("#username").value.trim().toUpperCase();
    let password = document.querySelector("#password").value.trim();
    if(user.length < 5 || password.length < 5){
        document.querySelector(".error").textContent = "Complete both fields with a minimum of 5 characters!";
    }
    else{
        let result = await getPlayer(user, password);
        console.log(result);
        if(result){
            document.querySelector("#username").value = "";
            document.querySelector("#password").value = "";            
            document.querySelector(".error").textContent = ""; 
            newInst.player = user;
            newInst.startPlaying();
            if(result.maxScore){
                newInst.topScore = result.maxScore;
            }
        }
    }
}

function showLetter(){
    let arrayName = Array.from(newInst.character);
    let arraySecretName = Array.from(newInst.characterSecret);
    let randomPosition = Math.floor(Math.random() * arraySecretName.length);
    if(arraySecretName.includes("■")){
        if(arraySecretName[randomPosition] == '■'){
            arraySecretName[randomPosition] = arrayName[randomPosition];
            newInst.characterSecret = arraySecretName.join("");
            newInst.currentScore -= 1;
            newInst.uptade();
        }
        else{
            showLetter();
        }
    }
}

function addRelatives(){
    addElement("relatives");
    newInst.currentScore -= 1;
    newInst.uptade();
    document.querySelector("#hint-relatives").removeEventListener("click", addRelatives);  
}

function addGroup(){
    addElement("group");
    newInst.currentScore -= 2;
    newInst.uptade();
    document.querySelector("#hint-group").removeEventListener("click", addGroup);  
}
function addName(){
    addElement("name");
    newInst.currentScore -= 4;
    newInst.uptade();
    document.querySelector("#hint-real-name").removeEventListener("click", addName);  
}
function addImage(){
    addElement("img");
    newInst.currentScore -= 4;
    newInst.uptade();
    document.querySelector("#hint-image").removeEventListener("click", addImage);  
}

function addElement(reference){
    if(reference == "img"){
        let newImg = document.createElement("img");
        newImg.setAttribute('src', newInst.questions[newInst.round].images.lg);
        newImg.setAttribute('id', 'image-hint');
        newImg.setAttribute('alt', "character picture");
        document.querySelector(".hints-container").appendChild(newImg);
    }
    else{
        let li = document.createElement("li");
        if(reference == "relatives"){
            li.textContent = `Relatives: ${newInst.questions[newInst.round].connections.relatives}`;

        }
        else if(reference == "group"){
            li.textContent = `Group Affiliation: ${newInst.questions[newInst.round].connections.groupAffiliation}`;
        }
        else if(reference == "name"){
            li.textContent = `Real Name: ${newInst.questions[newInst.round].biography.fullName}`;
        }
        document.querySelector("#hints-ul").appendChild(li);
    }
}

function nextQuestion(){
    if(newInst.round<9){
        document.querySelector("#hints-ul").innerHTML = ""; 
        let imageHint = document.querySelector("#image-hint");
        let imageResult = document.querySelector("#image-result");
        if(imageHint){
            imageHint.remove();
        }
        if(imageResult){
            imageResult.remove();
        }
        newInst.round += 1;
        newInst.setRound();
    }
    else{
        document.querySelector("#hints-ul").innerHTML = ""; 
        let imageHint = document.querySelector("#image-hint");
        let imageResult = document.querySelector("#image-result");
        if(imageHint){
            imageHint.remove();
        }
        if(imageResult){
            imageResult.remove();
        }
        document.querySelector("#final-score").innerHTML = newInst.currentScore;
        updateScore(newInst.player, newInst.currentScore);
        renderViews('8');
    }    
}

