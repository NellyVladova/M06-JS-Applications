async function solution() {
    const main = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const res = await fetch(url);
    const data = await res.json();

    data.forEach(el => {
        const newElement = createArticle(el);
        main.appendChild(newElement);
    });

    function createArticle({ _id, title }) {
        const accordionDiv = createNewElement('div', 'accordion', '');
        const headDiv = createNewElement('div', 'head', '');
        const titleSpan = createNewElement('span', '', title);
        const moreButton = createNewElement('button', 'button', 'More');
        const extraDiv = createNewElement('div', 'extra', '');
        extraDiv.style.display = 'none';
        const paragraph = createNewElement('p', '', '');
        moreButton.id = _id;
    
        headDiv.append(titleSpan, moreButton);
        extraDiv.appendChild(paragraph);
        accordionDiv.append(headDiv, extraDiv);
    
        moreButton.addEventListener('click', async () => {
            if (extraDiv.style.display == 'none') {
                const urlElement = `http://localhost:3030/jsonstore/advanced/articles/details/${_id}`;
                const elementResponse = await fetch(urlElement);
                const elementData = await elementResponse.json();
    
                moreButton.textContent = 'Less';
                extraDiv.style.display = 'block';
                paragraph.textContent = elementData.content;
            } else {
                moreButton.textContent = 'More';
                extraDiv.style.display = 'none';
            }
        });
    
        return accordionDiv;
    }
    
    function createNewElement(type, className, content) {
        const newEl = document.createElement(type);
        newEl.className = className;
        newEl.textContent = content;
    
        return newEl;
    }
}

solution();