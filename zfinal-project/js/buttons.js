import {renderViews} from "./views.js";

const button_show_instructions = document.querySelector("#instructionsBtn");
const button_show_scores = document.querySelector("#scoresBtn");
const button_return_from_instructions = document.querySelector("#returnBtn");
const button_return_from_scores = document.querySelector("#returnBtn2");
const button_return_from_final = document.querySelector("#returnBtn3");
const button_answer = document.querySelector("#answerBtn");
const button_hint_letter = document.querySelector("#hint-letter");
const button_hint_relatives = document.querySelector("#hint-relatives");
const button_hint_group = document.querySelector("#hint_group");
const button_hint_real_name = document.querySelector("#hint-real-name");
const button_hint_image = document.querySelector("#hint-image");
const button_skip_question = document.querySelector("#skip-question");
const button_next_question = document.querySelector("#nextBtn");
const button_restart = document.querySelector("#restartBtn");

//views: 0 login | 1 instructions | 2 scores | 3 home_buttons | 4 playing | 5 hints | 6 result | 7 scoreboard | 8 finished_game

export default class Buttons {
    

    async setHomeButtons(){
        button_show_instructions.addEventListener("click", function(){
            renderViews('31');
        });
        button_show_scores.addEventListener("click", function(){
            renderViews('32');
        });
        button_return_from_instructions.addEventListener("click", function(){
            renderViews('30');
        });        
        button_return_from_scores.addEventListener("click", function(){
            renderViews('30');          
        });
    }
    
}