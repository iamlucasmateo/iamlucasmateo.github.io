/*
// Home
const liHtml = `<li>
                    <a href=""  class="item" data-gact="" data-gaid="">
                        <div class="imageContainer">
                            <img src="http://www.santander.com.ar/banco/wcm/myconnect/28b62b7d-0023-4723-8320-29edadd6db98/drakeSlide.png?MOD=AJPERES" class="desktop"/>
                        </div>
                        <div class="detailContainer">
                            <div class="table">
                                <div class="cell middle">
                                </div>
                            </div>
                        </div>
                    </a>
                </li>`
$('.flexslider').data('flexslider').addSlide(liHtml,0);

// Login
document.querySelector('.welcome-container__message').innerHTML = '<p>Hola :), <br> ¿sabías que <br>tenemos <br> esta oferta <br>para vos?';
document.getElementsByTagName('login')[0].style['background-image'] = 'url("http://www.santander.com.ar/banco/wcm/connect/8adfd3a8-82b0-405d-ab24-8b1363351e07/drakeLogin.png?MOD=AJPERES")';

// Obp
const swiper = document.querySelector('.carousel-container').swiper;
swiper.removeSlide(2);
swiper.removeSlide(1);
swiper.autoplay.stop();
const h1Carousel = document.querySelectorAll('.Home_Header_Noticias_Titulo.ng-binding.ng-scope')[2];
h1Carousel.innerHTML = 'esta oferta es para vos';
const descripcion = document.querySelectorAll('.Home_Header_Noticias_Descripcion.ng-binding.ng-scope')[2];
descripcion.innerHTML = 'Acá te damos un detalle adicional del producto';
const bckgSlide = document.querySelectorAll('.Home_Swiper_Slide_inner-wrapper.ng-scope')[2];
bckgSlide.style['background-image'] = 'url("https://www.santander.com.ar/banco/wcm/connect/26012a48-9a72-4231-818d-a86b00680173/Slide_EspecialWomen_Desktop.jpg?MOD=AJPERES")';
*/

fetch('Output.json')
  .then(response => response.json())
  .then(json => console.log(json))