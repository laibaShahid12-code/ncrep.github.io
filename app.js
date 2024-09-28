//register js
function validateUsername() {
    let text = document.querySelector("#text").value;
    let regex = /^[a-zA-Z]{3,12}$/;
    if (text === "") {
        document.getElementById("validation1").innerHTML = "Please fill out this field.";
        document.getElementById("validation1").style.color = "red";
    } else if (text.length < 3) {
        document.getElementById("validation1").innerHTML = "Username must be at least 3 characters long.";
        document.getElementById("validation1").style.color = "red";
    } else if (!/^[a-zA-Z]+$/.test(text)) {
        document.getElementById("validation1").innerHTML = "Numbers are not allowed in username.";
        document.getElementById("validation1").style.color = "red";
    } else if (!regex.test(text)) {
        document.getElementById("validation1").innerHTML = "Username must be 3-12 characters long and contain only letters.";
        document.getElementById("validation1").style.color = "red";
    } else {
        document.getElementById("validation1").innerHTML = "";
    }
}

function validateEmail() {
    let email = document.querySelector("#email").value;
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        document.getElementById("validation2").innerHTML = "Please enter a valid email address.";
        document.getElementById("validation2").style.color = "red";
    } else {
        document.getElementById("validation2").innerHTML = "";
    }
}

function validatePassword() {
    let password = document.querySelector("#password").value;
    let lengthRegex = /^.{6,}$/;
    let fullRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (password === "") {
        document.getElementById("validation3").innerHTML = "Please fill out this field.";
        document.getElementById("validation3").style.color = "red";
    } else if (!lengthRegex.test(password)) {
        document.getElementById("validation3").innerHTML = "Password must be at least 6 characters long.";
        document.getElementById("validation3").style.color = "red";
    } else if (!fullRegex.test(password)) {
        document.getElementById("validation3").innerHTML = "Password must include a special character, a number, an uppercase letter, and a lowercase letter.";
        document.getElementById("validation3").style.color = "red";
    } else {
        document.getElementById("validation3").innerHTML = "";
    }
}

function validatePhone() {
    let phone = document.querySelector("#tel").value;
    let regex = /^\d{11}$/;
    if (!regex.test(phone)) {
        document.getElementById("validation4").innerHTML = "Phone number must be exactly 11 digits.";
        document.getElementById("validation4").style.color = "red";
    } else {
        document.getElementById("validation4").innerHTML = "";
    }
}

function validateAll() {
    validateUsername();
    validateEmail();
    validatePassword();
    validatePhone();
}

function register() {
    validateAll();

    if (document.getElementById("validation1").innerHTML === "" &&
        document.getElementById("validation2").innerHTML === "" &&
        document.getElementById("validation3").innerHTML === "" &&
        document.getElementById("validation4").innerHTML === "") {
        let text = document.querySelector("#text").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let phone = document.querySelector("#tel").value;

        localStorage.setItem("username", text);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("phone", phone);
        location.assign("login.html");
    }
}

//login js
function validateUsername() {
    let text = document.querySelector("#text").value;
    if (text === "") {
        document.getElementById("validation5").innerHTML = "Please fill out this field";
        document.getElementById("validation5").style.color = "red";
    } else {
        document.getElementById("validation5").innerHTML = "";
    }
}

function validatePassword() {
    let password = document.querySelector("#password").value;
    if (password === "") {
        document.getElementById("validation6").innerHTML = "Please fill out this field";
        document.getElementById("validation6").style.color = "red";
    } else {
        document.getElementById("validation6").innerHTML = "";
    }
}

function validateAll() {
    validateUsername();
    validatePassword();
}

function login() {
    let text = document.querySelector("#text").value;
    let password = document.querySelector("#password").value;
    let gettext = localStorage.getItem('username');
    let getpassword = localStorage.getItem('password');

    validateAll();

    if (document.getElementById("validation5").innerHTML === "" &&
        document.getElementById("validation6").innerHTML === "") {
        if (text !== gettext) {
            document.getElementById("validation5").innerHTML = "Incorrect Username";
            document.getElementById("validation5").style.color = "red";
        } else if (password !== getpassword) {
            document.getElementById("validation6").innerHTML = "Incorrect Password";
            document.getElementById("validation6").style.color = "red";
        } else {
            window.location.href = "dashboard.html";
        }
    }
}

//dashboard js
let gettext = localStorage.getItem('username');
let dashboard = document.querySelector("#name");

if (dashboard) {
    dashboard.innerHTML = gettext;
}

console.log(gettext);
console.log(dashboard);

function logout() {
    alert("Logout");
    location.assign("login.html");
}

function removeAcc() {
    localStorage.clear();
    alert("Account removed");
    window.location.href = "Register.html";
}




document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const redirectAction = localStorage.getItem('redirectAction');
    if (isLoggedIn === 'true') {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        document.getElementById('userName').textContent = currentUser.username;
        document.getElementById('accountText').textContent = currentUser.username;
        document.getElementById('userAccount').setAttribute('onclick', 'toggleProfileOffcanvas()');

        if (currentUser.profileImage) {
            document.getElementById('profileImage').src = currentUser.profileImage;
        }



    } else {
        document.getElementById('userAccount').setAttribute('onclick', 'redirectToLogin()');
    }
});

function redirectToLogin() {
    window.location.href = 'login.html';

    if (localStorage.getItem('redirectAction')) {
        localStorage.removeItem('redirectAction');
    }

}

function toggleProfileOffcanvas() {
    const profileOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasProfile'));
    profileOffcanvas.toggle();
}

function updateProfileImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profileImage').src = e.target.result;
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.profileImage = e.target.result;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = users.map(user => {
                if (user.username === currentUser.username) {
                    return currentUser;
                }
                return user;
            });
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        };
        reader.readAsDataURL(file);
    }
}

function logout() {
    Swal.fire({
        title: "Logout Successfully!",
        text: "Your account has been Logout successfully!",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
    }).then(() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('activeUserType');
        location.assign('index.html');
    });

}



function removeAccount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Filter out the current user from the users array
    const updatedUsers = users.filter(user => user.username !== currentUser.username);

    // Update the users list in localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Show confirmation that the account has been removed
    Swal.fire({
        title: "Account removed!",
        text: "Your account has been successfully deleted.",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
    }).then(() => {
        // Clear login information from localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');

        // Redirect to index page
        window.location.href = 'index.html';
    });
}








