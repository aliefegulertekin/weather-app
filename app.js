const weatherDescription = document.querySelector('.weather-description');
const weatherPlace = document.querySelector('.place')
const weatherTemperature = document.querySelector('.temperature');
const temperatureSection = document.querySelector('.temperature-section');
const temperatureType = document.querySelector('.temperature-type');

const celsiusBtn = document.getElementById('celsius-button');
const fahrenheitBtn = document.getElementById('fahrenheit-button');
const kelvinBtn = document.getElementById('kelvin-button');


const apiKey = '';


const getUserLocation = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posData => {
     const lat = posData.coords.latitude;
     const long = posData.coords.longitude;
     
     getWeatherData(lat,long);
  })}};


  
async function getWeatherData(lat,long) {

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
  
  const response = await fetch(apiUrl);
  const data = await response.json();
  const {name} = data;
  const {temp} = data.main;
  const {icon} = data.weather[0];  
  const {description} = data.weather[0];

  createElementsToRender(name, temp, icon, description);

};

const createElementsToRender = (name, temp, icon, description) => {


  const placeAllInfos = document.createElement('div');
  const placeName = document.createElement('span');
  const placeTemp = document.createElement('span');
  const placeWeatherDesc = document.createElement('span');
  const weatherImg = document.createElement('img');


  placeAllInfos.classList.add('place-all-infos');
  placeTemp.textContent = Math.round(temp) + ' K°';
  placeTemp.classList.add('place-temp');
  placeTemp.id = 'kelvin';
  placeName.textContent = name;
  placeName.classList.add('place-name');
  placeWeatherDesc.textContent = description;
  placeWeatherDesc.classList.add('place-desc');
  
  weatherImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherImg.classList.add('place-img');

render(placeAllInfos, placeName, weatherImg, placeWeatherDesc, placeTemp);

};

const render = (placeAllInfos, placeName, weatherImg, placeWeatherDesc, placeTemp) => {
  const weatherSection = document.querySelector('.weather-section');

  placeAllInfos.append(placeName);
  placeAllInfos.append(weatherImg);
  placeAllInfos.append(placeWeatherDesc);
  placeAllInfos.append(placeTemp);

  weatherSection.append(placeAllInfos);

}


const calculateCelsius = () => {
  let currentDegree = document.querySelector('.place-temp');
  let degreeCelsius = 0;

  if(currentDegree.id === "celsius") {
    return;
  }

  if(currentDegree.id ==="kelvin") {
  degreeCelsius = parseInt(currentDegree.textContent) - 272;
  }
  else {
    degreeCelsius = Math.round((parseInt(currentDegree.textContent) - 32)/1.8);
  }
  currentDegree.textContent = degreeCelsius.toString() + " C°";
  currentDegree.id = 'celsius';
}


const calculateFahrenheit = () => {
  let currentDegree = document.querySelector('.place-temp');
  let degreeFahrenheit = 0;

  if(currentDegree.id === "fahrenheit") {
    return;
  }

  if(currentDegree.id === "celsius") {
    degreeFahrenheit = Math.round((parseInt(currentDegree.textContent) * 1.8) + 32);
  }
  else {

    degreeFahrenheit = Math.round(((parseInt(currentDegree.textContent) - 272) * 1.8) + 32);
  }
  currentDegree.textContent = degreeFahrenheit.toString() + " F°";
  currentDegree.id = 'fahrenheit';
}



const calculateKelvin = () => {
  let currentDegree = document.querySelector('.place-temp');
  let degreeKelvin = 0;

  if(currentDegree.id === "kelvin") {
    return;
  }

  if(currentDegree.id === "celsius") {
    degreeKelvin = Math.round(parseInt(currentDegree.textContent) + 272);
  }
  else {
    degreeKelvin = Math.round(((parseInt(currentDegree.textContent) -32) / 1.8) + 272);
  }
  currentDegree.textContent = degreeKelvin.toString() + " K°";
  currentDegree.id = 'kelvin';

}

celsiusBtn.addEventListener('click', calculateCelsius);
fahrenheitBtn.addEventListener('click', calculateFahrenheit);
kelvinBtn.addEventListener('click', calculateKelvin);

getUserLocation();