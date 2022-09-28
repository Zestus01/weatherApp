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
    
    const inputForm = document.createElement('input');
    inputForm.className = 'mr-3';
    inputForm.placeholder = 'Enter your ZIP code';
    htmlBody.appendChild(inputForm);

    const zipBtn = document.createElement('button');
    zipBtn.textContent = 'Get the Weather';
    zipBtn.className = 'btn btn-success';
    zipBtn.addEventListener('click', () => {checkZip(inputForm.value)});
    htmlBody.appendChild(zipBtn);
    
}

function convertTemp(){
    state.weatherInfo.tempC = Math.round(state.weatherInfo.tempK - 273.15);
    state.weatherInfo.tempF = Math.round((state.weatherInfo.tempK  - 273.15) * (9/5) + 32);
}
function testPrint(){
    for(let char of state.weatherInfo){
        console.log(char);
    }
}
// IF the API fails its call
function errorZip(){
    alert('That zip code is invalid')
}

function checkZip(zip){
    if(isNaN(zip)){
        errorZip();
        return;
    }
    
    else if(zip > 99950 || zip < 9999) {
        errorZip();
        return;
    }
    getData(zip);
}

async function getData(zip){
    let url = state.API.replace('[ZIPCODE]', zip);
    try {
        const response = await axios.get(url);
        state.weatherInfo.humid = response.data.main.humidity;
        state.weatherInfo.descrtip = response.data.weather[0].description;
        state.weatherInfo.location = response.data.name;
        state.weatherInfo.tempK = response.data.main.temp;
        state.weatherInfo.img = response.data.weather[0].icon;
        convertTemp();
    } catch (error) {
        errorZip();
    }
    
}

function createImg(parent){
    let newImg = createElement('img');
    newImg.src = 'http://openweathermap.org/img/wn/' + state.weatherInfo.icon + '@2x.png';
    newImg.className = 'col-6 container border border-dark';
    parent.appendChild(newImg);
}

function createBox(text, parent){
    let newBox = createElement('div');
    newBox.className = 'container border border-dark col-6 mx-auto p-3  mb-3';
    newBox.textContent = text;
    parent.appendChild(newBox);
}

function createHead(text, parent){
    let newHead = createElement('div');
    newHead.className = 'border border-dark container-fluid bg-warning bg-gradient col-6 p-1  mt-3';
    newHead.textContent = text;
    parent.appendChild(newHead);
}

initPage();