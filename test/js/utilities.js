export default class Utilities {

    setRoundData(list, round) {
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

    createSecretFormat(character) {
        let formatedCharacter = '';
        for (let letter in character) {
            if (character[letter] === " ") {
                formatedCharacter += " ";
            } else {
                formatedCharacter += "■";
            }
        }
        return formatedCharacter;
    }

    updateSecretCharacter(caracter, secret) {
        let arrayName = Array.from(caracter);
        let arraySecretName = Array.from(secret);
        if (arraySecretName.includes("■")) {
            let run = true;
            while (run) {
                let randomPosition = Math.floor(Math.random() * arraySecretName.length);
                if (arraySecretName[randomPosition] == '■') {
                    arraySecretName[randomPosition] = arrayName[randomPosition];
                    let characterSecret = arraySecretName.join("");
                    run = false;
                    return characterSecret;
                }
            }
        } else {
            return false;
        }
    }

    cleanRound() {
        document.querySelector("#real-name").innerHTML = "Real Name: ?";
        let imageHint = document.querySelector("#image-hint");
        let imageResult = document.querySelector("#image-result");
        if (imageHint) {
            imageHint.remove();
        }
        if (imageResult) {
            imageResult.remove();
        }
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