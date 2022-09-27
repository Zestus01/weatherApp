# weatherApp
### Need to appendChild and removeChild html elements
### Use Javascript to display the whole project
### Fetch data from an api 
### Have a button that "runs" the fetch data
### 

## Variables
### API Key
#### &emsp; Will be hardcode, key is generated from openweather.com
#### &emsp; Given to fetchData

### zipCode
#### &emsp; Will be input by the user in a text box
#### &emsp; Changes the displayed info to match the zip code

### weatherInfo
#### &emsp; Will be the parsed data given from the api fetch
#### &emsp; Parse the data by the values to append the info
#### &emsp; Properties
#### &emsp; &emsp; weatherInfo.temp = API data in kelvin|||| API.main[temp] or API.main[1];
#### &emsp; &emsp; weatherInfo.humid = API.main.humidty or main[5]
#### &emsp; &emsp; weatherInfo.name = API.name
#### &emsp; &emsp; weatherInfo.descript = API.weather[description] or API.weather[2];
#### &emsp; &emsp; weatherInfo.img = API.weather.icon [3]

## Functions

### convertTemp (temp)
#### &emsp; temp is given in kelvin
#### &emsp; Take the temp and display the conerted temps in Kelvin, Fareheight, and Celsius
#### &emsp; Kelvin to celsius: K - 273.15 = C
#### &emsp; Celsius to Faren: (K - 273.15) * 9/5) + 32 = F

### displayPage
#### &emsp; Gets called if the fetch data was successful
#### &emsp; Sets up the appended sections
#### &emsp; createElementByID
#### &emsp; Create the city block, pass the textConent from the zip code info
#### &emsp; City block will be a container
#### &emsp; Create the temeprature block calls the convertTemp function to get the inner text
#### &emsp; display the condition block, fills the innerHTML with the condition
#### &emsp; Display the other info block. Create an img section and set the src to the data from the api call
#### &emsp; I can break this function up to each section on the wire frame

### fetchData (Zipcode ,api key)
#### &emsp; 0df3bd48560ad03c51a4637c5db0548e the API Key
#### &emsp; 0df3bd48560ad03c51a4637c5db0548e
#### &emsp; If the API fails the call then the zip code is invalid 
#### &emsp; Uses axios to fetch the given info
#### &emsp; returns the JSON object from the API
#### &emsp; Doesn't parse the data into fields, just parses the data into something manipulatable
#### &emsp; If the data is difficult to parse in the display function then parse it here and pass it to global variables 
#### &emsp; Check if the api doesn't work, and pop up an alert if it doesnt, calls errorZip

### getData 
#### &emsp; Will be called when the get weather button gets clicked
#### &emsp; Checks the inputed zip code is valid number 5 digits long
#### &emsp; To check for number, Number(input) and check for undefined, 
#### &emsp; Parses the zip code from the text box
#### &emsp; Calls fetchData
#### &emsp; 

### errorZip 
#### &emsp; gets called if the zip code did not return any info from the api call 
#### &emsp; Displays an error message in the block section
#### &emsp; Removes the HTML elements of the side and displays 

### initPage
#### &emsp; Runs at the beginning of startup
#### &emsp; Checks for API connection, if connection fails display an error(calls errorZip)
#### &emsp; Appends the header(Weather APP)
#### &emsp; Appends the inputForm box and button(Get Weather)


### parseData (JSON Object)
#### &emsp; given the data object from the data
#### data.name = City Name
#### data.weather[description] or [2] = condition
#### data.main.temp = temperature in Kelvin
#### data.weather.icon or data.weather[3] = Other Info
#### data.wind.(deg and speed) Gives the degree in relation from North, 270 is going west