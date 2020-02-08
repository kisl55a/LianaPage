const clients = document.querySelector('#clients');
const employees = document.querySelector('#employees');
const users = document.querySelector('#users')
const pieceOfNews = document.querySelectorAll('.piece-of-news')
const newsDate = document.querySelectorAll('.news-date')
let news = undefined;

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

const newsFeed = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://www.lianatech.com/resources/blog.rss"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(contents => {
            let xml = contents;
            let xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');
            for (let i = 0; i < pieceOfNews.length; i++) {
                console.log('newsText.length: ', pieceOfNews.length);
                let item = xmlDoc.getElementsByTagName("item")[i];
                let description = item.getElementsByTagName("description")[0].innerHTML;
                let link = item.getElementsByTagName("link")[0].innerHTML;
                let date = new Date(item.getElementsByTagName("pubDate")[0].innerHTML);
                let dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
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
newsFeed()



