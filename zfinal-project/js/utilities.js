export default class Utilities {

    setRoundData(list, round) {
        document.querySelector("#num-question").innerHTML = round + 1;
        /*start descriptions*/
        let contentHints = `<strong>Gender:</strong> ${list[round].appearance.gender}<br/>
        <strong>Race:</strong> ${list[round].appearance.race}<br/>
        <strong>Place of Birth:</strong> ${list[round].biography.placeOfBirth}<br/>
        <strong>Occupation:</strong> ${list[round].work.ocupation}<br/>
        <strong>Publisher:</strong> ${list[round].biography.publisher}<br/> 
        <strong>Group:</strong> ${list[round].connections.groupAffiliation}<br/> 
        <strong>Relatives:</strong> ${list[round].connections.relatives}`
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
        document.querySelector("#real-name").innerHTML = "";
        let imageHint = document.querySelector("#image-hint");
        let imageResult = document.querySelector("#image-result");
        if (imageHint) {
            imageHint.remove();
        }
        if (imageResult) {
            imageResult.remove();
        }
    }

    addElement(img) {
        let newImg = document.createElement("img");
        newImg.setAttribute('src', img);
        newImg.setAttribute('id', "image-hint");
        newImg.setAttribute('alt', "character picture");
        document.querySelector(".hints-container").appendChild(newImg);
        let image = document.querySelector("#image-hint");
        image.onload = function() {
            image.scrollIntoView({block: "center", behavior: "smooth"});
        };
        //document.querySelector("#image-hint").scrollIntoView({block: "start", behavior: "smooth"});
    }

    addText(name) {
        if (name == "") {
            document.querySelector("#real-name").textContent = "Real Name: Unknown";
        } else {
            let pContent = `Real Name: ${name}`;
            document.querySelector("#real-name").textContent = pContent;
        }
        document.querySelector("#real-name").scrollIntoView({block: "center", behavior: "smooth"});
    }

}