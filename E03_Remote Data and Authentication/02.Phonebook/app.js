function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadPhones);
    document.getElementById('btnCreate').addEventListener('click', createContact);
}

const url = 'http://localhost:3030/jsonstore/phonebook';
const ulPhoneList = document.getElementById('phonebook');

async function createContact() {
    const personInputField = document.getElementById('person');
    const phoneInputField = document.getElementById('phone');

    if (!personInputField.value || !phoneInputField.value) {
        return;
    }
    try {
        const response = await fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person: personInputField.value.trim(),
                phone: phoneInputField.value.trim()
            })
        });
        const data = await response.json();

        if (response.status != 200) {
            throw new Error("Can't create new message!");
        }

    } catch (error) {
        alert(error.message);
    }

    personInputField.value = '';
    phoneInputField.value = '';

    loadPhones();
}

async function loadPhones() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error("Can't load information");
        }

        ulPhoneList.replaceChildren();

        Object.values(data).forEach(el => {
            const li = document.createElement('li');
            li.textContent = `${el.person}: ${el.phone}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";
            deleteBtn.setAttribute('id', el._id);
            deleteBtn.addEventListener('click', deleteContact);

            li.appendChild(deleteBtn);
            ulPhoneList.appendChild(li);

        });
    } catch (error) {
        alert(error.message);
    }
}

async function deleteContact(event) {
    const currentId = event.target.id;

    try {
        const response = await fetch(`${url}/${currentId}`, {
            method: "Delete"
        });

        const data = await response.json();

        loadPhones();

        return data;
    } catch (error) {
        alert(error.message);
    }
}

attachEvents();