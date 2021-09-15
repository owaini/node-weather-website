

let form = document.querySelector('form');
let btn = document.querySelector('.btn');
let info = document.querySelector('.info')
let message = document.querySelector('.message');
let loaded = document.querySelector('.loaded');
// let city = document.querySelector('.city');

  
      form.addEventListener('submit', (e) => {
          e.preventDefault();
      let city = document.querySelector('.city').value;

          info.innerHTML = '';
        //   console.log(city)
        if(city === ' ' || city === undefined) {
            //  message.style.display = 'block';
             message.classList.add('active')
            message.textContent = "Unable to find location"
            setTimeout(() => {
               message.classList.remove('active')
                // message.style.display = 'none';
                message.textContent = ""
            },1800);
        } else {
           fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' +city + '.json?access_token=pk.eyJ1Ijoib3dpbmljb2RlciIsImEiOiJja3Q4bmQ1YXAxM3J5Mm5xbG41ZnJqcWx3In0.jgFkBrNxexwg22v_Jo1T3w').then(res => {
        res.json().then(data => {
            // console.log(data)
        if(data.error) {
            message.innerHTML = data.error;
        } else {
            let long = data.features[0].center[0];
        let lati = data.features[0].center[1];
        let locationCity = data.features[0].place_name.split(',')[0];
        let locationCountry = data.features[0].place_name.split(',')[2];
        let locationCountryOne = data.features[0].place_name.split(',')[1];
        console.log(locationCity.split(',')[0])
        
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lati +'&lon=' + long + '&units=metric&exclude=daily&appid=549317051a2cac3430ad7df652d3f716').then(res => {
            res.json().then(forecast => { 
              if(forecast.error) {
                  message.innerHTML = forecast.error;
              } else {
                //   console.log(forecast)
                  let temp = forecast.current.temp;
            let feels = forecast.current.feels_like;
            let humidity = forecast.current.humidity;
            let weather = forecast.current.weather[0].main;
            let descrip = forecast.current.weather[0].description;
            loaded.textContent = "loading..."
             setTimeout(() => {
                // message.style.display = 'none';
                loaded.textContent = ""
                info.innerHTML = `Tody in <span>${locationCity}</span> (<span>${locationCountry ? locationCountry : locationCountryOne ? locationCountryOne : locationCity  }</span>)
                The temprature is <span>${temp}</span>, but you feel like <span>${feels}</span> the weather mostly is <span>${descrip}</span> and you can feel humidity like <span>${humidity}%</span>`;
            },1800);
                                                          
              }
             }) // close forecast Fetch
          }) // close openweathermap fetch
         } // close else 
    
    
        }) // close res  gecoding Fetch
        

     
       }) // close gecoding Fetch
           document.querySelector('.city').value = '';
        }
     
      }) // close btn.listener
  

  