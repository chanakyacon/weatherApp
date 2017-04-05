var wData;
$(document).ready(function() {
  getCoords();
  $('#unitBtn').click(function() {
    //alert("btn click");
    if (document.getElementById('tempUnit').innerHTML === "C") {
      $('#tempUnit').html("F");
      $('#temp').html(Math.floor(wData.main.temp * (9 / 5) + 32) + "&deg;");
    } else {
      $('#temp').html(wData.main.temp + "&deg;");
      $('#tempUnit').html("C");
    }
  });

});

function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      var lat = pos.coords.latitude;
      var lon = pos.coords.longitude;
      $('#currLoc').html("Latitude: " + lat + "&deg; " + "Longitude: " + lon + "&deg;");

      // API key for OpenWeatherMap
      var APPID = "3c0f24b0c277e381b0f2b701dea88d91";
      var wAPI = 'http://api.openweathermap.org/data/2.5/weather' + '?lat=' + lat + '&lon=' + lon + '&units=metric' + '&APPID=' + APPID;
      //console.log(wAPI);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          //weather contains the response as an object
          wData = JSON.parse(xhr.responseText);
          // get Vital Info
          //console.log(wData);
          $('#city').html(wData.name + ', ' + wData.sys.country);
          $('#temp').html("Temp " + Math.floor(wData.main.temp) + "&deg;");

          $('#tempUnit').html("C"); // metric unit called by default

          $('#humid').html("Humidity " + wData.main.humidity);
          $('#humidUnit').html("%");

          $('#description').html(wData.weather[0].description);

          // show Icon depending on weather stat
          var iconStr = "wi wi-owm-" + wData.weather[0].id;

          // add the class attribute to icon
          $('#icon').attr("class", iconStr);

        } // if for xhr ends

      }; // onreadystatechange ends

      xhr.open("GET", wAPI, true);
      xhr.send();

    }); // getCurrentPosition ends
  } // main if block ends
} // getCoords ends
