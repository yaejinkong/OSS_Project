const apiKey = "02b49f3f0bfb423b6ec8846c057d4ba4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const apiUrl_dust = "http://api.openweathermap.org/data/2.5/air_pollution?"; //lat={lat}&lon={lon}&appid={API key}
// 37이상 나쁨
// 구현해야 할 것 : 엔터키로 넘어가게 하기, 그냥 서치 눌렀을 때 에러 페이지(안넘어가게)

const searchBox = document.querySelector("#searchBox");  
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const main = document.querySelector('#main');
const result = document.querySelector('#result');

let lat_ = null;
let lon_ = null;

function begin(){
    main.style.animation="fadeOut 1s";
    setTimeout(() => {
        result.style.animation="fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";  //display 꺼줌
            result.style.display = "block";  //display 켜줌
        }, 450)
    }, 450);
}

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display= "block";
        document.querySelector(".weather").style.display= "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        lat_ = data.coord.lat;
        lon_ = data.coord.lon;

        const response_dust = await fetch(apiUrl_dust + "lat=" + lat_ + "&lon=" + lon_ + "&appid=" + apiKey);
        console.log(response_dust.json());

        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "./image/clouds.png";
        }
        else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "./image/clear.png";
        }
        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "./image/rain.png";
        }
        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./image/drizzle.png";
        }
        else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "./image/mist.png";
        }

        todayClothes(data);


        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display= "none";

    }
}

searchBtn.addEventListener("click", ()=>{
    begin();
    checkWeather(searchBox.value);
})

function doaction(){
    main.style.animation="fadeIn 1s";
    setTimeout(() => {
        result.style.animation="fadeOut 1s";
        setTimeout(() => {
            main.style.display = "block";  //display 꺼줌
            result.style.display = "none";  //display 켜줌
        }, 450)
    }, 450);
}