const searchbtn = document.getElementById('Search-btn');
const inputel = document.getElementById('city-input');
const apikey = '632e0e202b7dd92dbdb39eeaecda916a'
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

searchbtn.addEventListener('click', () => {
  const cityName = inputel.value;
  console.log(cityName);
  inputel.value = '';
  if (cityName === '') {
    alert('Please Enter City Name');
  } 
  else {
    geocode(cityName);
  }
});

function geocode(getCity) {
  const reqUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${getCity}&limit=5&appid=${apikey}`
  fetch(reqUrl)
   .then(res => res.json())
   .then(data => {
      console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
      getcurrentweather(lat,lon);
      getforecast(lat,lon);
      
    })
}
function getcurrentweather(lat,long) {
  const reqUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}&units=imperial`
  fetch(reqUrl)
   .then(res => res.json())
   .then(data => {
      console.log(data);
      document.querySelector(".city").textContent = data.name
      document.querySelector(".temp").textContent= "Temp: "+ data.main.temp;
      document.querySelector(".icon").setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
      document.querySelector(".humidity").textContent= "Humidity: "+ data.main.humidity;
      document.querySelector(".wind").textContent= "Wind: "+ data.wind.speed;

    })
}
function getforecast(lat,long) {
  const reqUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apikey}&units=imperial`
  fetch(reqUrl)
   .then(res => res.json())
   .then(data => {
      console.log(data);
      document.querySelector(".forecast").innerHTML = "";
      for (let i = 0; i < data.list.length; i++) {
        const element = data.list[i];
        if (element.dt_txt.includes('12:00:00'))  {
         console.log(element);
         const template = `<div class="card col">
         <div class="card-body">
           <h5 class="card-title">${element.dt_txt.split(" ")[0]}</h5>
           <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}.png" alt="">
           <p class="card-text">Temp: ${element.main.temp}</p>
           <p class="card-text">Wind: ${element.wind.speed}</p>
           <p class="card-text">Humidity: ${element.main.humidity}</p>
           
         </div>
       </div>` 
      document.querySelector(".forecast").innerHTML += template; 
        }
      }

    })
}