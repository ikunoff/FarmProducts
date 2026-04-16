const openBtn = document.getElementById('openLogin');
const modal = document.getElementById('login');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', function(event) {
    event.preventDefault();
    modal.classList.add('active');
});

closeBtn.addEventListener('click', function(event) {
    event.preventDefault();
    modal.classList.remove('active');
});

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.remove('active');
    }
});