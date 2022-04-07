let playersList = [];

async function getList() {
    playersList = localStorage.getItem('players');
    playersList = JSON.parse(playersList);
    return playersList;
}

async function getTopScores() {
    playersList = await getList();
    if (!playersList) {
        playersList = [];
        return playersList;
    } else {
        let sortedList = playersList.sort((a, b) => b.maxScore - a.maxScore);
        return sortedList;
    }
}

async function saveList(players_list) {
    localStorage.setItem('players', JSON.stringify(players_list));
}

export async function getPlayer(username, password) {
    let findedElement;
    let finded = false;
    playersList = await getList();
    if (!playersList) {
        playersList = [];
        await addPlayer(username, password);
        console.log("entro a list 0");
        return true;
    } else {
        playersList.forEach(element => {
            if (element.user == username && element.password == password) {
                findedElement = element;
                finded = true;
                console.log(`entro a if en localstorage: ${element}`);      
            } else if (element.user == username) {
                finded = true;
                document.querySelector(".error").textContent = "This user already exists. If this is you, write the correct password, otherwise create another user";
            }
        });
        if (!finded) {
            addPlayer(username, password);
            return true;
        } else {
            return findedElement;
        }
    }
}

function createObj(username, password) {
    this.user = username;
    this.password = password;
    this.maxScore = 0;
}

async function addPlayer(username, password) {
    let newObj = new createObj(username, password)
    playersList.push(newObj);
    saveList(playersList);
}

export async function updateScore(username, score) {
    playersList = await getList();
    playersList.forEach(element => {
        if (element.user == username && element.maxScore < score) {
            element.maxScore = score;
            saveList(playersList);
        }
    });
}

export async function setTopScores(){    
    let topscores = await getTopScores();
    topscores.length = 15;
    let scoresContent = "";
    topscores.forEach(element => {
        scoresContent += `<li>${element.user}: ${element.maxScore}</li>`;
    });
    document.querySelector("#scores-ol").innerHTML = scoresContent;
}