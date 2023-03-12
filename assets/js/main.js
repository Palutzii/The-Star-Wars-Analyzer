import { Character } from "./components/character.js";

let compareBtn = document.querySelector(".compare-characters-btn");
let character1 = new Character();
let character2 = new Character();


async function getData(url){
    let data = await fetch(url);
    let json = await data.json();
    return json;
}

async function createCharacters(){
    // get values from select
    let value1 = document.querySelector("#character-1").value;
    let value2 = document.querySelector("#character-2").value;

    // fetch the relevant characters data
    let data1 = await getData("https://swapi.dev/api/people/" + value1);
    let data2 = await getData("https://swapi.dev/api/people/" + value2);

    
    character1.name = data1.name;
    character1.gender = data1.gender;
    character1.height = data1.height;
    character1.mass = data1.mass;
    character1.hairColor = data1.hairColor;
    character1.skinColor = data1.skinColor;
    character1.eyeColor = data1.eyeColor;
    character1.movies = data1.movies;

    
    character2.name = data2.name;
    character2.gender = data2.gender;
    character2.height = data2.height;
    character2.mass = data2.mass;
    character2.hairColor = data2.hairColor;
    character2.skinColor = data2.skinColor;
    character2.eyeColor = data2.eyeColor;
    character2.movies = data2.movies;
}

function renderCharacter(char1, char2){

}

let loadCharacters = async () => {
    try {
        let data = await getData("https://swapi.dev/api/people/");
        
        compareBtn.addEventListener("click", async () => {
            createCharacters();
        })


    } catch (error) {
        console.log(error);
    }
}

loadCharacters();