document.querySelector("#login-container").style.display = "none";
document.querySelector("#instructions-container").style.display = "none";
document.querySelector("#scores-container").style.display = "none";
//document.querySelector("#home-subheader").style.display = "none";
document.querySelector("#play-container").style.display = "none";
document.querySelector(".hints-container").style.display = "none";
document.querySelector(".result-container").style.display = "none";
document.querySelector(".play-subheader").style.display = "none";

const baseUrl = "https://www.superheroapi.com/api.php/5220822914617537/";

//731 ids

let character = {
    "response": "success",
    "id": "659",
    "name": "Thor",
    "powerstats": {
        "intelligence": "69",
        "strength": "100",
        "speed": "83",
        "durability": "100",
        "power": "100",
        "combat": "100"
    },
    "biography": {
        "full-name": "Thor Odinson",
        "alter-egos": "Rune King Thor",
        "aliases": ["Donald Blake", "Sigurd Jarlson", "Jake Olsen", "Donar the Mighty"],
        "place-of-birth": "Asgard",
        "first-appearance": "Journey into Mystery #83 (August, 1962)",
        "publisher": "Rune King Thor",
        "alignment": "good"
    },
    "appearance": {
        "gender": "Male",
        "race": "Asgardian",
        "height": ["6'6", "198 cm"],
        "weight": ["640 lb", "288 kg"],
        "eye-color": "Blue",
        "hair-color": "Blond"
    },
    "work": {
        "occupation": "King of Asgard; formerly EMS Technician; Physician",
        "base": "New York, New York"
    },
    "connections": {
        "group-affiliation": "Avengers",
        "relatives": "Odin (father), Gaea (mother), Frigga (step-mother), Loki (step-brother), Vidar (half-brother), Buri (paternal great-grandfather), Bolthorn (maternal great grandfather), Bor (grandfather), Bestla (grandmother), Vili (uncle), Ve (uncle), Sigyn (former sister-in-law), Hela (alleged niece), Jormungand (alleged nephew), Fernis Wolf (alleged nephew)"
    },
    "image": {
        "url": "https:\/\/www.superherodb.com\/pictures2\/portraits\/10\/100\/140.jpg"
    }
}