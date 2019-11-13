let url = window.location.toString();
let now = new Date ();
let nameFromUrl = (url) => {
    let nameArr = url.split('=');
    let userName = nameArr[1];
    if (userName == undefined) {
        userName = '6thSence';
    }
    return userName;
}
let name = nameFromUrl(url);
let getInfo = fetch('https://api.github.com/users/' + name);
let getDate = new Promise((resolve, reject) => {
    setTimeout(() => now ? resolve(now) : reject("Время не определено"), 3000);
});
function loadingStop() {
    const loader = document.querySelector('.loader__wrap');
    const wrapper = document.querySelector('.wrapper');
    loader.style.display = 'none';
    wrapper.style.display = 'flex';
}
Promise.all([getInfo, getDate])
    .then(([infoFromPromise, dateFromPromise]) => {
        userInfo = infoFromPromise;
        nowDate = dateFromPromise;
    })
    .then(res => userInfo.json())
    .then(json => {
        if (json.login != undefined) {
            let getImage = () => {
                let photo = document.querySelector('.image');
                photo.src = json.avatar_url;
                photo.innerHTML = photo;
            }
            let getLink = () => {
                let link = document.querySelector('.link');
                link.href = json.html_url;
            }
            let getName = () => {
                let innerName = json.name;
                let h1 = document.querySelector('.title');
                if (innerName === null) {
                    let nickname = json.login;
                    h1.innerHTML = nickname;
                }
                h1.innerHTML = name;
            }
            let getDescription = () => {
                let p = document.querySelector('.text');
                let info = json.bio;
                p.innerHTML = info;
            }
            getImage();
            getLink();
            getName();
            getDescription();
        } else {
            alert('Информация о пользователе не доступна');
        } 
    })
    .then(res => {
        let pastDate = () => {
            let p2 = document.createElement('p');
            p2.innerHTML = now;
            document.body.appendChild(p2);
        }
        pastDate();
        loadingStop();
    })        
    .catch(err => alert('Информация о пользователе не доступна'));
