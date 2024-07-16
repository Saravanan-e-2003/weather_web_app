let Temprature_text = document.querySelector("#Temp-txt");
let Description_text = document.querySelector("#desc-txt");
let url = "https://api.open-meteo.com/v1/forecast?latitude=11.0055&longitude=76.9661&current=temperature_2m,is_day,rain,showers,cloud_cover&timezone=auto&forecast_days=1";

console.log(url);

let getWeather = () => {
    let weather = async function(){
        let data = await fetch(url);
        let response = await data.json();
        let curent_Temperature = response.current.temperature_2m;
        console.log("Temperature:",curent_Temperature);
        displayWeather(curent_Temperature);
        CalcResult(response.current.rain,response.current.cloud_cover,response.current.showers,curent_Temperature);
    }
    weather()
    
}

function CalcResult(rain,cloud,showers,temp){
    let DescriptionTxt = "loading"
    if(rain != 0){
        DescriptionTxt = "Raining";
        displayCompleteWeather(DescriptionTxt,temp)
        return;
    }

    if(showers != 0){
        DescriptionTxt = "Drizzles";
        displayCompleteWeather(DescriptionTxt,temp)
        return;
    }

    if(cloud >= 60 && cloud <= 100){
        DescriptionTxt = "Cloudy";
        displayCompleteWeather(DescriptionTxt,temp)
        return;
    }else if(cloud < 60 && cloud >= 25){
        DescriptionTxt = "Partly Cloudy";
        displayCompleteWeather(DescriptionTxt,temp)
        return;
    }else if(cloud < 25){
        DescriptionTxt = "Clear";
        displayCompleteWeather(DescriptionTxt,temp)
    }
    
}


function displayCompleteWeather(D_text,temp){
    Temprature_text.innerHTML = temp+"°C";
    Description_text.innerHTML = D_text;
}


function displayWeather(t){
    Temprature_text.innerHTML = t+"°C";
    console.log("Weather Update to Html");
}

setInterval(getWeather(),1000);


// let Update = setInterval(getWeather(),1000);

// Update()