function attachEvents() {
    const locationField = document.getElementById('location');
    const getWeatherBtn = document.getElementById('submit');
    const forecast = document.getElementById('forecast');
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');
    const label = document.querySelector('.label');
    let clickCount = 0;
    let errorCount = 0;

    getWeatherBtn.addEventListener('click', getWeather);

    async function getWeather() {
        try {
            const locationUrl = `http://localhost:3030/jsonstore/forecaster/today/${locationField.value}`;
            const locationResponse = await fetch(locationUrl);
            const locationData = await locationResponse.json();

            const upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationField.value}`;
            const upcomingResponse = await fetch(upcomingUrl);
            const upcomingData = await upcomingResponse.json();

            forecast.style.display = 'block';

            clickCount++;

            createCurrentWeather(locationData, clickCount);
            createUpcomingWeather(upcomingData, clickCount);

        } catch (error) {
            errorCount++;
            label.textContent = 'Error';
            forecast.style.display = '';
            upcoming.style.display = 'none';
            if(errorCount > 1){
                const toHide = Array.from(document.getElementsByClassName('forecasts'))[0];
                toHide.style.display = 'none';
            }
        }
    }

    function createCurrentWeather(data, click) {
        if(click > 1){
            const toRemove = Array.from(document.getElementsByClassName('forecasts'))[0];
            current.removeChild(toRemove);
        }
        if(errorCount > 0){
            label.textContent = 'Current conditions';
            forecast.style.display = '';
            upcoming.style.display = '';
        }
        
        const forecastDiv = createNewElement('div', '', 'forecasts');
        const conditionSymbol = createNewElement('span', getWeatherIcon(data.forecast.condition), 'condition symbol')
        const spanCondition = createNewElement('span', '', 'condition');
        const forecastDataOne = createNewElement('span', data.name, 'forecast-data');
        const forecastDataTwo = createNewElement('span', `${data.forecast.low}°/${data.forecast.high}°`, 'forecast-data');
        const forecastDataThree = createNewElement('span', data.forecast.condition, 'forecast-data');

        spanCondition.appendChild(forecastDataOne);
        spanCondition.appendChild(forecastDataTwo);
        spanCondition.appendChild(forecastDataThree);

        forecastDiv.appendChild(conditionSymbol);
        forecastDiv.appendChild(spanCondition);

        current.appendChild(forecastDiv);
    }

    function createUpcomingWeather(dataUpcoming, click) {
        if(click > 1){
            const toRemove = Array.from(document.getElementsByClassName('forecasts-info'))[0];
            upcoming.removeChild(toRemove);
        }
        const forecastDiv = createNewElement('div', '', 'forecasts-info');

        dataUpcoming.forecast.forEach(el => {
            const upcomingSpan = createNewElement('span', '', 'upcoming');
            const symbolSpan = createNewElement('span', getWeatherIcon(el.condition), 'symbol');
            const forecastSpan = createNewElement('span', `${el.low}°/${el.high}°`, 'forecast-data',);
            const wordSpan = createNewElement('span', el.condition, 'forecast-data');

            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(forecastSpan);
            upcomingSpan.appendChild(wordSpan);
            forecastDiv.appendChild(upcomingSpan);
        });

        upcoming.appendChild(forecastDiv);
    }

    function createNewElement(type, content, className) {
        const element = document.createElement(type);
        element.innerHTML = content;
        element.className = className;
        return element;
    }

    function getWeatherIcon(condition) {
        const types = {
            'Sunny': '&#x2600',
            'Partly sunny': '&#x26C5',
            'Overcast': '&#x2601',
            'Rain': '&#x2614',
            'Degrees': '&#176'
        };
        return types[condition];
    }
}

attachEvents();