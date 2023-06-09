import { Character } from "./components/character.js";

const body = document.body;
let compareBtn = document.querySelector(".compare-characters-btn");
let articleMain = document.querySelector(".article-main");
const loader = document.querySelector("#loading");
const loadMessage = document.querySelector("#long-wait");

let timeoutID = null;

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

let topBtn = document.getElementById("take-me-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
window.topFunction = topFunction;


function toggleExtraInfoDiv(){
    const extraInfoDiv = document.querySelector(".char-extra-info-div");
    const seeMoreBtn = document.querySelector("#see-more"); 

    if(extraInfoDiv.style.display === "none"){
        extraInfoDiv.style.display = "flex";
        seeMoreBtn.textContent = "Close The Cosmic Chronicles";
    } else {
        extraInfoDiv.style.display = "none";
        seeMoreBtn.textContent = "Cosmic Chronicles";
    }
}
// Makes the function work in html
window.toggleExtraInfoDiv = toggleExtraInfoDiv;

function displayLoading(){
    loader.classList.add("display");
    console.log("Loading in resources");
    timeoutID = setTimeout(function () {
                    loadMessage.style.display = "block";
    }, 5000);
}

function hideLoading(){
    loader.classList.remove("display");
    console.log("Loading done");
    clearTimeout(timeoutID);
    loadMessage.style.display = "none";
}

export async function getData(url){
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
    char1.homeworld = await char1.getHomeplanet(data1.homeworld);
    char1.vehicles = data1.vehicles;
    char1.starships = data1.starships;
    
    char2.name = data2.name;
    char2.gender = data2.gender;
    char2.height = data2.height;
    char2.mass = data2.mass;
    char2.hairColor = data2.hair_color;
    char2.skinColor = data2.skin_color;
    char2.eyeColor = data2.eye_color;
    char2.movies = data2.films;
    char2.image = images[value2];
    char2.homeworld = await char2.getHomeplanet(data2.homeworld);
    char2.vehicles = data2.vehicles;
    char2.starships = data2.starships;
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
    let appeared1 = document.querySelector('[data-element-1="appeared"]');
    let appeared2 = document.querySelector('[data-element-2="appeared"]');
    let bothAppeared = document.querySelector('[data-element-1="both-appeared"]');
    let homeplanet1 = document.querySelector('[data-element-1="homeplanet');
    let homeplanet2 = document.querySelector('[data-element-2="homeplanet');
    let homeplanet3 = document.querySelector('[data-element-3="homeplanet');
    let vehicle1 = document.querySelector('[data-element-1="vehicle');
    let vehicle2 = document.querySelector('[data-element-2="vehicle');
    let firstAppearanceChar1 =  await char1.getAppearanceDate();
    let firstAppearanceChar2 =  await char2.getAppearanceDate();
    let bothAppearedData = await char1.getMoviesFeaturedInWithOtherChar(char2);
    let mostExpensiveTransport1 = await char1.getExpensiveVehicleOrStarship();
    let mostExpensiveTransport2 = await char2.getExpensiveVehicleOrStarship();
    console.log(mostExpensiveTransport1);
    console.log(mostExpensiveTransport2);

    name1.textContent = char1.name;
    gender1.textContent = `Gender: ${char1.gender}` ;
    height1.textContent = `Height: ${char1.height}cm`;
    mass1.textContent = `Mass: ${char1.mass}kg`;
    hairColor1.textContent = `Hair Color: ${char1.hairColor}`;
    skinColor1.textContent = `Skin Color: ${char1.skinColor}`;
    eyeColor1.textContent = `Eye Color: ${char1.eyeColor}`;
    movies1.textContent = `Movies: ${char1.movies.length}`;
    image1.setAttribute("src", `${char1.image}`)
    appeared1.innerHTML = `<span style="color: #87CEFA;">${char1.name}</span> first appeared in "<span style="color: #FCB711;">${firstAppearanceChar1.title}</span>" on <span style="color: #2ECC71;">${firstAppearanceChar1.releaseDate}</span>`;
    homeplanet1.innerHTML = `<span style="color: #87CEFA;">${char1.name}'s</span> homeplanet is <span style="color: #9B59B6;">${char1.homeworld}</span>`;
    if (mostExpensiveTransport1 != null) {
        vehicle1.innerHTML = `<span style="color: #87CEFA;">${char1.name}</span> most expensive vehicle is the <span style="color: #E74C3C;">${mostExpensiveTransport1.model}</span> which costs <span style="color: #2ECC71;">${mostExpensiveTransport1.cost_in_credits} credits</span>.<br>It is manufactured by <span style="color: #9B59B6;">${mostExpensiveTransport1.manufacturer}</span>.`;
    } else {
        vehicle1.innerHTML = `<span style="color: #87CEFA;">${char1.name}</span> doesn't own any vehicle or starship.`;
    }
    
    
    name2.textContent = char2.name;
    gender2.textContent = `Gender: ${char2.gender}` ;
    height2.textContent = `Height: ${char2.height}cm`;
    mass2.textContent = `Mass: ${char2.mass}kg`;
    hairColor2.textContent = `Hair Color: ${char2.hairColor}`;
    skinColor2.textContent = `Skin Color: ${char2.skinColor}`;
    eyeColor2.textContent = `Eye Color: ${char2.eyeColor}`;
    movies2.textContent = `Movies: ${char2.movies.length}`;
    image2.setAttribute("src", `${char2.image}`)
    appeared2.innerHTML = `<span style="color: #FFA07A;">${char2.name}</span> first appeared in "<span style="color: #FCB711;">${firstAppearanceChar2.title}</span>" on <span style="color: #2ECC71;">${firstAppearanceChar2.releaseDate}</span>`;
    homeplanet2.innerHTML = `<span style="color: #FFA07A;">${char2.name}'s</span> homeplanet is <span style="color: #9B59B6;">${char2.homeworld}</span>`;
    if (mostExpensiveTransport2 != null) {
        vehicle2.innerHTML = `<span style="color: #FFA07A;">${char2.name}</span> most expensive vehicle is the <span style="color: #E74C3C;">${mostExpensiveTransport2.model}</span> which costs <span style="color: #2ECC71;">${mostExpensiveTransport2.cost_in_credits} credits</span>.<br>It is manufactured by <span style="color: #9B59B6;">${mostExpensiveTransport2.manufacturer}</span>.`;
    } else {
        vehicle2.innerHTML = `Weirdly enough, <span style="color: #FFA07A;">${char2.name}</span> doesn't own any vehicle or starship.`;
    }


    if(char1.homeworld === char2.homeworld){
        homeplanet3.style.display = "block";
        homeplanet1.style.display = "none";
        homeplanet2.style.display = "none";
        homeplanet3.textContent = `Both characters share ${char1.homeworld} as homeplanet`;
    } else{
        homeplanet3.style.display = "none";
        homeplanet1.style.display = "block";
        homeplanet2.style.display = "block";
    }

    if (bothAppearedData.length > 0) {
        let lastElement = bothAppearedData.pop();
        let moviesText = bothAppearedData.length > 0 ? bothAppearedData.join(', ') + ' and ' : '';
        bothAppeared.innerHTML = `Both characters appeared in <span style="color: #FCB711;">${moviesText}${lastElement}</span>`;
    } else {
        bothAppeared.textContent = "Both characters did not appear in the same movies";
    }

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
