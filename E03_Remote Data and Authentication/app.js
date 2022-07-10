//Correct

const url = 'http://localhost:3030/data/catches';

const loginA = document.getElementById('login');
loginA.href = 'src/login.html';

const registerA = document.getElementById('register');
registerA.href = 'src/register.html';

const logOutA = document.getElementById('logout');
logOutA.style.display = 'none';

const main = document.querySelector('main');
main.style.display = 'none';

const loginView = document.getElementById('login-view');
loginView.style.display = 'none';

const registerView = document.getElementById('register-view');
registerView.style.display = 'none';

const homeView = document.getElementById('home-view');

const homeMainTable = document.getElementById('main');
homeMainTable.style.display = 'none';

const loadBtn = document.querySelector('.load');
loadBtn.addEventListener('click', async () => {
    homeMainTable.style.display = '';

    const allCatchesDiv = document.getElementById('catches');

    allCatchesDiv.replaceChildren();

    try {
        const response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status != 200) {
            throw new Error("Can't fetch data!");
        }

        const data = await response.json();

        Object.values(data).forEach(el => {
            allCatchesDiv.appendChild(createNewCatchElement(el));
        })
    } catch (error) {
        alert(error.message);
    }
})

function createNewCatchElement({angler, weight, species, location, bait, captureTime}){
    const newCatchDiv = createNewElementWithContent('div', '');
    newCatchDiv.classList.add('catch');

    const anglerLabel = createNewElementWithContent('label', 'Angler');
    const anglerInput = createNewElementWithValue('input', angler);

    const wieghtLabel = createNewElementWithContent('label', 'Weight');
    const weightInput = createNewElementWithValue('input', weight);

    const speciesLabel = createNewElementWithContent('label', 'Species');
    const speciesInput = createNewElementWithValue('input', species);

    const locationLabel = createNewElementWithContent('label', 'Location');
    const locationInput = createNewElementWithValue('input', location);

    const baitLabel = createNewElementWithContent('label', "Bait");
    const baitInput = createNewElementWithValue('input', bait);

    const captureTimeLabel = createNewElementWithContent('label', "Capture Time");
    const captureTimeInput = createNewElementWithValue('input', captureTime);

    const updateBtn = createNewElementWithContent('button', "UPDATE");
    const deleteBtn = createNewElementWithContent('button', "DELETE");

    updateBtn.setAttribute('disabled', '');
    deleteBtn.setAttribute('disabled', '');

    newCatchDiv.appendChild(anglerLabel);
    newCatchDiv.appendChild(anglerInput);
    
    newCatchDiv.appendChild(wieghtLabel);
    newCatchDiv.appendChild(weightInput);

    newCatchDiv.appendChild(speciesLabel);
    newCatchDiv.appendChild(speciesInput);

    newCatchDiv.appendChild(locationLabel);
    newCatchDiv.appendChild(locationInput);

    newCatchDiv.appendChild(baitLabel);
    newCatchDiv.appendChild(baitInput);

    newCatchDiv.appendChild(captureTimeLabel);
    newCatchDiv.appendChild(captureTimeInput);

    newCatchDiv.appendChild(updateBtn);
    newCatchDiv.appendChild(deleteBtn);

    return newCatchDiv;
}

function createNewElementWithContent(type, content){
    const newEl = document.createElement(type);
    newEl.textContent = content;

    return newEl;
}
function createNewElementWithValue(type, value){
    const newEl = document.createElement(type);
    newEl.value = value;

    return newEl;
}
