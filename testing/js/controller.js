import {getArray} from "./apiManager.js";
import {setTopScores, getPlayer, updateScore} from "./localStorage.js";
import Views from "./views.js";

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
        this.views = new Views();
        this.hintImageClicked = false;
        this.hintNameClicked = false;
    }

    async init() {
        await this.views.renderViews('03');
        await this.views.setHomeButtons();
        this.setButtons();
        setTopScores();
    }

    async login(event) {
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
                document.querySelector(".error").textContent = ""; 
                this.player = user;
                if(result.maxScore){
                    this.topScore = result.maxScore;
                }
                this.startPlaying();
                
            }
        }
    }

    
    async startPlaying(){
        this.questions = await getArray();
        console.log(this.questions);
        document.querySelector("#player-name").innerHTML = this.player;
        document.querySelector("#best-score").innerHTML = this.topScore;
        this.currentScore = 0;
        this.round = 0;        
        if(this.questions){
            document.querySelector("#username").value = "";
            document.querySelector("#password").value = "";  
            this.setRound();
        }
        
    }

    async setRound(){
        this.hintImageClicked = false;
        this.hintNameClicked = false;
        this.character = this.questions[this.round].name.toUpperCase();
        this.views.setRoundData(this.questions, this.round);        

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

        this.views.renderViews('475');
    }   

    uptade(){
        document.querySelector("#hidden-name").innerHTML = this.characterSecret;
        document.querySelector("#current-score").innerHTML = this.currentScore;
    }
    
    restart(){
        this.startPlaying();
    }

    checkAnswer(event){
        event.preventDefault();
        let value = document.querySelector("#answer").value;
        let answer = value.trim().toUpperCase();
        if(answer == ""){
            document.querySelector(".error2").textContent = "You must write something!"; 
        }
        else if(answer == this.character){
            document.querySelector(".error2").textContent = ""; 
            document.querySelector("#answer").value = "";
            this.currentScore += 10;
            document.querySelector("#result-name").textContent = this.character;
            document.querySelector("#result-status").textContent = "your answer is correct!";
            let newImg = document.createElement("img");
            newImg.setAttribute('src', this.questions[this.round].images.lg);
            newImg.setAttribute('id', 'image-result');
            newImg.setAttribute('alt', "character picture");
            document.querySelector(".result-container").appendChild(newImg);
            this.views.renderViews("6");
        }
        else{
            document.querySelector(".error2").textContent = ""; 
            document.querySelector("#answer").value = "";
            document.querySelector("#result-name").textContent = this.character;
            document.querySelector("#result-status").textContent = "your answer is wrong!";
            let newImg = document.createElement("img");
            newImg.setAttribute('src', this.questions[this.round].images.lg);
            newImg.setAttribute('id', 'image-result');
            newImg.setAttribute('alt', "character picture");
            document.querySelector(".result-container").appendChild(newImg);
            this.views.renderViews("6");
        }
    }

    
    showLetter(){
        let arrayName = Array.from(this.character);
        let arraySecretName = Array.from(this.characterSecret);
        let randomPosition = Math.floor(Math.random() * arraySecretName.length);
        if(arraySecretName.includes("■")){
            if(arraySecretName[randomPosition] == '■'){
                arraySecretName[randomPosition] = arrayName[randomPosition];
                this.characterSecret = arraySecretName.join("");
                this.currentScore -= 1;
                this.uptade();
            }
            else{
                this.showLetter();
            }
        }
    }

    addName(){
        if(!this.hintNameClicked){
            this.views.addText(this.questions[this.round].biography.fullName);     
            this.currentScore -= 2;
            this.uptade();
            this.hintNameClicked = true;
        }        
    }

    addImage(){
        if(!this.hintImageClicked){
            this.views.addElement(this.questions[this.round].images.lg, "image-hint", ".hints-container");
            this.currentScore -= 2;
            this.uptade();
            this.hintImageClicked = true;
        }
    }

    async nextQuestion(){
        document.querySelector("#real-name").innerHTML = "Real Name: ?"; 
        let imageHint = document.querySelector("#image-hint");
        let imageResult = document.querySelector("#image-result");
        if(imageHint){
            imageHint.remove();
        }
        if(imageResult){
            imageResult.remove();
        }
        if(this.round<9){        
            this.round += 1;
            this.setRound();
        }
        else{
            document.querySelector("#final-score").innerHTML = this.currentScore;
            updateScore(this.player, this.currentScore);
            if(this.topScore < this.currentScore){
                this.topScore = this.currentScore;
            }
            this.views.renderViews('8');
        }    
    }

    async returnMenu(){
        this.topScore = 0;
        setTopScores();
        this.views.renderViews("30");
    }   
   
    setButtons(){
        document.querySelector("#hint-letter").addEventListener('click', ev => this.showLetter(ev));
        document.querySelector("#skip-question").addEventListener("click", ev => this.nextQuestion(ev));
        document.querySelector("#answerBtn").addEventListener("click", ev => this.checkAnswer(ev));
        document.querySelector("#nextBtn").addEventListener("click", ev => this.nextQuestion(ev));
        document.querySelector("#returnBtn3").addEventListener("click", ev => this.returnMenu(ev));
        document.querySelector("#restartBtn").addEventListener("click", ev => this.restart(ev));
        document.querySelector("#select_user").addEventListener("click", ev => this.login(ev));
        document.querySelector("#hint-real-name").addEventListener('click', ev => this.addName(ev));
        document.querySelector("#hint-image").addEventListener('click', ev => this.addImage(ev));
    }    
}

