const cityname = process.argv[2];
const city = cityname.toLowerCase() ;

function getWeather(city) {
    if (city == "london") {
        return "The weather in London is cloudy with a chance of rain.";
    }
    if (city == "newyork") {
        return "The weather in New York is sunny with a high of 75°F.";
    }
    else {
        return " city not found";
    }
}

console.log(getWeather(city));
