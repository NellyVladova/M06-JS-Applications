const url = 'http://localhost:3030/users/register';

const registerForm = document.getElementById('register');

const homeBtn = document.getElementById('home');
homeBtn.href = "javascript:void(0)";

const welcomeMessage = document.querySelector('.email');
welcomeMessage.style.display = 'none';

const logOut = document.getElementById('logout');
logOut.style.display = 'none';

registerForm.addEventListener('submit', registerUser);

async function registerUser(event){
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if(!email.trim() || !password.trim()){
        alert("All fields should be filled!");
        return;
    }

    if(password.trim() != rePass.trim()){
        alert("Passwords doesn't match!");
        return;
    }

    try{
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

        if(response.status != 200){
            const error = await response.json();
            throw new Error(`ERROR: ${error.message}`);
        }

        const data = await response.json();

        sessionStorage.setItem('userData', JSON.stringify({
            token: data.accessToken,
            _id: data._id
        }));

        window.location.pathname = "src/index.html";
    }catch(error){
        alert(error.message);
    }
}
