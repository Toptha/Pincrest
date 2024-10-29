const signinBtn = document.querySelector('.signinBtn');
const signupBtn = document.querySelector('.signupBtn');
const formBx = document.querySelector('.formBx');
const body = document.querySelector('body');

// Toggle between sign in and sign up forms
signupBtn.onclick = function() {
    formBx.classList.add('active');
    body.classList.add('active');
}

signinBtn.onclick = function() {
    formBx.classList.remove('active');
    body.classList.remove('active');
}

// Get form elements
const signinForm = document.querySelector('.signinForm');
const signupForm = document.querySelector('.signupForm');

signinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(validateSigninForm()) {
        const formData = new FormData();
        formData.append('username', this.querySelector('[name="username"]').value.trim());
        formData.append('password', this.querySelector('[name="password"]').value.trim());

        fetch('login.php', {
            method: 'POST',
            body: formData,
            credentials: 'include' // Important: Include credentials for session cookies
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                localStorage.setItem('username', data.username);
                // Force page reload to ensure session is recognized
                window.location.replace('index.html');
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login');
        });
    }
});

// Sign up form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(validateSignupForm()) {
        const formData = new FormData();
        formData.append('username', this.querySelector('[name="username"]').value.trim());
        formData.append('email', this.querySelector('[name="email"]').value.trim());
        formData.append('password', this.querySelector('[name="password"]').value.trim());

        fetch('sign.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if(data.includes("Error")) {
                alert(data);
            } else {
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during signup');
        });
    }
});

function validateSigninForm() {
    const form = document.querySelector('.signinForm');
    const username = form.querySelector('[name="username"]').value.trim();
    const password = form.querySelector('[name="password"]').value.trim();
    let isValid = true;

    // Username validation
    if(username === '') {
        document.getElementById('signinUsernameError').textContent = 'Username is required';
        isValid = false;
    } else {
        document.getElementById('signinUsernameError').textContent = '';
    }

    // Password validation
    if(password === '') {
        document.getElementById('signinPasswordError').textContent = 'Password is required';
        isValid = false;
    } else {
        document.getElementById('signinPasswordError').textContent = '';
    }

    return isValid;
}

function validateSignupForm() {
    const form = document.querySelector('.signupForm');
    const username = form.querySelector('[name="username"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const password = form.querySelector('[name="password"]').value.trim();
    const confirmPassword = form.querySelector('[name="confirm_password"]').value.trim();
    let isValid = true;

    // Username validation
    if(username === '') {
        document.getElementById('signupUsernameError').textContent = 'Username is required';
        isValid = false;
    } else if(username.length < 3) {
        document.getElementById('signupUsernameError').textContent = 'Username must be at least 3 characters';
        isValid = false;
    } else {
        document.getElementById('signupUsernameError').textContent = '';
    }

    // Email validation
    if(email === '') {
        document.getElementById('signupEmailError').textContent = 'Email is required';
        isValid = false;
    } else if(!isValidEmail(email)) {
        document.getElementById('signupEmailError').textContent = 'Invalid email format';
        isValid = false;
    } else {
        document.getElementById('signupEmailError').textContent = '';
    }

    // Password validation
    if(password === '') {
        document.getElementById('signupPasswordError').textContent = 'Password is required';
        isValid = false;
    } else if(password.length < 6) {
        document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    } else {
        document.getElementById('signupPasswordError').textContent = '';
    }

    // Confirm password validation
    if(confirmPassword === '') {
        document.getElementById('signupConfirmPasswordError').textContent = 'Please confirm your password';
        isValid = false;
    } else if(confirmPassword !== password) {
        document.getElementById('signupConfirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    } else {
        document.getElementById('signupConfirmPasswordError').textContent = '';
    }

    return isValid;
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Check login status function
function checkLoginStatus() {
    fetch('check_session.php')
        .then(response => response.text())
        .then(data => {
            if(data === 'logged_in') {
                document.querySelector('.login-btn').textContent = 'Account ▾';
            }
        })
        .catch(error => console.error('Error:', error));
}

// Call checkLoginStatus when page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);