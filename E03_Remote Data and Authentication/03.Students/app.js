const url = 'http://localhost:3030/jsonstore/collections/students';
const infoTable = document.querySelector('#result tbody');
const formInput = document.querySelector('form');

window.addEventListener('load', loadStudents);
document.getElementById('submit').addEventListener('click', addNewStudent);

async function addNewStudent(event) {
    event.preventDefault();

    const formData = new FormData(formInput);
    const studentInfo = [...formData.values];

    infoTable.replaceChildren();

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: studentInfo[0],
                lastName: studentInfo[1],
                facultyNumber: studentInfo[2],
                grade: Number(studentInfo[3])
            })
        });

        if (response.status != 200) {
            throw new Error("Can't create new student!");
        }

        loadStudents();
    } catch (error) {
        alert(error.message);
    }
}

async function loadStudents() {
    try {
        const response = await fetch(url);

        if (response.status != 200) {
            throw new Error("Can't fetch data!");
        }
        const data = await response.json();

        Object.values(data).forEach(el => {
            const newStudent = createNewElement('tr',
                createNewElement('td', el.firstName),
                createNewElement('td', el.lastName),
                createNewElement('td', el.facultyNumber),
                createNewElement('td', el.grade)
            );

            infoTable.appendChild(newStudent);
        });

        loadStudents();
    } catch (error) {
        alert(error.message);
    }
}

function createNewElement(type, ...content) {
    const newEl = document.createElement(type);

    content.forEach(el => {
        if (typeof el == 'string' || typeof el === 'number') {
            el = document.createTextNode(el);
        }

        newEl.appendChild(el);
    })

    return newEl;
}
