const htmlBody = document.getElementById('main');
// State is an object that holds API and eventaully the weather Data
const state = {
    APIKEY: "0df3bd48560ad03c51a4637c5db0548e",
    zipUrl: "https://api.openweathermap.org/data/2.5/weather?zip=[ZIPCODE],us&appid=",
    locURL: "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=",
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

// Loads the page and hard codes the header/buttons
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
    // For if the user wants to input the zip code to get weather
    const zipBtn = document.createElement('button');
    zipBtn.textContent = 'Get the Weather';
    zipBtn.className = 'col-4 col-sm-2 btn btn-success';
    // zipBtn.addEventListener('click', checkZip(inputForm.value);
    zipBtn.addEventListener('click', () => {checkZip(inputForm.value)});
    topRow.appendChild(zipBtn);
    // Location button
    const locBtn = document.createElement('button');
    locBtn.textContent = 'Use my location';
    locBtn.className = 'col-4 col-sm-2 btn btn-success';
    //  locBtn.addEventListener('click', useLoc); 
    locBtn.addEventListener('click', () => {useLoc()});
    topRow.appendChild(locBtn);
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Use saved ZIP';
    saveBtn.className = 'col-4 col-sm-2 btn btn-success';
    saveBtn.addEventListener('click', () => {parseSaved(dropDown.value)});
    topRow.appendChild(saveBtn);
    
    const dropDown = document.createElement('select')
    dropDown.id = 'dropDown';
    dropDown.textContent = 'Saved ZIP Codes';
    dropDown.className = 'form-select col-8'
    dropDown.placeholder = 'Saved ZIP codes';
    topRow.appendChild(dropDown);
    appendSaved();
}

// Parses the saved zip code and slices off the city and passes to get data.
function parseSaved(saved){
    let newStr = saved.slice(saved.indexOf(': ') + 2);
    getData(newStr, false);

}

// Converts the temperature from Kelvin to the other ones
function convertTemp(){
    state.weatherInfo.tempC = Math.round(state.weatherInfo.tempK - 273.15);
    state.weatherInfo.tempF = Math.round((state.weatherInfo.tempK  - 273.15) * (9/5) + 32);
}

// Runs at the init of the page and appends the saved the zip codes to the drop down.
function appendSaved(){
    let dropDown = document.getElementById('dropDown');
    for(let i = 0; i < localStorage.length; i++){
        let option = document.createElement('option');
        option.value = localStorage.getItem('city' + i);
        option.text = localStorage.getItem('city' + i);
        dropDown.appendChild(option);
    }
} 

// if the Location button gets clicked starts the chain of checks for that
function useLoc(){
    if(!navigator.geolocation){
        errorPage('GEOLOCATION NOT AVAILABLE');
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

// If it fails to get the geolocation
function error(){
    errorPage('LOCATION NOT SUPPORTED');
}

// If geolocation is successfull parses the latitude and longitutde and passes it to the dataloc
function success(position){
    let coords = position.coords;
    getDataLoc(coords);
}

// Checks the zip code if a valid zip code. This allows some basic checks to avoid API calls
function checkZip(zip){

    if(isNaN(zip) && zip > 99950 && zip < 9999){
        errorPage('INVALID ZIP');
        return;
    }
    getData(zip, true);
}

// Gets the data from the API using ZIP code
async function getData(zip, bool){
    let url = state.zipUrl.replace('[ZIPCODE]', zip);
    url = url + state.APIKEY;
    try {
        const response = await axios.get(url);
        parseData(response);
        if(bool){
            localStorage.setItem('city' + localStorage.length, state.weatherInfo.location + ': ' + zip);
            let option = document.createElement('option');
            option.value = state.weatherInfo.location + ': ' + zip;
            option.text = state.weatherInfo.location + ': ' + zip;
            dropDown.appendChild(option);
        }
        convertTemp();
        updatePage();
    } catch (error) {
        errorPage('INVALID ZIP');
    }
}

// Gets Data from the API using geolocation
async function getDataLoc(position){
    let url = state.locURL.replace('{lat}', position.latitude)
    url = url.replace('{lon}', position.longitude);
    url = url + state.APIKEY;
    try {
        const response = await axios.get(url);
        parseData(response);
        convertTemp();
        updatePage();
    } catch (error) {
        errorPage('LOCATION NOT SUPPORTED');
    }
}

function parseData(response){
    state.weatherInfo.humid = response.data.main.humidity;
    state.weatherInfo.descrtip = response.data.weather[0].description;
    state.weatherInfo.location = response.data.name;
    state.weatherInfo.tempK = Math.round(response.data.main.temp);
    state.weatherInfo.img = response.data.weather[0].icon;
}

// Appends the html boxes under temperature and sets the particular style
function addTemp(text, parent){
    let newTemp = document.createElement('div');
    newTemp.className = 'border border-dark col-4'
    newTemp.textContent = text;
    parent.appendChild(newTemp);
}

// Appends the image to the bottom of the page
function createImg(text, parent){
    let newImg = document.createElement('img');
    newImg.src = `http://openweathermap.org/img/wn/${text}@4x.png`;
    newImg.className = 'col-6 container img-fluid border border-dark';
    parent.appendChild(newImg);
}

// Creates the "text" box and sets the content. Don't need to worry about id except for temp box
function createBox(text, parent, id = null){
    let newBox = document.createElement('div');
    newBox.className = 'container d-flex border border-dark justify-content-center col-6 p-2 mb-3';
    if(text != null){
        newBox.textContent = text;
    }
    newBox.id = id;
    parent.appendChild(newBox);
}

// Creates the header and adds the text to the box
function createHead(text, parent){
    let newHead = document.createElement('div');
    newHead.className = 'border border-dark container-fluid bg-warning bg-gradient col-6 p-1  mt-3';
    newHead.textContent = text;
    parent.appendChild(newHead);
}

function updatePage(){
    // Checking if any content is loaded in the "Weather" section and removes it
    deletePage();
    // Creates the card and runs through the elements and appends them.
    let card = document.createElement('div');
    card.className = 'card d-flex justify-content-center text-center mt-3';
    card.id = 'card';
    htmlBody.appendChild(card);
    createHead('City', card);
    createBox(state.weatherInfo.location, card);
    createHead('Temperature', card);
    createBox(null, card, 'tempBox');
    addTemp(state.weatherInfo.tempK + ' K', tempBox);
    addTemp(state.weatherInfo.tempF + ' F', tempBox);
    addTemp(state.weatherInfo.tempC + ' C', tempBox);
    createHead('Condition', card);
    createBox(state.weatherInfo.descrtip, card);
    createHead('Image', card);
    createImg(state.weatherInfo.img, card);
    editBack(state.weatherInfo.img);
}

// Will be called if the API calls fail, ZIP is invalid, or geolocation failure
function errorPage(errorMsg){
    // Checks if any cards are in the DOM and removes them
    deletePage();
    // Creates the error card and puts it on the page
    let errorCard = document.createElement('div');
    errorCard.className = 'card d-flex justify-content-center text-center mt-3'
    errorCard.id = 'errorCard';
    htmlBody.style = '';
    form.style = '';
    htmlBody.appendChild(errorCard);
    createHead('ERROR', errorCard);
    createBox(errorMsg, errorCard);
}

function deletePage(){
    let dele = document.getElementById('card');
    if(dele != null){
        dele.remove();
    }
    dele = document.getElementById('errorCard');
    if(dele != null){
        dele.remove();
    }
}

// Changes the color the background to a certain color based on the icon
// And Yes I just learned about gradients, GRAPHIC DESIGN IS MY PASSION MEME
function editBack(condition){
    if(document.getElementById('card') != null){
        card = document.getElementById('card');
    }
    let style;
    let form = document.getElementById('form');
    switch(condition){
        case '01d': 
        case '01n': 
            style = 'background: radial-gradient(#87CEFA, #7FFFD4)';
            break;
        case '02d':
        case '02n':
            style = 'background: radial-gradient(#00BFFF, #2F4F4F)';
            break;
        case '03d':
        case '03n':
            style = 'background: radial-gradient(#808080, #E6E6FA)';
            break;
        case '04d':
        case '04n':
            style = 'background: radial-gradient(#778899, #696969)';
            break;
        case '09d':
        case '09n':
            style = 'background: radial-gradient(#0000CD, #7B68EE)';
            break;
        case '10d':
        case '10n':
            style = 'background: radial-gradient(#4682B4, #4169E1)';
            break;
        case '11d':
        case '11n':
            style = 'background: radial-gradient(#000080, #708090)';
            break;
        case '13d':
        case '13n':
            style = 'background-color: #FFFAFA';
            break;
        case '50d':
        case '50n':
            style = 'background: radial-gradient(#B0C4DE, #40E0D0)';
            break;
    }
    htmlBody.style = style;
    card.style = style;
    form.style = style;
}

// Initialize the page and sets up the header 
initPage();