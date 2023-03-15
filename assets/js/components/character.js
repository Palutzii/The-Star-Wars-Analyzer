import { getData } from "../main.js";

export class Character {
    constructor() {
        this.name = null;
        this.gender = null;
        this.height = null;
        this.mass = null;
        this.hairColor = null;
        this.skinColor = null;
        this.eyeColor = null;
        this.movies = null;
        this.image = null;
        this.homeworld = null;
        this.vehicles = null;
        this.starships = null;
    }

    async getAppearanceDate(){
        const movieDataList = [];

        for(const movie of this.movies) {
            const movieData = await getData(movie);
            movieDataList.push(movieData);
        }

        movieDataList.sort((a,b) => {
            return new Date(a.release_date) - new Date(b.release_date);
        })
        const firstAppearanceMovie = movieDataList[0];
        return {
            title: firstAppearanceMovie.title,
            releaseDate: firstAppearanceMovie.release_date
        };
    };

    async getMoviesFeaturedInWithOtherChar(otherChar){
        const sharedMovies = [];

        for (const movieUrl of this.movies) {
            if(otherChar.movies.includes(movieUrl)){
                const movieData = await getData(movieUrl);
                sharedMovies.push(movieData.title)
            }
        }
        return sharedMovies;
    };

    async getHomeplanet(data){
        const homeworldData = await getData(data);
        return homeworldData.name
    };

    async getExpensiveVehicleOrStarship() {
        const allTransportData = [];
    
        for (const vehicleUrl of this.vehicles) {
            const vehicleData = await getData(vehicleUrl);
            allTransportData.push(vehicleData);
        }
    
        for (const starshipUrl of this.starships) {
            const starshipData = await getData(starshipUrl);
            allTransportData.push(starshipData);
        }
    
        let mostExpensive = null;
        let highestPrice = -1;
        let unknownPriceCount = 0;
        let singleUnknownPriceTransport = null;
    
        for (const transport of allTransportData) {
            const price = parseFloat(transport.cost_in_credits);
            if (!isNaN(price) && price > highestPrice) {
                highestPrice = price;
                mostExpensive = transport;
            } else if (isNaN(price)) {
                unknownPriceCount++;
                singleUnknownPriceTransport = transport;
            }
        }
    
        if (mostExpensive === null && unknownPriceCount === 1) {
            return singleUnknownPriceTransport;
        }
    
        return mostExpensive;
    };    
}