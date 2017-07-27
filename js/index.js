var temp = 0;
var cont = 0;

$(document).ready(function() {
    var lat = 0,
        long = 0;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            var text = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
            $.ajax({
                url: text,
                dataType: "jsonp",
                type: "GET",
                headers: {
                    'Api-User-Agent': 'Example/1.0'
                },
                success: function(data) {
                    //json weather
                    var sky = data.weather["0"].description;
                    var city = data.name;
                    var country = data.sys.country;
                    temp = data.main.temp;

                    $("#local").html(city + "," + country + " - " + sky);
                    $("#temp").html(temp);

                    if (temp < 20) {
                        $("body").css("background-image", "url(http://www.tempoagora.com.br/wp-content/uploads/2016/01/DA_Nevoeiro_Foto-DU_Amorim_27072015_001.jpg)");
                    } else if (temp > 30) {
                        $("body").css("background-image", "url(http://www.amestizarse.org/wp-content/uploads/2015/09/o-HOT-CITY-facebook.jpg)");
                    } else {
                        $("body").css("background-image", "url(https://www.wien.info/media/images/vienna-city-marathon-vcm-start-reichsbruecke-skyline-vienna-international-centre-sport-laufen-marathon-2015-19to1.jpeg)");
                    }
                }

            });
        });
    }
});

$("#escala").click(function() {
    cont++;
    if (cont % 2 == 1) {
        var fahr = Math.round((9 * temp) / 5 + 32);
        $("#temp").html(fahr);
        $("#escala").html("°F");
    } else {
        $("#temp").html(temp);
        $("#escala").html("°C");
    }
});