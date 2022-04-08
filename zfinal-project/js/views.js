//views
const view_login = document.querySelector("#login-container");
const view_instructions = document.querySelector("#instructions-container");
const view_scores = document.querySelector("#scores-container");
const view_home_buttons = document.querySelector("#home-buttons");
const view_playing = document.querySelector("#play-container");
const view_hints = document.querySelector("#hints");
const view_result = document.querySelector(".result-container");
const view_scoreboard = document.querySelector("#scoreboard");
const view_finished_game = document.querySelector("#final-result-container");
const viewsArray = [
    view_login,
    view_instructions,
    view_scores,
    view_home_buttons,
    view_playing,
    view_hints,
    view_result,
    view_scoreboard,
    view_finished_game
];

export default class Views {

    renderViews(string_with_array_positions) {
        let elements_to_show = Array.from(string_with_array_positions);
        viewsArray.forEach(item => {
            item.style.display = "none";
        });
        for (let i in elements_to_show) {
            viewsArray[elements_to_show[i]].style.display = "block";
        }
        return true;
    }

    setHomeButtons() {
        document.querySelector("#instructionsBtn").addEventListener("click", ev => this.renderViews("31"));
        document.querySelector("#scoresBtn").addEventListener("click", ev => this.renderViews("32"));
        document.querySelector("#returnBtn").addEventListener("click", ev => this.renderViews("30"));
        document.querySelector("#returnBtn2").addEventListener("click", ev => this.renderViews("30"));
    }

    setAnswerResult(character, image) {
        let value = document.querySelector("#answer").value;
        let answer = value.trim().toUpperCase();
        if (answer == "") {
            document.querySelector(".error2").textContent = "You must write something!";
            return false;
        } else {
            document.querySelector(".error2").textContent = "";
            document.querySelector("#answer").value = "";
            document.querySelector("#result-name").innerHTML = character;
            let newImg = document.createElement("img");
            newImg.setAttribute('src', image);
            newImg.setAttribute('id', 'image-result');
            newImg.setAttribute('alt', "character picture");
            document.querySelector("#result-img").appendChild(newImg);
            if (answer == character) {
                document.querySelector("#result-status").innerHTML = "CORRECT!";
                this.renderViews("67");
                return 10;
            } else {
                document.querySelector("#result-status").innerHTML = `WRONG!<br/><span id="wrong-answer">your answer was:<br/>${answer}<span>`;
                this.renderViews("67");
                return false;
            }
        }
    }

}