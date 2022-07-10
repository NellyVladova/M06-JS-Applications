//In Progress...
//url
const url = 'http://localhost:3030/data/catches';

//load button and load functionality
const loadBtn = document.getElementsByClassName('load')[0];
loadBtn.addEventListener('click', loadAllCatches);

//get table with all catches
const allCatchesDiv = document.getElementById('catches');

async function loadAllCatches() {
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

        Object.entries(data).forEach(el => {
            allCatchesDiv.appendChild(createNewCatchElement(el));
        })
    } catch (error) {
        alert(error.message);
    }
}

//add form and add functionality
const addForm = document.getElementById('addForm');
addForm.addEventListener('submit', addNewCatch);

async function addNewCatch(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const angler = formData.get('angler');
    const weight = formData.get('weight');
    const species = formData.get('species');
    const location = formData.get('location');
    const bait = formData.get('bait');
    const captureTime = formData.get('captureTime');

    if (!angler.trim() || !weight.trim() || !species.trim() || !location.trim() || !bait.trim() || !captureTime.trim()) {
        alert("All fields should be filled!");
        return;
    }

    const catchesUrl = "http://localhost:3030/data/catches";

    try {
        const response = await fetch(catchesUrl, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            })
        });

        if (response.status != 200) {
            throw new Error("Can't create new catch!")
        }
    } catch (error) {
        alert(error.message);
    }

    clearInputFields(formData);
    loadAllCatches();
}

//clear input Fields
function clearInputFields(form){
    form.forEach(field => field.value = '');
}

//creating new catch
function createNewCatchElement(input){
    const newCatchDiv = createNewElementWithContent('div', '');
    newCatchDiv.classList.add('catch');

    const anglerLabel = createNewElementWithContent('label', 'Angler');
    const anglerInput = createNewElementWithValue('input', input.angler);

    const wieghtLabel = createNewElementWithContent('label', 'Weight');
    const weightInput = createNewElementWithValue('input', input.weight);

    const speciesLabel = createNewElementWithContent('label', 'Species');
    const speciesInput = createNewElementWithValue('input', input.species);

    const locationLabel = createNewElementWithContent('label', 'Location');
    const locationInput = createNewElementWithValue('input', input.location);

    const baitLabel = createNewElementWithContent('label', "Bait");
    const baitInput = createNewElementWithValue('input', input.bait);

    const captureTimeLabel = createNewElementWithContent('label', "Capture Time");
    const captureTimeInput = createNewElementWithValue('input', input.captureTime);

    const updateBtn = createNewElementWithContent('button', "UPDATE");
    const deleteBtn = createNewElementWithContent('button', "DELETE");

    updateBtn.addEventListener('click', updateCatch);
    deleteBtn.addEventListener('click', deleteCatch);

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

//update existing catch
function updateCatch(){
    //Implementation...
}

//delete existing catch
function deleteCatch(){
    //Implementation...
}

//creating new element
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
