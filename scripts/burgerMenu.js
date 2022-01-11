const burgerMenu = document.querySelector('.burger-menu');
const overlay = document.querySelector(".overlay");
const bodyHide = document.body;

burgerMenu.addEventListener('click', ()=>{
    burgerMenu.classList.toggle('overlay-change');
    bodyHide.classList.toggle('body-scroll-hide');
    overlay.classList.toggle('overlay-visible');
})

