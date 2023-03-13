import { Character } from "./components/character.js";

let main = document.querySelector(".main");
let compareBtn = document.querySelector(".compare-characters-btn");
// creating the characters
let character1 = new Character();
let character2 = new Character();
//Getting images for characters, could be made better
let imageObi = new Image();
let imageKit = new Image();
let imageQui = new Image();
let imageBinks = new Image();
let imageAyala = new Image();
let imageMace = new Image();
let imageMaul = new Image();
let imageSidious = new Image();
let imageDooku = new Image();
let imageFett = new Image();
let imageRobot = new Image();
let imageWesell = new Image();
imageObi.src = "../../assets/img/obi-wan-kenobi.png";
imageKit.src = "../../assets/img/kit-fisto.png";
imageQui = "../../assets/img/quin-gon-jinn.png";
imageBinks.src = "../../assets/img/jar-jar-binks.png";
imageAyala.src = "../../assets/img/ayala-secura.png";
imageMace.src = "../../assets/img/mace-windu.png";
imageMaul.src = "../../assets/img/darth-maul.png";
imageSidious.src = "../../assets/img/darth-sidious.png";
imageDooku.src = "../../assets/img/count-dooku.png";
imageFett.src = "../../assets/img/jango-fett.png";
imageRobot.src = "../../assets/img/grievous.png";
imageWesell.src = "../../assets/img/zam-wesell.png";

async function getData(url){
    let data = await fetch(url);
    let json = await data.json();
    return json;
}

async function createCharacters(char1,char2){
    // get values from select
    let value1 = document.querySelector("#character-1").value;
    let value2 = document.querySelector("#character-2").value;

    // fetch the relevant characters data
    let data1 = await getData("https://swapi.dev/api/people/" + value1);
    let data2 = await getData("https://swapi.dev/api/people/" + value2);

    // put character data to character attributes
    char1.name = data1.name;
    char1.gender = data1.gender;
    char1.height = data1.height;
    char1.mass = data1.mass;
    char1.hairColor = data1.hair_color;
    char1.skinColor = data1.skin_color;
    char1.eyeColor = data1.eye_color;
    char1.movies = data1.films;
    console.log(char1.name);

    
    char2.name = data2.name;
    char2.gender = data2.gender;
    char2.height = data2.height;
    char2.mass = data2.mass;
    char2.hairColor = data2.hair_color;
    char2.skinColor = data2.skin_color;
    char2.eyeColor = data2.eye_color;
    char2.movies = data2.films;
}

async function renderCharacter(char1, char2){
    let name1 = document.querySelector('[data-element-1="name"]');
    let name2 = document.querySelector('[data-element-2="name"]');
    let gender1 = document.querySelector('[data-element-1="gender"]');
    let gender2 = document.querySelector('[data-element-2="gender"]');
    let height1 = document.querySelector('[data-element-1="height"]');
    let height2 = document.querySelector('[data-element-2="height"]');
    let mass1 = document.querySelector('[data-element-1="mass"]');
    let mass2 = document.querySelector('[data-element-2="mass"]');
    let hairColor1 = document.querySelector('[data-element-1="hairColor"]');
    let hairColor2 = document.querySelector('[data-element-2="hairColor"]');
    let skinColor1 = document.querySelector('[data-element-1="skinColor"]');
    let skinColor2 = document.querySelector('[data-element-2="skinColor"]');
    let eyeColor1 = document.querySelector('[data-element-1="eyeColor"]');
    let eyeColor2 = document.querySelector('[data-element-2="eyeColor"]');
    let movies1 = document.querySelector('[data-element-1="movies"]');
    let movies2 = document.querySelector('[data-element-2="movies"]');

    name1.textContent = char1.name;
    gender1.textContent = `Gender: ${char1.gender}` ;
    height1.textContent = `Height: ${char1.height}`;
    mass1.textContent = `Mass: ${char1.mass}`;
    hairColor1.textContent = `Hair Color: ${char1.hairColor}`;
    skinColor1.textContent = `Skin Color: ${char1.skinColor}`;
    eyeColor1.textContent = `Eye Color: ${char1.eyeColor}`;
    movies1.textContent = `Movies: ${char1.movies.length}`;

    name2.textContent = char2.name;
    gender2.textContent = `Gender: ${char2.gender}` ;
    height2.textContent = `Height: ${char2.height}`;
    mass2.textContent = `Mass: ${char2.mass}`;
    hairColor2.textContent = `Hair Color: ${char2.hairColor}`;
    skinColor2.textContent = `Skin Color: ${char2.skinColor}`;
    eyeColor2.textContent = `Eye Color: ${char2.eyeColor}`;
    movies2.textContent = `Movies: ${char2.movies.length}`;


}

let loadCharacters = async () => {
    try {
        
        compareBtn.addEventListener("click", async () => {
            let articleMain = document.querySelector(".article-main");
            await createCharacters(character1,character2);
            await renderCharacter(character1,character2);
            
        })


    } catch (error) {
        console.log(error);
    }
}

loadCharacters();