const url = 'http://localhost:3030/users/login';

const loginForm = document.getElementById('login');

const homeBtn = document.getElementById('home');
homeBtn.href = "javascript:void(0)";

const logOut = document.getElementById('logout');
logOut.style.display = 'none';

loginForm.addEventListener('submit', loginUser);

async function loginUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email.trim() || !password.trim()) {
        alert('All fields should be filled!');
        return;
    }

    try {
        const response = await fetch(url, {
            method: "Post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.status != 200) {
            const error = await response.json();
            throw new Error(`ERROR: ${error.message}`);
        }

        const data = await response.json();

        sessionStorage.setItem('userData', JSON.stringify({
            token: data.accessToken,
            _id: data._id
        }));

        location.pathname = 'src/app.js';
    } catch (err) {
        alert(err.message);
    }
}
