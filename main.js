const htmlBody = document.getElementById('main');
const state = {
    API: 'https://api.openweathermap.org/data/2.5/weather?zip=[ZIPCODE],us&appid=0df3bd48560ad03c51a4637c5db0548e',
    weatherInfo : {
        tempK: 0,
        location: '',
        descrtip: '',
        img: '',
        tempF: 84,
        tempC: 32,
        humid: 42,

    }
}

function initPage(){
    const titleText = document.createElement('h1');
    titleText.textContent = 'Weather APP!!!!!';
    titleText.className = 'text-primary';
    htmlBody.appendChild(titleText);
    const titleSub = document.createElement('p');
    titleSub.textContent = 'Enter your zip code please';
    htmlBody.appendChild(titleSub);
    const zipBtn = document.createElement('button');
    zipBtn.textContent = 'Get the Weather';
    zipBtn.className = 'btn btn-success';
    htmlBody.appendChild(zipBtn);
}

function converTemp(){
    state.weatherInfo.tempC = Math.round(state.weatherInfo.tempK - 273.15);
    state.weatherInfo.tempF = Math.round((state.weatherInfo.tempK  - 273.15) * (9/5) + 32);
}

// IF the API fails its call
function errorZip(){

}


initPage();