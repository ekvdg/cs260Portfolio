document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=bc1c74f07ec4d5f9ec332c5c5bf5c044";
fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<p>Current Temperature: ' + json.main.temp + " &deg;F</p>"
      results += '<p>Temperature Low: ' + json.main.temp_min + " &deg;F</p>";
      results += '<p>Temperature High: ' + json.main.temp_max + " &deg;F</p>";
      results += "<p>"
      results += "<p>Pressure: " + json.main.pressure + " atm</p>";
      results += "<p>Humidity: " + json.main.humidity + "%</p>";
      for (let i=0; i < json.weather.length; i++) {
	       results += json.weather[i].description
	        if (i !== json.weather.length - 1)
	           results += ", "
        }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
  });
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=bc1c74f07ec4d5f9ec332c5c5bf5c044";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "";
      forecast += '<h2 style= "font-family:Major Mono Display">Forecast</h2>' + '<br>';
      for (let i=0; i < json.list.length; i++) {
        forecast += "<p>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "    ◦     Temperature: " + json.list[i].main.temp + "&deg;F    ◦     Humidity: " + json.list[i].main.humidity + "%         " + '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>' + "</p>";
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
