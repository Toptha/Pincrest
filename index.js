        const pins = [
            { id: 1, title: 'Colorful abstract art', image: 'https://picsum.photos/200/300' },
            { id: 2, title: 'Mountain landscape', image: 'https://picsum.photos/200/400' },
            { id: 3, title: 'Delicious food photography', image: 'https://picsum.photos/200/250' },
            { id: 4, title: 'Urban architecture', image: 'https://picsum.photos/200/350' },
            { id: 5, title: 'Cute animal portrait', image: 'https://picsum.photos/200/200' },
            { id: 6, title: 'Fashion inspiration', image: 'https://picsum.photos/200/500' },
            { id: 7, title: 'Travel destinations', image: 'https://picsum.photos/200/280' },
            { id: 8, title: 'Minimalist design', image: 'https://picsum.photos/200/320' },
            { id: 9, title: 'Nature close-up', image: 'https://picsum.photos/200/360' },
            { id: 10, title: 'Artistic portrait', image: 'https://picsum.photos/200/340' },
        ];

        const pinContainer = document.getElementById('pinContainer');
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const closeBtn = document.getElementsByClassName('close')[0];

        function createPinElement(pin) {
            const pinElement = document.createElement('div');
            pinElement.className = 'pin';
            pinElement.innerHTML = `
                <img src="${pin.image}" alt="${pin.title}">
                <div class="pin-overlay">${pin.title}</div>
            `;
            pinElement.addEventListener('click', () => openModal(pin));
            return pinElement;
        }

        function renderPins() {
            pins.forEach(pin => {
                pinContainer.appendChild(createPinElement(pin));
            });
        }

        function openModal(pin) {
            modalImage.src = pin.image;
            modalTitle.textContent = pin.title;
            modal.style.display = 'block';
        }

        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        renderPins();
function checkLoginStatus() {
    fetch('check_session.php', {
        credentials: 'include' 
    })
    .then(response => response.json())
    .then(data => {
        if(data.logged_in) {
            const loginBtn = document.querySelector('.login-btn');
            if(loginBtn) {
                loginBtn.textContent = 'Account ▾';

                const dropdownContent = document.querySelector('.dropdown-content');
                if(dropdownContent) {
                    dropdownContent.style.display = 'block';
                }
            }
        } else {

            const loginBtn = document.querySelector('.login-btn');
            if(loginBtn) {
                loginBtn.textContent = 'Login ▾';
            }
        }
    })
    .catch(error => {
        console.error('Error checking login status:', error);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    

    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fetch('logout.php', {
                credentials: 'include' 
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    localStorage.removeItem('username');
                    window.location.replace('index.html');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});