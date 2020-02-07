const clients = document.querySelector('#clients');
const employees = document.querySelector('#employees');
const users = document.querySelector('#users')

menu.onclick = () => {
    let x = document.querySelectorAll('#nav-expanded')
    x.forEach(element => {
        element.classList.toggle('responsive')
    });
}

const startCounters = () => {
    if (window.pageYOffset + this.window.innerHeight > 900) {
        counter(180, employees, 4);
        counter(3000, clients, 5);
        counter(10000, users, 6);
        window.removeEventListener('scroll', startCounters);
    }
}

window.addEventListener('scroll', startCounters);

//  Counter for numbers of clients/users/employees

const counter = (max, id, time) => {
    let current = 0;
    let increase = max / (time * 60);
    setTimeout(function go() {
        if (current > max) {
            current = max
        }
        id.innerHTML = current;
        if (current < max) {
            (current == 0 ? time = 0 : time = 10)
            setTimeout(go, time);
        }
        current += Math.round(increase);
    }, 1000);
}


