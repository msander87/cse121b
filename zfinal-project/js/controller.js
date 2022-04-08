import {getArray} from "./apiManager.js";
import LocalStorage from "./localStorage.js";
import Views from "./views.js";
import Utilities from "./utilities.js";
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
        this.hintImageClicked = false;
        this.hintNameClicked = false;
        this.views = new Views();
        this.ls = new LocalStorage();
        this.utilities = new Utilities();
    }
    async init() {
        this.views.renderViews('03');
        this.views.setHomeButtons();
        this.setButtons();
        this.ls.setTopScores();
    } 
    async login(event) {
        event.preventDefault();
        let result = this.ls.checkLogin();
        if(result){
            this.player = result[0];
            this.topScore = result[1];
            this.startPlaying();            
        }
    }
    async startPlaying(){
        this.questions = await getArray();
        document.querySelector("#player-name").innerHTML = this.player;
        document.querySelector("#best-score").innerHTML = this.topScore;
        this.currentScore = 0;
        this.round = 0;        
        if(this.questions.length > 0){
            document.querySelector("#username").value = "";
            document.querySelector("#password").value = "";  
            this.setRound();
        }        
    }   
    async setRound(){
        this.hintImageClicked = false;
        this.hintNameClicked = false;
        this.character = this.questions[this.round].name.toUpperCase();
        this.utilities.setRoundData(this.questions, this.round);
        this.characterSecret = this.utilities.createSecretFormat(this.character);   
        this.uptade();
        this.views.renderViews('475');
    }   
    checkAnswer(event){
        event.preventDefault();
        let result = this.views.setAnswerResult(this.character, this.questions[this.round].images.lg);
        if (result){
            this.currentScore += result;
            this.uptade();
        } 
    }
    showLetter(){
        let result = this.utilities.updateSecretCharacter(this.character, this.characterSecret);
        if(result){
            this.characterSecret = result;
            this.currentScore -= 1;
            this.uptade();
        }
    }
    addName(){
        if(!this.hintNameClicked){
            this.utilities.addText(this.questions[this.round].biography.fullName);     
            this.currentScore -= 2;
            this.uptade();
            this.hintNameClicked = true;
        }        
    }
    addImage(){
        if(!this.hintImageClicked){
            this.utilities.addElement(this.questions[this.round].images.lg);
            this.currentScore -= 2;
            this.uptade();
            this.hintImageClicked = true;
        }
    }
    uptade(){
        document.querySelector("#hidden-name").innerHTML = this.characterSecret;
        document.querySelector("#current-score").innerHTML = this.currentScore;
    }    
    nextQuestion(){
        this.utilities.cleanRound();
        if(this.round<9){        
            this.round += 1;
            this.setRound();
        }
        else{
            document.querySelector("#final-score").innerHTML = this.currentScore;
            this.ls.updateScore(this.player, this.currentScore);
            if(this.topScore < this.currentScore){
                this.topScore = this.currentScore;
            }
            this.views.renderViews('8');
        }
        document.querySelector("header").scrollIntoView({block: "start", behavior: "smooth"});   
    }
    restart(){
        this.startPlaying();
    }
    returnMenu(){
        this.topScore = 0;
        this.ls.setTopScores();
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

