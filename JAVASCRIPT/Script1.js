const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 300;

const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lower = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '1234567890';
const special = '!()#<>{}[]';

const alphabet = upper + lower + numbers + special;

const fontSize = 10;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#0f0';
    context.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }


};

const bars = document.querySelectorAll(".progress-bar");

const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadBar(entry.target);
            barObserver.unobserve(entry.target);
        }

    })
}, {
    threshold: 1
})


bars.forEach(bar => {
    barObserver.observe(bar)
});

console.log("Why");

const headers = document.querySelectorAll("h2");

const headerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("should be working")
            highlightNavElement(entry.target)
        }
    })
}, {
    rootMargin: "-50px 0px -300px 0px" //top right bottom left
})


headers.forEach(header => {
    headerObserver.observe(header)
});

setInterval(draw, 40);

changeClass(0);

window.onscroll = function () { scrollFunction() };


function loadBar(bar) {
    bar.style.width = "0%";
    bar.style.transition = "1s";
    bar.style.width = bar.innerText;
}

function highlightNavElement(header) {
    if (header.id === "aboutme") {
        changeClass(0);
    }
    if (header.id === "myprojects") {
        changeClass(1);
    }
    if (header.id === "skillsandexperience") {
        changeClass(2);
    }
    if (header.id === "contactme") {
        changeClass(3);
    }
}

function changeClass(num) {
    var otherButton = document.querySelector("a.nav-link.active");
    var ourButton = document.getElementById("button" + num);
    if (otherButton != null) {
        otherButton.classList.remove("active");
        otherButton.style.backgroundColor = "lightgreen";
    }
    ourButton.classList.add("active");
    ourButton.style.backgroundColor = "forestgreen";

    return true;
}

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

        document.querySelector("h1").style.fontSize = "25px";
    }
    else {

        document.querySelector("h1").style.fontSize = "35px";
    }
}



