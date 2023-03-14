import { Character } from "./components/character.js";

const body = document.body;
let compareBtn = document.querySelector(".compare-characters-btn");
let articleMain = document.querySelector(".article-main");
const loader = document.querySelector("#loading");
const loadMessage = document.querySelector("#long-wait");
let timerId = null;

// creating the characters
let character1 = new Character();
let character2 = new Character();

//Getting images for characters, could be made better
let images = {
    "10": "../../assets/img/obi-wan-kenobi.png",
    "53": "../../assets/img/kit-fisto.png",
    "32": "../../assets/img/quin-gon-jinn.png",
    "36": "../../assets/img/jar-jar-binks.png",
    "46": "../../assets/img/ayala-secura.png",
    "51": "../../assets/img/mace-windu.png",
    "44": "../../assets/img/darth-maul.png",
    "21": "../../assets/img/darth-sidious.png",
    "67": "../../assets/img/count-dooku.png",
    "69": "../../assets/img/jango-fett.png",
    "79": "../../assets/img/grievous.png",
    "70": "../../assets/img/zam-wesell.png"
};

function displayLoading(){
    loader.classList.add("display");
    console.log("Loading in resources");
    setTimeout(function () {
        loadMessage.style.display = "block";
    }, 5000);
}

function hideLoading(){
    loader.classList.remove("display");
    console.log("Loading done");
    loadMessage.style.display = "none";
}

async function getData(url){
    let data = await fetch(url);
    let json = await data.json();
    return json;
}

async function createCharacters(char1,char2){
    displayLoading();
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
    char1.image = images[value1];
    console.log(char1.movies);

    
    char2.name = data2.name;
    char2.gender = data2.gender;
    char2.height = data2.height;
    char2.mass = data2.mass;
    char2.hairColor = data2.hair_color;
    char2.skinColor = data2.skin_color;
    char2.eyeColor = data2.eye_color;
    char2.movies = data2.films;
    char2.image = images[value2];
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
    let image1 = document.querySelector('[data-element-1="img"]');
    let image2 = document.querySelector('[data-element-2="img"]');

    name1.textContent = char1.name;
    gender1.textContent = `Gender: ${char1.gender}` ;
    height1.textContent = `Height: ${char1.height}cm`;
    mass1.textContent = `Mass: ${char1.mass}kg`;
    hairColor1.textContent = `Hair Color: ${char1.hairColor}`;
    skinColor1.textContent = `Skin Color: ${char1.skinColor}`;
    eyeColor1.textContent = `Eye Color: ${char1.eyeColor}`;
    movies1.textContent = `Movies: ${char1.movies.length}`;
    image1.setAttribute("src", `${char1.image}`)
    

    name2.textContent = char2.name;
    gender2.textContent = `Gender: ${char2.gender}` ;
    height2.textContent = `Height: ${char2.height}cm`;
    mass2.textContent = `Mass: ${char2.mass}kg`;
    hairColor2.textContent = `Hair Color: ${char2.hairColor}`;
    skinColor2.textContent = `Skin Color: ${char2.skinColor}`;
    eyeColor2.textContent = `Eye Color: ${char2.eyeColor}`;
    movies2.textContent = `Movies: ${char2.movies.length}`;
    image2.setAttribute("src", `${char2.image}`)

    if(gender1.textContent == gender2.textContent){
        gender1.style.color = "white";
        gender2.style.color = "white";
    }else{
        gender1.style.color = "#FFE81F"
        gender2.style.color = "#FFE81F"
    };

    if(hairColor1.textContent == hairColor2.textContent){
        hairColor1.style.color = "white";
        hairColor2.style.color = "white";
    }else{
        hairColor1.style.color = "#FFE81F"
        hairColor2.style.color = "#FFE81F"
    };

    if(skinColor1.textContent == skinColor2.textContent){
        skinColor1.style.color = "white";
        skinColor2.style.color = "white";
    }else{
        skinColor1.style.color = "#FFE81F"
        skinColor2.style.color = "#FFE81F"
    };

    if(eyeColor1.textContent == eyeColor2.textContent){
        eyeColor1.style.color = "white";
        eyeColor2.style.color = "white";
    }else{
        eyeColor1.style.color = "#FFE81F"
        eyeColor2.style.color = "#FFE81F"
    };

    if(parseFloat(char1.height) > parseFloat(char2.height)){
        height1.style.color = "white";
        height2.style.color = "#FFE81F";
    }
    else if(parseFloat(char1.height) < parseFloat(char2.height)){
        height2.style.color = "white";
        height1.style.color = "#FFE81F";
    } else if(parseFloat(char1.height) == parseFloat(char2.height)){
        height1.style.color = "white";
        height2.style.color = "white";
    };

    if(parseFloat(char1.mass) > parseFloat(char2.mass)){
        mass1.style.color = "white";
        mass2.style.color = "#FFE81F";
    }
    else if(parseFloat(char1.mass) < parseFloat(char2.mass)){
        mass2.style.color = "white";
        mass1.style.color = "#FFE81F";
    } else if(parseFloat(char1.mass) == parseFloat(char2.mass)){
        mass1.style.color = "white";
        mass2.style.color = "white";
    };

    if(char1.movies.length > char2.movies.length){
        movies1.style.color = "white";
        movies2.style.color = "#FFE81F";
    }
    else if(char1.movies.length < char2.movies.length){
        movies2.style.color = "white";
        movies1.style.color = "#FFE81F";
    } else {
        movies1.style.color = "white";
        movies2.style.color = "white";
    };

    body.style.height = "100%";
    
    hideLoading()

}

let loadCharacters = async () => {
    try {
        
        compareBtn.addEventListener("click", async () => {

            await createCharacters(character1,character2);
            await renderCharacter(character1,character2);
            articleMain.classList.remove("hidden");
        })
    } catch (error) {
        console.log(error);
    }
}

loadCharacters();
