import { Character } from "./components/character.js";

async function getData(url){
    let data = await fetch(url);
    let json = await data.json();
    return json;
}

let loadCharacters = async () => {
    try {
        let data = await getData("https://swapi.dev/api/people/");
    } catch (error) {
        console.log(error);
    }
}

loadCharacters();