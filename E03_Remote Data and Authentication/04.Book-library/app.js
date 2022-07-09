
const url = 'http://localhost:3030/jsonstore/collections/books';

const loadBtn = document.getElementById('loadBooks');
const submitBtn = document.querySelector('form button');
const inputFields = document.querySelectorAll('form input');
const bookTable = document.querySelector('tbody');

loadBtn.addEventListener('click', loadAllBooks);
submitBtn.addEventListener('click', addNewBook);

async function loadAllBooks() {
    bookTable.replaceChildren();

    const response = await fetch(url);

    if (response.status != 200) {
        throw new Error("Can't fetch data!");
    }

    const data = await response.json();

    Object.entries(data).forEach(([id, book]) => {
        bookTable.appendChild(createNewBook(id, book));
    });
}

async function addNewBook(event) {
    event.preventDefault();

    const inputValues = getInputFieldsValues();
    const title = inputValues.title;
    const author = inputValues.author;

    if (!title.trim() || !author.trim()) {
        return;
    }

    const response = await fetch(url, {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({
            title,
            author
        })
    });

    clearInputFields();
    loadAllBooks();
}

function createNewBook(id, { author, title }) {
    const bookTr = document.createElement('tr');
    bookTr.id = id;

    const authorName = createNewElement('td', author);
    const titleName = createNewElement('td', title);
    const actionTd = createNewElement('td', '');

    const editBtn = createNewElement('button', 'Edit');
    const deleteBtn = createNewElement('button', 'Delete');

    editBtn.addEventListener('click', editBook);
    deleteBtn.addEventListener('click', deleteBook);

    actionTd.appendChild(editBtn);
    actionTd.appendChild(deleteBtn);

    bookTr.appendChild(authorName);
    bookTr.appendChild(titleName);
    bookTr.appendChild(actionTd);

    return bookTr;
}

async function editBook(ev) {
    deleteBook(ev);

    const bookId = ev.target.parentElement.parentElement.id;

    const response = await fetch(`${url}/${bookId}`);
    const data = await response.json();

    const { author, title } = data;

    inputFields[0].value = author;
    inputFields[1].value = title;

    const values = getInputFieldsValues();

    if (!values.title.trim() || !values.author.trim()) {
        return;
    }

    fetch(`${url}/${bookId}`, {
        method: 'Put',
        'Content-Type': 'application/json',
        body: JSON.stringify({
            author: values.author,
            title: values.title
        })
    });
}

async function deleteBook(event) {
    const bookId = event.target.parentElement.parentElement.id;

    await fetch(`${url}/${bookId}`, {
        method: 'Delete'
    })

    loadAllBooks();
}

function createNewElement(type, content) {
    const newEl = document.createElement(type);
    newEl.textContent = content;

    return newEl;
}

function clearInputFields() {
    inputFields.forEach(field => field.value = '');
}

function getInputFieldsValues() {
    const author = inputFields[0].value;
    const title = inputFields[1].value;

    return {
        title,
        author
    }
}

