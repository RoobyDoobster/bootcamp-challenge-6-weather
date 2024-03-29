var APIKey = "e43c3c7d2f56fa863a8662495e69a308";
var APIRootUrl = 'https://api.openweathermap.org';

var searchHistory=[];

var header = document.querySelector('.header');
var search = document.querySelector('.search');
var searchForm = document.querySelector('.searchForm');
var searchInput = document.querySelector('.searchInput');
var searchButton = document.querySelector('.searchButton');
var fiveDay = document.querySelector('.fiveDay');
var todayResults = document.querySelector('.todayResults');
var history = document.querySelector('.history');
var searchCity = document.querySelector('#city');

function getCityCoordinates(city) {
    var requestURL = `${APIRootUrl}/data/2.5/weather?q=${city}&limit=1&appid=${APIKey}&units=imperial`;
    fetch(requestURL)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        getFiveDay(data.coord.lat, data.coord.lon);
        getCurrWeather(data.coord.lat, data.coord.lon);
    });
}

function getCurrWeather(lat, lon) {
    currWeatherURL = `${APIRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    
    fetch(currWeatherURL)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        var temp0 = document.getElementById('temp0');
        var wind0 = document.getElementById('wind0');
        var hum0 = document.getElementById('hum0');

        temp0[0].textContent = (`temp: ${data.main.temp} F°`);
        wind0[0].textContent = (`wind: ${data.wind.speed} mph`);
        hum0[0].textContent = (`humidity: ${data.main.humidity}%`);
    })
}

function getFiveDay(lat, lon) {
    weatherURL = `${APIRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`

    fetch(weatherURL)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        var temp1 = document.getElementById('temp1');
        var wind1 = document.getElementById('wind1');
        var hum1 = document.getElementById('hum1');
        var temp2 = document.getElementById('temp2');
        var wind2 = document.getElementById('wind2');
        var hum2 = document.getElementById('hum2');
        var temp3 = document.getElementById('temp3');
        var wind3 = document.getElementById('wind3');
        var hum3 = document.getElementById('hum3');
        var temp4 = document.getElementById('temp4');
        var wind4 = document.getElementById('wind4');
        var hum4 = document.getElementById('hum4');
        var temp5 = document.getElementById('temp5');
        var wind5 = document.getElementById('wind5');
        var hum5 = document.getElementById('hum5');
        
        // var icon1 = document.getElementById('img1');
        // var icon2 = document.getElementById('img2');
        // var icon3 = document.getElementById('img3');
        // var icon4 = document.getElementById('img4');
        // var icon5 = document.getElementById('img5');
        
        temp1.textContent = (`temp: ${data.list[1].main.temp} F°`);
        wind1.textContent = (`wind: ${data.list[1].wind.speed} mph`);
        hum1.textContent = (`humidity: ${data.list[1].main.humidity}%`);
        temp2.textContent = (`temp: ${data.list[2].main.temp} F°`);
        wind2.textContent = (`wind: ${data.list[2].wind.speed} mph`);
        hum2.textContent = (`humidity: ${data.list[2].main.humidity}%`);
        temp3.textContent = (`temp: ${data.list[3].main.temp} F°`);
        wind3.textContent = (`wind: ${data.list[3].wind.speed} mph`);
        hum3.textContent = (`humidity: ${data.list[3].main.humidity}%`);
        temp4.textContent = (`temp: ${data.list[4].main.temp} F°`);
        wind4.textContent = (`wind: ${data.list[4].wind.speed} mph`);
        hum4.textContent = (`humidity: ${data.list[4].main.humidity}%`);
        temp5.textContent = (`temp: ${data.list[5].main.temp} F°`);
        wind5.textContent = (`wind: ${data.list[5].wind.speed} mph`);
        hum5.textContent = (`humidity: ${data.list[5].main.humidity}%`);

        // icon1[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`)
        // icon2[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[10].weather[0].icon}@2x.png`)
        // icon3[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[18].weather[0].icon}@2x.png`)
        // icon4[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[26].weather[0].icon}@2x.png`)
        // icon5[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[34].weather[0].icon}@2x.png`)
    })
}

function setHistory(city) {
    lastSearch = {
        lastCity: city
    }
    localStorage.setItem('lastSearch', JSON.stringify(lastSearch))
};

function getHistory() {
    var lastCitySearch = JSON.parse(localStorage.getItem("lastSearch"))
    if(lastCitySearch.lastCity !== '') {
        history.append(`<button class="last-search">${lastCitySearch.lastCity}</button>`)
        var lastSearchBtn = $('.last-search')
        for(let i = 0; i < lastSearchBtn.length; i++) {
            lastSearchBtn[i].addeventListener('click', (e) => {
                e.preventDefault()
                var preCity = lastSearchBtn[i].textContent
                getCityCoordinates(preCity)
                getDay(preCity)
                setLastSearch(preCity)
            })
        }
    }
}

function getDay(city) {
    var date = dayjs().format(`MM/DD/YYYY`);
    var currDay = todayResults;
    currDay[0].textContent = `${city} ${date}`
    
    var nextFiveDays = $('h4');
    for(let i = 0; i < nextFiveDays.length; i++) {
        nextFiveDays[i]. textContent = dayjs().add([i], 'day')
    }
};

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getCityCoordinates(searchCity.value.toUpperCase());
    getDay(searchCity.value.toUpperCase());
    getHistory(searchCity.value.toUpperCase());
    getHistory();
});

function init() {
    getHistory()
}

init() 