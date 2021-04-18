// Browser detection

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
const isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
const isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

// Mobile Menu

const mobileMenu = document.querySelector('#mobile-menu')
const hamburgerIcon = document.querySelector('.hamburger-menu')
const closeMenuIcon = document.querySelector('.mobile-menu__close')

hamburgerIcon.addEventListener('click',function(){
    mobileMenu.style.transform = 'translateX(-100vw)'
    mobileMenu.style.display = 'flex';
    setTimeout(function(){
        mobileMenu.style.transform = 'translateX(0)'
    },10)
});

function closeMobileMenu() {
    mobileMenu.style.transform = 'translateX(-100vw)';
    setTimeout(function(){
        mobileMenu.style.display = 'none';
    },500);
    setTimeout(function(){
        mobileMenu.style.transform = 'translateX(0)'
    },510)
};

closeMenuIcon.addEventListener('click',function(){
    closeMobileMenu();
});

// Smooth Scrolling

function addSmoothScroll(link,lag, offset){
    link.addEventListener('click',function(e){
        e.preventDefault();
        let target = this.hash;
        if (target.length) {
            let topValue = document.querySelector(target).offsetTop - offset;
            if(target === '#hero-section') {
                topValue = topValue + offset;
            }
            setTimeout(function(){
                window.scroll({
                    top: topValue,
                    left: 0,
                    behavior:'smooth',
                })},lag);
        }
    });   
}

const navLinks = document.querySelectorAll('.menu__link')
const mobileNavLinks = document.querySelectorAll('.mobile-menu__link')

if (!isIE) {
    for(var i = 0;i<navLinks.length;i++){    
        if(location.hostname==navLinks[i].hostname &&
            location.pathname.replace(/^\//,'')==navLinks[i].pathname.replace(/^\//,'') 
            && navLinks[i].hash.replace(/#/,'')){
                addSmoothScroll(navLinks[i],0,0)
        }
    };

    for(var i = 0;i < mobileNavLinks.length;i++){
        mobileNavLinks[i].addEventListener('click',function(){
            closeMobileMenu();
        });

        if(location.hostname === mobileNavLinks[i].hostname &&
            location.pathname.replace(/^\//,'') === mobileNavLinks[i].pathname.replace(/^\//,'') 
            && mobileNavLinks[i].hash.replace(/#/,'')) {
                addSmoothScroll(mobileNavLinks[i],250,40)
        };
    };
};

if (isIE) {
    for(var i = 0;i<mobileNavLinks.length;i++){
        mobileNavLinks[i].addEventListener('click',function(){
            closeMobileMenu();
        });
    };
};



// Mapas Mobile
const selectPilar = document.getElementById('button-pilar');
const selectDaireaux = document.getElementById('button-daireaux');
const mapPilar = document.getElementById('map-pilar');
const mapDaireaux = document.getElementById('map-daireaux');
const mailPilar = document.getElementById('mail-pilar');
const mailDaireaux = document.getElementById('mail-daireaux');

let isShowingPilar = true;

function changeActive(active, inactive, activeClass, inactiveClass) {
    inactive.classList.remove(activeClass);
    active.classList.remove(inactiveClass);
    inactive.classList.add(inactiveClass);
    active.classList.add(activeClass);
};

selectPilar.addEventListener('click',function() {
    if (!isShowingPilar) {
        changeActive(mapPilar, mapDaireaux, 'mapas__container-active', 'mapas__container-inactive');
        changeActive(selectPilar, selectDaireaux, 'mapas__button-active', 'mapas__button-inactive');
        changeActive(mailPilar, mailDaireaux, 'mail-tel__active', 'mail-tel__inactive');
        isShowingPilar = true;
    };
});

selectDaireaux.addEventListener('click',function() {
    if (isShowingPilar) {
        changeActive(mapDaireaux, mapPilar, 'mapas__container-active', 'mapas__container-inactive');
        changeActive(selectDaireaux, selectPilar, 'mapas__button-active', 'mapas__button-inactive');
        changeActive(mailDaireaux, mailPilar, 'mail-tel__active', 'mail-tel__inactive');
        isShowingPilar = false;
    };
});

