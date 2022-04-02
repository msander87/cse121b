import {getArray} from "./apiManager.js";
import {renderViews} from "./views.js";
import Buttons from "./buttons.js";
//views: 0 login | 1 instructions | 2 scores | 3 home_buttons
//views: 4 playing | 5 hints | 6 result | 7 scoreboard | 8 finished_game



export default class Controller {
    constructor() {
        this.player = '';
        this.questions = [];
        this.topScores = '';
        this.currentScore = 0;
        this.round = 0;
        this.character = '';
        this.characterSecret = '';
        this.isPlaying = true;
        this.isFinished = false;
        this.buttons = new Buttons();
    }
    async init() {
        await renderViews('03');
        await this.buttons.setHomeButtons();
        document.querySelector("#select_user").addEventListener("click", login);    
    }
    
    async startPlaying(){
        this.questions = await getArray();
        console.log(this.questions);
        document.querySelector("#player-name").innerHTML = this.player.toUpperCase();
        document.querySelector("#best-score").innerHTML = 33;
        document.querySelector("#current-score").innerHTML = this.currentScore;
        this.setRound();
    }

    async setRound(){
        /*round*/
        this.character = this.questions[this.round].name;
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

        /*create formatted character*/
        let formatedCharacter = '';
        for(let l in this.character){
            if(this.character[l] === " "){
                formatedCharacter += " ";
            }
            else{
                formatedCharacter += "*";
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
        document.querySelector("#skip-question").addEventListener("click", skipQuestion);
        renderViews('475');
    }   
    uptade(){
        document.querySelector("#hidden-name").innerHTML = this.characterSecret;
        document.querySelector("#current-score").innerHTML = this.currentScore;
    }
}

const newInst = new Controller();
function login(event) {
    event.preventDefault();
    let user = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    if(user.length < 5 || password.length < 5){
        document.querySelector(".error").textContent = "Complete both fields with a minimum of 5 characters!";
    }
    else{
        document.querySelector(".error").textContent = ""; 
        newInst.player = user;
        newInst.startPlaying();
    }
}

function showLetter(){
    let arrayName = Array.from(newInst.character);
    let arraySecretName = Array.from(newInst.characterSecret);
    let randomPosition = Math.floor(Math.random() * arraySecretName.length);
    console.log(arrayName);
    console.log(arrayName.length - 1);
    console.log(randomPosition);
    if(arraySecretName.includes("*")){
        if(arraySecretName[randomPosition] == '*'){
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

function skipQuestion(){
    document.querySelector("#hints-ul").innerHTML = ""; 
    let image = document.querySelector("#image-hint");
    if(image){
        image.remove();
    }
    newInst.round += 1;
    newInst.setRound();
}

