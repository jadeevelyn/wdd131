const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    const isClickInside = nav.contains(event.target) || menuButton.contains(event.target);
    if (!isClickInside && nav.classList.contains('open')) {
        nav.classList.remove('open');
    }
});

