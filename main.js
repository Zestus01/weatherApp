const htmlBody = document.getElementById('main');
const state = {
    API: 'https://api.openweathermap.org/data/2.5/weather?zip=[ZIPCODE],us&appid=0df3bd48560ad03c51a4637c5db0548e',
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
    topRow.appendChild(inputForm);

    const zipBtn = document.createElement('button');
    zipBtn.textContent = 'Get the Weather';
    zipBtn.className = 'col-4 col-sm-2 btn btn-success';
    zipBtn.addEventListener('click', () => {checkZip(inputForm.value)});
    topRow.appendChild(zipBtn);
    
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
// function errorZip(){
//     alert('That zip code is invalid')
// }

function checkZip(zip){
    if(isNaN(zip)){
        // errorZip();
        removePage();
        return;
    }
    
    else if(zip > 99950 || zip < 9999) {
        // errorZip();
        removePage();
        return;
    }
    getData(zip);
}

async function getData(zip){
    let url = state.API.replace('[ZIPCODE]', zip);
    console.log(zip, state.API);
    try {
        console.log('got here');
        const response = await axios.get(url);
        state.weatherInfo.humid = response.data.main.humidity;
        state.weatherInfo.descrtip = response.data.weather[0].description;
        state.weatherInfo.location = response.data.name;
        state.weatherInfo.tempK = Math.round(response.data.main.temp);
        state.weatherInfo.img = response.data.weather[0].icon;
        convertTemp();
        updatePage();
    } catch (error) {
        removePage();
        // errorZip();
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
}

function removePage(){
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
    htmlBody.appendChild(errorCard);
    createHead('ERROR', errorCard);
    createBox('INVALID ZIP CODE', errorCard);
}
initPage();