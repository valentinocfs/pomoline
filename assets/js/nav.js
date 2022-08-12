let isOpen = false;

document.querySelector('.menu_toggle').addEventListener('click', (e) => {
    const nav = document.querySelector(".nav_toggle");

    isOpen = !isOpen;

    if(isOpen === false){
        nav.classList.remove('nav_active')
    } else {
        nav.classList.add('nav_active')
    }

})

