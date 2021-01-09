const tempDegree = document.querySelector('.temp-degree');
const tempFeelLike = document.querySelector('.temp-feel-like');
const wind = document.querySelector('.wind');
const humidityParams = document.querySelector('.humidity');
const descriptionWeather = document.querySelector('.description-weather');
const select = document.querySelector('select');


const API_CITIES = 'https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json'

window.onload = () => {
  const getCities = () => {
    const init = async() => {
      const response = await fetch(API_CITIES);
      const result = await response.json();
      return result;
    }
    init().then(result => result[0].regions.map((regions)=>{
      const cities = regions.cities;
         return cities.map((city) => {
          const { name } = city; 
          const option = document.createElement('option'); 
          option.innerText = name;
          option.value = name;
          select.appendChild(option);      
        })
    }))
  };
  getCities();
}

select.addEventListener('change', () => {
  const currentValue = select.value;
  getWeather(currentValue)
})


const getWeather = (city) => {
  const init = async() => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=4a5d3515f0b920a967996ab0598bfcf3&units=metric`)
    const data = await response.json();
    return data;
    }
    init().then(showWeather)
};

const showWeather = (data) => {
  const {temp, feels_like, humidity, weather} = data.main;
  const windSpeed = data.wind.speed;
  tempDegree.innerText = `Температура воздуха: ${Math.floor(temp)} C`;
  tempFeelLike.innerText = `Ощущается: ${Math.floor(feels_like)} C`;
  wind.innerText = `Ветер: ${Math.floor(windSpeed)} м/с`;
  humidityParams.innerText = `Влажность: ${humidity} %`;
  };


