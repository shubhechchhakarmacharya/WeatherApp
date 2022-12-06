// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const weatherApi = {
    key: "008dd5393409b9877f81d78e5e80c166",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on Keypress 
searchInputBox.addEventListener('keypress', (event) => {
    //keycode is replaced by either key or code now. also used Enter instead of 13
    if(event.key == 'Enter'){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value)
    }

});


// Get Weather Report
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`)    //back tick (` `) and inverted comma (' ') is different and are called template literal
    .then(weather =>{
        return weather.json();
    }).then(showWeatherReport);
}


// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.round(weather.main.temp_min)}&deg;C (min) / ${Math.round(weather.main.temp_max)}&deg;C (max)`; // you also have to type exact same thing as in the html file to change the innerHTML 

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    
    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }
    else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('images/cloud.jpg')";
    }
    else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    }
    else if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }
    else if(weatherType.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    }
    else if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    }
}
// Date manage
function dateManage(dateArg){

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}