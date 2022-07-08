function attachEvents() {
    document.getElementById('submit').addEventListener('click', addMessage);
    document.getElementById('refresh').addEventListener('click', refreshMessages);


}

const url = 'http://localhost:3030/jsonstore/messenger';

async function addMessage() {
    const authorName = document.querySelector('[name="author"]');
    const messageContent = document.querySelector('[name="content"]');

    if (!authorName.value || !messageContent.value) {
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: authorName.value.trim(),
                content: messageContent.value.trim()
            })
        });
        const data = await response.json();

        if (response.status != 200) {
            throw new Error("Can't create new message!");
        }
    } catch (error) {
        alert(error.message);
    }

    authorName.value = '';
    messageContent.value = '';

    refreshMessages();
}

async function refreshMessages() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error("Can't load information");
        }

        const messageArea = document.getElementById('messages');
        let comments = [];
        Object.values(data).forEach(el => comments.push(`${el.author}: ${el.content}`));
        messageArea.value = comments.join('\n');

    } catch (err) {
        alert(err.message);
    }
}

attachEvents();