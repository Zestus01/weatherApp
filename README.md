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


## Functions

### convertTemp (temp)
#### &emsp; Take the temp and display the conerted temps in Kelvin, Fareheight, and Celsius
#### &emsp; Kelvin to celsius: Celsius - 273.15 = K
#### &emsp; Celsius to Faren: (C * 9/5) + 32 = F

### displayPage
#### &emsp; Gets called if the fetch data was successful
#### &emsp; Sets up the appended sections
#### &emsp; Create the city block, pass the textConent from the zip code info
#### &emsp; City block will be a container
#### &emsp; Create the temeprature block calls the convertTemp function to get the inner text
#### &emsp; display the condition block, fills the innerHTML with the condition
#### &emsp; Display the other info block. Create an img section and set the src to the data from the api call
#### &emsp; I can break this function up to each section on the wire frame

### fetchData (api key)
#### &emsp; Uses axios to fetch the given info
#### &emsp; returns the JSON object from the API
#### &emsp;
#### &emsp; Check if the api doesn't work, and pop up an alert if it doesnt, calls errorZip

### getData 
#### &emsp; Will be called when the get weather button gets clicked
#### &emsp; Parses the zip code from the text box
#### &emsp; Calls fetchData
#### &emsp; 

### errorZip 
#### &emsp; gets called if the zip code did not return any info from the api call 
#### &emsp; Displays an error message in the block section

### initPage
#### &emsp; Runs at the beginning of startup
#### &emsp; Checks for API connection, if connection fails display an error(calls errorZip)
#### &emsp; Appends the header(Weather APP)
#### &emsp; Appends the inputForm box and button(Get Weather)
