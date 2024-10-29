document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const togglePassword = document.getElementById('togglePassword');
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (username.value.length < 3) {
            showError('Username must be at least 3 characters long');
            return;
        }
        if (!isValidEmail(email.value)) {
            showError('Please enter a valid email address');
            return;
        }
        if (password.value.length < 8) {
            showError('Password must be at least 8 characters long');
            return;
        }
        this.submit();
    });
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️‍🗨️' : '🔒';
    });
    password.addEventListener('mouseover', function() {
        showTooltip('Password should contain at least one uppercase letter, one lowercase letter, a number, a special character, and be at least 8 characters long.');
    });
    password.addEventListener('mouseout', function() {
        hideTooltip();
    });
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    function showTooltip(message) {
        const tooltip = document.createElement('div');
        tooltip.textContent = message;
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = '#333';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '10px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.fontSize = '12px';
        tooltip.style.top = '50px';
        tooltip.style.left = '20px';
        tooltip.id = 'password-tooltip';
        password.parentNode.appendChild(tooltip);
    }
    function hideTooltip() {
        const tooltip = document.getElementById('password-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
});