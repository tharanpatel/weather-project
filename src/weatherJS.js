// API call to fetch data and convert into JSON format
let weather = {
    apiKey: "tharansApiKey",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    // Assigning JSON data to constants that are used for describing the weather
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description, main } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,description,temp)

        document.querySelector("#city-name").innerText = name;
        document.querySelector("#temperature").innerText = temp.toFixed(0) + " °C";
        document.querySelector(".icon").src = "http://openweathermap.org/img/w/" + icon + ".png";
        document.querySelector("#weather-conditions").innerText = description;
        document.querySelector("#humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector("#wind").innerText = "Wind speed: " + speed.toFixed(1) + " km/h";

        // Makes central information square visible once a city is chosen by removing "loading" from central-square loading class
        document.querySelector(".central-square").classList.remove("loading");

        // Changing website body background according to the weather

        if (main == "Clouds") {
            document.body.style.backgroundImage = "url('https://cdnb.artstation.com/p/assets/images/images/047/080/829/original/hayder-baker-pixel-study.gif?1646716831')";
        }
        else if (main == "Rain") {
            document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/aa/e4/c3/aae4c393d72470bdbc5937794ba3f359.gif')";
        }
        else if (main == "Snow") {
            document.body.style.backgroundImage = "url('https://i.redd.it/1qef4ifjn8881.gif')";
        }
        else if (main == "Rain") {
            document.body.style.backgroundImage = "url('https://64.media.tumblr.com/414d798e5e6739044df92ed867986b71/tumblr_n2vbgr1Con1siyfm9o1_500.gifv')";
        }
        else if (main == "Clear") {
            document.body.style.backgroundImage = "url('https://wallpapersmug.com/download/2560x1440/3b3e80/clear-sky-sky-blue-stars-8k.jpg')";
        }
        else if (main == "Haze") {
            document.body.style.backgroundImage = "url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/city-haze-tom-shropshire.jpg')";
        }

    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// Submits search if search button is pressed
document.querySelector(".search button")
    .addEventListener("click", function () {
    weather.search();
});


// Submits search if enter key is pressed
document.querySelector(".search-bar")
    .addEventListener("keypress", function (e) {
        if (e.key === 'Enter') {
            weather.search();
        }
    });
