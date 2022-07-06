async function getInfo() {
    const submitBtn = document.getElementById('submit');
    const inputField = document.getElementById('stopId').value;
    const resultMessage = document.getElementById('stopName');
    const ulBuses = document.getElementById('buses');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputField}`;

    while (ulBuses.firstChild) {
        ulBuses.removeChild(ulBuses.firstChild);
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        const { name } = data;
        resultMessage.textContent = name;
        
        for (const [busId, time] of Object.entries(data.buses)) {
            ulBuses.appendChild(createNewElement(busId, time));
        }
    } catch (error) {
        resultMessage.textContent = "Error";
    }
    inputField = "";
}

function createNewElement(busId, time) {
    const newLi = document.createElement('li');
    newLi.textContent = `Bus ${busId} arrives in ${time} minutes`;
    return newLi;
}