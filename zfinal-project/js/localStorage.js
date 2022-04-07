let playersList = [];

export default class LocalStorage {

    getList() {
        playersList = localStorage.getItem('players');
        playersList = JSON.parse(playersList);
        return playersList;
    }
    getTopScores() {
        playersList = this.getList();
        if (!playersList) {
            playersList = [];
            return playersList;
        } else {
            let sortedList = playersList.sort((a, b) => b.maxScore - a.maxScore);
            return sortedList;
        }
    }
    saveList(players_list) {
        localStorage.setItem('players', JSON.stringify(players_list));
    }
    getPlayer(username, password) {
        let findedElement;
        let finded = false;
        playersList = this.getList();
        if (!playersList) {
            playersList = [];
            this.addPlayer(username, password);
            return true;
        } else {
            playersList.forEach(element => {
                if (element.user == username && element.password == password) {
                    findedElement = element;
                    finded = true;
                } else if (element.user == username) {
                    finded = true;
                    document.querySelector(".error").textContent = "This user already exists. If this is you, write the correct password, otherwise create another user";
                }
            });
            if (!finded) {
                this.addPlayer(username, password);
                return true;
            } else {
                return findedElement;
            }
        }
    }
    addPlayer(username, password) {
        let newObj = new createObj(username, password)
        playersList.push(newObj);
        this.saveList(playersList);
    }
    updateScore(username, score) {
        playersList = this.getList();
        playersList.forEach(element => {
            if (element.user == username && element.maxScore < score) {
                element.maxScore = score;
                this.saveList(playersList);
            }
        });
    }
    setTopScores() {
        let topscores = this.getTopScores();
        topscores.length = 15;
        let scoresContent = "";
        topscores.forEach(element => {
            scoresContent += `<li>${element.user}: ${element.maxScore}</li>`;
        });
        document.querySelector("#scores-ol").innerHTML = scoresContent;
    }
    checkLogin() {
        let user = document.querySelector("#username").value.trim().toUpperCase();
        let password = document.querySelector("#password").value.trim();
        if (user.length < 5 || password.length < 5) {
            document.querySelector(".error").textContent = "Complete both fields with a minimum of 5 characters!";
            return false;
        } else {
            let result = this.getPlayer(user, password);
            if (result) {
                document.querySelector(".error").textContent = "";
                let data = [user];
                if (result.maxScore) {
                    data.push(result.maxScore);
                } else {
                    data.push(0);
                }
                return data;
            }
        }
    }

}

function createObj(username, password) {
    this.user = username;
    this.password = password;
    this.maxScore = 0;
}