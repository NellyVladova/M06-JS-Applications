async function loadCommits() {
    // Try it with Fetch API
    const username = document.getElementById('username').value;
    const repository = document.getElementById('repo').value;
    const ul = document.getElementById('commits');
    const url = `https://api.github.com/repos/${username}/${repository}/commits`;

    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }

    try {
        const response = await fetch(url);

        if (response.ok == false) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        data.forEach(({ commit }) => {
            const newLi = document.createElement('li');
            newLi.textContent = `${commit.author.name}: ${commit.message}`;
            ul.appendChild(newLi);
        });
    } catch (error) {
        const li = document.createElement('li');
        li.textContent = `Error: ${error.message} (Not Found)`;
        ul.appendChild(li);
    }
}