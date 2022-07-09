const url = 'http://localhost:3030/jsonstore/collections/students';

const studentsTable = document.querySelector('#results tbody');
const inputForm = document.querySelector('form');
const submitBtn = document.getElementById('submit');

window.addEventListener('load', loadStudents);
submitBtn.addEventListener('click', addNewStudent);

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
            studentsTable.appendChild(newStudent);
        })
    } catch (error) {
        alert(error.message);
    }
}

async function addNewStudent(event) {
    event.preventDefault();

    const formData = new FormData(inputForm);
    const studentInfo = [...formData.values()];

    studentsTable.replaceChildren();

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
                grade: Number(studentInfo[3].trim())
            })
        });

        if (response.status != 200) {
            throw new Error("Can't create new student record!");
        }

        removeContent();
        loadStudents();
    } catch (error) {
        alert(error.message);
    }
}

function createNewElement(type, ...content) {
    const newEl = document.createElement(type);

    content.forEach(el => {
        if (typeof el === 'number' || typeof el == 'string') {
            el = document.createTextNode(el);
        }
        newEl.appendChild(el);
    })

    return newEl;
}

function removeContent(){
    const inputParent = document.querySelector('.inputs');
    inputParent.childNodes.forEach(child => {
        child.value = '';
    })
}
