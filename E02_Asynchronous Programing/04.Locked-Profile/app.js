async function lockedProfile() {
    const main = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    try {
        const response = await fetch(url);
        const data = await response.json();

        main.innerHTML = '';
        Object.values(data).forEach((el, index) => {
            const profile = createProfile(el, index);
            main.appendChild(profile);
        })
    } catch (error) {

    }

    main.addEventListener('click', (ev) => {
        if(ev.target.tagName !== "BUTTON"){
            return;
        }
        const profile = ev.target.parentElement;
        const [lockedElement] = profile.querySelectorAll('input');

        if(lockedElement.checked){
            return;
        }
        const hiddenDiv = profile.querySelector('#user1HiddenFields');

        if(hiddenDiv.style.display !== 'block'){
            hiddenDiv.style.display = 'block';
            ev.target.textContent = "Hide it";
        }else{
            hiddenDiv.style.display = "none";
            ev.target.textContent = "Show more";
        }
    });

    function createProfile(info, index){
        const div = document.createElement('div');
        div.classList.add('profile');
        div.innerHTML = `
                    <img src="./iconProfile2.png" class="userIcon" />
                    <label>Lock</label>
                    <input type="radio" name="user${index + 1}Locked" value="lock" checked>
                    <label>Unlock</label>
                    <input type="radio" name="user${index + 1}Locked" value="unlock"><br>
                    <hr>
                    <label>Username</label>
                    <input type="text" name="user1Username" value="${info.username}" disabled readonly />
                    <div id="user1HiddenFields">
                        <hr>
                        <label>Email:</label>
                        <input type="email" name="user${index + 1}Email" value="${info.email}" />
                        <label>Age:</label>
                        <input type="email" name="user${index + 1}Age" value="${info.age}"  />
                    </div>
                    <button>Show more</button>`
        return div;
    }
}