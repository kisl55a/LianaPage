menu.onclick = () => {
    let x = document.querySelectorAll('#nav-expanded')
    x.forEach(element => {
        element.classList.toggle('responsive') 
    });
}