function checkLoginStatus() {
    fetch('check_session.php')
        .then(response => response.json())
        .then(data => {
            if(data.logged_in) {
                // Update login button to show Account
                const loginBtn = document.querySelector('.login-btn');
                if(loginBtn) {
                    loginBtn.textContent = 'Account ▾';
                }
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
        });
}

// Add logout functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fetch('logout.php')
                .then(response => response.json())
                .then(data => {
                    if(data.success) {
                        localStorage.removeItem('username');
                        window.location.href = 'index.html';
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }
    
    // Check login status when page loads
    checkLoginStatus();
});