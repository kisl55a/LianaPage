const clients = document.querySelector('#clients');
const employees = document.querySelector('#employees');
const users = document.querySelector('#users')
const pieceOfNews = document.querySelectorAll('.news-piece')
const newsDate = document.querySelectorAll('.news-date')
let news = undefined;

// Navbar expantion

menu.onclick = () => {
    let x = document.querySelectorAll('#nav-expanded')
    x.forEach(element => {
        element.classList.toggle('responsive')
    });
}

//  Counter for numbers of clients/users/employees

const startCounters = () => {
    if (window.pageYOffset + this.window.innerHeight > 900) {
        counter(180, employees, 3);
        counter(3000, clients, 4);
        counter(10000, users, 5);
        window.removeEventListener('scroll', startCounters);
    }
}

window.addEventListener('scroll', startCounters);

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

// Function for putting real news

const newsFeed = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://www.lianatech.com/resources/blog.rss"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url)
        .then(response => response.text())
        .then(contents => {
            let xml = contents;
            let xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');
            for (let i = 0; i < pieceOfNews.length; i++) {
                let item = xmlDoc.getElementsByTagName("item")[i];
                let description = item.getElementsByTagName("description")[0].innerHTML;
                let link = item.getElementsByTagName("link")[0].innerHTML;
                let date = new Date(item.getElementsByTagName("pubDate")[0].innerHTML);
                let dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
                pieceOfNews[i].innerHTML = `
                <a href="${link}">
                    <div class="news-date">
                         ${dateString}
                    </div>
                     <p class="news-text">
                         ${description} 
                        </p></a>`;
            }
        })
        .catch((err) => console.log(err))
}

//Functions for showing the notification

let isPopShown = 0;
const pop = () => {
    if (isPopShown == 0 && document.querySelector('#email').value.trim() !== "") {
        document.querySelector('.box-background').style.display = "block";
        isPopShown = 1
    } else {
        document.querySelector('.box-background').style.display = "none";
        isPopShown = 0
    }
}

let newsLetterPopShown = 0
const newsLetterPop = () => {
    if (newsLetterPopShown == 0 && window.innerWidth > 800) {
        setTimeout(() => {
            document.querySelector('.notification-box').style.right = "10px";
            newsLetterPopShown = 1

        }, 7000)
    } else {
        document.querySelector('.notification-box').style.right = "-1010px";
    }
}


// Activation of all the needed functions 
newsFeed()
newsLetterPop()





