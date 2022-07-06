async function loadRepos() {
	const username = document.getElementById('username').value;
	const listElement = document.getElementById('repos');

	while (listElement.firstChild) {
		listElement.removeChild(listElement.firstChild);
	}
	try {
		const response = await fetch(`https://api.github.com/users/${username}/repos`)

		if (response.ok == false) {
			throw new Error(`${response.status} ${response.statusText}`);
		}
	
		const data = await response.json();
		data.forEach(({ full_name, html_url }) => {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.textContent = full_name;
			a.href = html_url;

			li.appendChild(a);
			listElement.appendChild(li);
		});
	} catch (error) {
		const newLi = document.createElement('li');
		newLi.textContent = `${error.message} (Not Found)`;
		listElement.appendChild(newLi);
	}
}