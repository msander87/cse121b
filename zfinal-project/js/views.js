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

    async renderViews(string_with_array_positions) {
        let elements_to_show = Array.from(string_with_array_positions);
        viewsArray.forEach(item => {
            item.style.display = "none";
        });
        for (let i in elements_to_show) {
            viewsArray[elements_to_show[i]].style.display = "block";
        }
        return true;
    }

    async setHomeButtons() {
        document.querySelector("#instructionsBtn").addEventListener("click", ev => this.renderViews("31"));
        document.querySelector("#scoresBtn").addEventListener("click", ev => this.renderViews("32"));
        document.querySelector("#returnBtn").addEventListener("click", ev => this.renderViews("30"));
        document.querySelector("#returnBtn2").addEventListener("click", ev => this.renderViews("30"));
    }

    async setRoundData(list, round) {
        document.querySelector("#num-question").innerHTML = round + 1;
        /*start descriptions*/
        let contentHints = `Gender: ${list[round].appearance.gender} | 
        Race: ${list[round].appearance.race} |
        Place of Birth: ${list[round].biography.placeOfBirth} | 
        Occupation: ${list[round].work.ocupation} |
        Publisher: ${list[round].biography.publisher} | 
        Group: ${list[round].connections.groupAffiliation} | 
        Relatives: ${list[round].connections.relatives}`
        document.querySelector("#p-hint").innerHTML = contentHints;
    }

    addElement(img, imgId, container) {
        let newImg = document.createElement("img");
        newImg.setAttribute('src', img);
        newImg.setAttribute('id', imgId);
        newImg.setAttribute('alt', "character picture");
        document.querySelector(container).appendChild(newImg);
    }

    addText(name) {
        if (name == "") {
            document.querySelector("#real-name").textContent = "Real Name: Unknown";
        } else {
            let pContent = `Real Name: ${name}`;
            document.querySelector("#real-name").textContent = pContent;
        }
    }

}