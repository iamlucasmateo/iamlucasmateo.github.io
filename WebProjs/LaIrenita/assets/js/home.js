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

