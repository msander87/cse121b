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

export async function renderViews(string_with_array_positions) {
    let elements_to_show = Array.from(string_with_array_positions);
    viewsArray.forEach(item => {
        item.style.display = "none";
    });
    for (let i in elements_to_show) {
        viewsArray[elements_to_show[i]].style.display = "block";
    }
    return true;
}