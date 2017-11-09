(function( $ ){

  $.fn.weather = function(cities, direction) {  

    function get_data(cityname, callback) {
      API = '822266192460701c81c153fe3876a2ab';
      var request_api = new XMLHttpRequest();
      request_api.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+ cityname + '&units=metric&APPID=' + API);
      request_api.onreadystatechange = function() {
        // alert(request_api.readyState + " " + request_api.status);
        if (request_api.readyState == 4 && request_api.status == "200") {
          var resp = request_api.responseText;
          callback(resp);
        }
      }
      request_api.send(null);
    }
    var ttest = 0;

    function init(cityname) {
      var city = cityname;
      function callback(response) {
        var actual_JSON = JSON.parse(response);
        city_temp = actual_JSON.main.temp;
        document.querySelector('#'+cityname).innerHTML += '<p>Weather in ' + city + ' ' + city_temp + ' by the way.</p>';
      }
      get_data(city, callback);
    }

    var settings = {
      'cities': ['Moscow', 'New York', 'Tokyo', 'Novosibirsk', 'Madrid', 'Berlin', 'London'],
      'direction' : direction === undefined ? 'up' : direction
    };
    if (cities !== undefined) {
      var arr = Array.prototype.slice.call(cities);
      arr.forEach(function(city) {
        settings.cities.push(city);
      });
    }
    return this.each(function() {
      document.body.innerHTML += '<p id="storage"></p>'
      for (var key = 0; key < settings.cities.length; key ++) {
        var re =  new RegExp(settings.cities[key], 'i');
        var temp_array = Array.prototype.slice.call($('li'));
        console.log(settings.cities[key]);
        for (var i = 0; i < temp_array.length; i++) {
          var to_str = temp_array[i].innerHTML;
          if (to_str.search(re) !== -1) {
            temp_array[i].id = settings.cities[key];
            temp_array[i].addEventListener('click', function(event) {
              $(this).animate({
                height: 'hide',
              }, 1500, function() {
                var result = init((this).id);
                if (settings.direction === 'up') {
                  $(this).hide().insertBefore($('ul>li')[0]);
                } else {
                  $('ul').append($(this));
                }
                $(this).css({'fontSize': '14px'}).show(1500);
              });
            });
          };
        }
      }
    });

  };
})( jQuery );