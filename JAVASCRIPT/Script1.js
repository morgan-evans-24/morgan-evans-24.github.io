let narrow;
if (screen.width < 768) {
    narrow = true;
}
else {
    narrow = false;
}


if (narrow) {
    document.querySelectorAll("#desktopsocials").forEach(social => {
        social.style.display = "none";
    });
}
else {
    document.querySelectorAll("#mobilesocials").forEach(social => {
        social.style.display = "none";
    });

}


const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;

canvas.height = screen.availHeight * 0.25;

const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lower = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '1234567890';
const special = '!()#<>{}[]';

const alphabet = upper + lower + numbers + special;


const columns = canvas.width / 10;
const fontSize = canvas.width / columns;

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


const headers = document.querySelectorAll("h2");

const headerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            highlightNavElement(entry.target)
        }
    })
}, {
    rootMargin: "-50px 0px -300px 0px" //top right bottom left
})

if (!narrow) {
    headers.forEach(header => {
        headerObserver.observe(header)
    });

    changeClass(0);

    window.onscroll = function () { scrollFunction() };
}


setInterval(draw, 40);


//let carousel = document.querySelector("carousel")
//carousel.on()
let carouselIndicators = document.querySelectorAll(".carousel-indicators button");
for (var i = 0, len = carouselIndicators.length; i < len; i++) {
    console.log(carouselIndicators[i]);
}
$('.carousel').on('slid.bs.carousel', function () {
    refreshSlides();
});




function refreshSlides() {
    
    for (var i = 0, len = carouselIndicators.length; i < len; i++) {
        if (carouselIndicators[i].classList.contains("active")) {
            if (i == 0) {
                document.getElementById('slide1').style.display = "block";
                document.getElementById('slide2').style.display = "none";
                document.getElementById('slide3').style.display = "none";
            }
            if (i == 1) {
                document.getElementById('slide1').style.display = "none";
                document.getElementById('slide2').style.display = "block";
                document.getElementById('slide3').style.display = "none";
            }
            if (i == 2) {
                document.getElementById('slide1').style.display = "none";
                document.getElementById('slide2').style.display = "none";
                document.getElementById('slide3').style.display = "block";
            }
        }
    }
}




const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});

function loadBar(bar) {
    bar.style.width = "0%";
    bar.style.transition = "1s";
    bar.style.width = bar.ariaValueNow + "%";
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
    if (!narrow) {
        ourButton.classList.add("active");
        ourButton.style.backgroundColor = "forestgreen";
    }
    else {
        document.getElementById("togglemenu").click();
    }


    return true;
}

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

        document.querySelector("#header p").style.fontSize = "2vw";
    }
    else {
        document.querySelector("#header p").style.fontSize = "2.5vw";
        
        
    }
}



