const htmlBody = document.getElementById('main');
const state = {
    API: 'https://api.openweathermap.org/data/2.5/weather?zip=[ZIPCODE],us&appid=0df3bd48560ad03c51a4637c5db0548e',
    APIloc: 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=0df3bd48560ad03c51a4637c5db0548e',
    weatherInfo : {
        tempK: 0,
        location: '',
        descrtip: '',
        img: '',
        tempF: -321,
        tempC: -12,
        humid: -123,
    }
}

function initPage(){
    let top = document.createElement('div');
    top.id = 'top';
    top.className = 'container-fluid justify-content-center text-center';
    htmlBody.appendChild(top);
    
    let topRow = document.createElement('div');
    topRow.className = 'row d-flex justify-content-center text-align-center p-4'
    top.appendChild(topRow);
    const titleText = document.createElement('h1');
    titleText.textContent = 'Weather APP!';
    titleText.className = 'text-primary pb-2';
    topRow.appendChild(titleText);

    const titleSub = document.createElement('p');
    titleSub.textContent = 'Enter your zip code please';
    topRow.appendChild(titleSub);
    
    const inputForm = document.createElement('input');
    inputForm.className = 'col-8 col-sm-4';
    inputForm.placeholder = 'Enter your ZIP code';
    inputForm.id = 'form';
    topRow.appendChild(inputForm);

    const zipBtn = document.createElement('button');
    zipBtn.textContent = 'Get the Weather';
    zipBtn.className = 'col-4 col-sm-2 btn btn-success';
    zipBtn.addEventListener('click', () => {checkZip(inputForm.value)});
    topRow.appendChild(zipBtn);
    
    const locBtn = document.createElement('button');
    locBtn.textContent = 'Use my location';
    locBtn.className = 'col-4 col-sm-2 btn btn-success';
    locBtn.addEventListener('click', () => {useLoc()});
    topRow.appendChild(locBtn);
    
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

function useLoc(){
    if(!navigator.geolocation){
        removePage();
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

function error(){
    removePage('LOCATION NOT SUPPORTED');
}

function success(position){
    let coords = position.coords;
    getDataLoc(coords);
}

function checkZip(zip){
    if(isNaN(zip)){
        
        removePage('INVALID ZIP');
        return;
    }
    
    else if(zip > 99950 || zip < 9999) {
        
        removePage('INVALID ZIP');
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
        state.weatherInfo.tempK = Math.round(response.data.main.temp);
        state.weatherInfo.img = response.data.weather[0].icon;
        convertTemp();
        updatePage();
    } catch (error) {
        removePage('INVALID ZIP');
    }
}

async function getDataLoc(position){
    let url = state.APIloc.replace('{lat}', position.latitude)
    url = url.replace('{lon}', position.longitude);
    try {
        const response = await axios.get(url);
        state.weatherInfo.humid = response.data.main.humidity;
        state.weatherInfo.descrtip = response.data.weather[0].description;
        state.weatherInfo.location = response.data.name;
        state.weatherInfo.tempK = Math.round(response.data.main.temp);
        state.weatherInfo.img = response.data.weather[0].icon;
        convertTemp();
        updatePage();
    } catch (error) {
        removePage('LOCATION NOT SUPPORTED');
    }
}

function addTemp(text, parent){
    let newTemp = document.createElement('div');
    newTemp.className = 'border border-dark col-4'
    newTemp.textContent = text;
    parent.appendChild(newTemp);
}

function createImg(text, parent){
    let newImg = document.createElement('img');
    newImg.src = 'http://openweathermap.org/img/wn/' + text + '@2x.png';
    newImg.className = 'col-6 container border border-dark';
    parent.appendChild(newImg);
}

function createBox(text, parent, id = null){
    let newBox = document.createElement('div');
    newBox.className = 'container d-flex border border-dark justify-content-center col-6 p-2 mb-3';
    if(text != null){
        newBox.textContent = text;
    }
    if(id != null){
        newBox.id = id;
    }
    parent.appendChild(newBox);
}

function createHead(text, parent){
    let newHead = document.createElement('div');
    newHead.className = 'border border-dark container-fluid bg-warning bg-gradient col-6 p-1  mt-3';
    newHead.textContent = text;
    parent.appendChild(newHead);
}

function updatePage(){
    let dele = document.getElementById('errorCard');
    if(dele != null){
        dele.remove();
    }
    dele = document.getElementById('card');
    if(dele != null){
        dele.remove();
    }
    let card = document.createElement('div');
    card.className = 'card d-flex justify-content-center text-center mt-3';
    card.id = 'card';
    htmlBody.appendChild(card);
    createHead('City', card);
    createBox(state.weatherInfo.location, card);
    createHead('Temperature', card);
    createBox(null, card, 'tempBox');
    addTemp(state.weatherInfo.tempK + 'K', tempBox);
    addTemp(state.weatherInfo.tempF + 'F', tempBox);
    addTemp(state.weatherInfo.tempC + 'C', tempBox);
    createHead('Condition', card);
    createBox(state.weatherInfo.descrtip, card);
    createHead('Image', card);
    createImg(state.weatherInfo.img, card);
    editBack(state.weatherInfo.img);
}

function removePage(errorMsg){
    let dele = document.getElementById('card');
    if(dele != null){
        dele.remove();
    }
    dele = document.getElementById('errorCard');
    if(dele != null){
        dele.remove();
    }
    let errorCard = document.createElement('div');
    errorCard.className = 'card d-flex justify-content-center text-center mt-3'
    errorCard.id = 'errorCard';
    htmlBody.style = '';
    form.style = '';
    htmlBody.appendChild(errorCard);
    createHead('ERROR', errorCard);
    createBox(errorMsg, errorCard);
}
function editBack(condition){
    if(document.getElementById('card') != null){
       card = document.getElementById('card');
    }
    form = document.getElementById('form');
    if(condition === '01d' || condition === '01n'){
        htmlBody.style = 'background-color: #87CEFA';
        card.style = 'background-color: #87CEFA';
        form.style = 'background-color: #87CEFA';
    }
    if(condition === '02d' || condition === '02n'){
        htmlBody.style = 'background-color: #D3D3D3';
        card.style = 'background-color: #D3D3D3';
        form.style = 'background-color: #D3D3D3';
    }
    if(condition === '03d' || condition === '03n'){
        htmlBody.style = 'background-color: #696969';
        card.style = 'background-color: #696969';
        form.style = 'background-color: #696969';
    }
    if(condition === '04d' || condition === '04n'){
        htmlBody.style = 'background-color: #778899';
        card.style = 'background-color: #778899';
        form.style = 'background-color: #778899';
    }
    if(condition === '09d' || condition === '09n') {
        htmlBody.style = 'background-color: #20B2AA';
        card.style = 'background-color: #20B2AA';
        form.style = 'background-color: #20B2AA';
    }
    if(condition === '10d' || condition === '10n') {
        htmlBody.style = 'background-color: #4682B4';
        card.style = 'background-color: #4682B4';
        form.style = 'background-color: #4682B4';
    }
    if(condition === '11d' || condition === '11n') {
        htmlBody.style = 'background-color: #000080';
        card.style = 'background-color: #000080';
        form.style = 'background-color: #000080';
    }
    if(condition === '13d' || condition === '13n') {
        htmlBody.style = 'background-color: #FFFAFA';
        card.style = 'background-color: #FFFAFA';
        form.style = 'background-color: #FFFAFA';
    }
    if(condition === '50d' || condition === '50n'){
        htmlBody.style = 'background-color: #B0C4DE';
        card.style = 'background-color: #B0C4DE';
        form.style = 'background-color: #B0C4DE';
    }
}

initPage();