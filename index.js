var projText = document.querySelector("#project-description");
var projLinks = document.querySelector("#project-links");
var projTile = document.querySelectorAll('.project-tile')
var linkState = 'off'
var linksButton = document.querySelector('#links-button')
var descSection = document.querySelector('.description-section')
var iconCssHover = 'background-color:#2B1428; color: #F4CEAD; box-shadow: -10px -10px 30px #F4CEAD;'
var iconCssOut = 'background-color:#F4CEAD; color: #2B1428; box-shadow: none;'
var hoverText = document.querySelector('#hover-text')


for(let i = 0; i < projTile.length; i++){
    projTile[i].addEventListener('mouseenter',function(e){
        if(linkState == 'off') {
            this.style.cssText = iconCssHover
            projText.innerHTML = projTextObj[e.target.id];
            projLinks.innerHTML = '';
            hoverText.innerHTML = '<b>Click</b> to open links'
        }
    })
    projTile[i].addEventListener('mouseleave',function(e){
        if(linkState == 'off') {
            this.style.cssText = iconCssOut
            projText.innerHTML = '';
            hoverText.innerHTML = '<b>Hover</b> on a project for info'
            // hoverText.style.cssText = iconCssHover = 'background-color:#2B1428; color: #F4CEAD;'
        }
    })
    // Evento que me lleva al state "link"
    projTile[i].addEventListener('click',function(e){
        if(linkState == 'off') {
            linkState = 'on'
            projText.innerHTML = '';
            projLinks.innerHTML = projLinksObj[this.id];
            linksButton.innerHTML = 'Links below, close them here'
            linksButton.style.display = 'block';
            descSection.style.cssText = 'line-height:200%';
            hoverText.innerHTML = '';
        }
    });
};

// Evento que me saca del state 'link'
linksButton.addEventListener('click',function(){
    for(let i = 0; i < projTile.length; i++) {
        projTile[i].style.cssText = iconCssOut
    }
    this.style.cssText = iconCssOut
    projLinks.innerHTML = '';
    linksButton.style.display = 'none';
    linkState = 'off';
    hoverText.innerHTML = 'Hover on a project for info';
});

projTextObj = {
    'housingAnalysis':'Data processing and statistical analysis of a Buenos Aires housing dataset. The raw (csv) data is processed \
                        in Jupyter notebooks, and presented in interactive maps. Tools used: Python, numpy, pandas, geopandas,\
                         Seaborn, Matplotlib, scipy, sci-kit learn, HTML/CSS/javascript, Leaflet. In Spanish. <br>',
    'housingPredictions':'Machine learning models for a Buenos Aires real estate dataset. Models are built in Jupyter notebooks, the results \
                        presented in a series of interactive web maps. Tools used: Python, numpy, pandas, geopandas,\
                        Seaborn, Matplotlib, sci-kit learn, HTML/CSS/javascript, Leaflet. In Spanish. <br>',
    'mathAlgorithms': 'Mathematics for machine learning and ML algorithms from scratch, including interactive visualization of ML algorithms.\
                        Tools used include Python, Jupyter notebook, numpy, pandas, Matplotlib, sci-kit learn, R, HTML/CSS/javascript. <br>',
    'economics':'Models combining machine learning and economics. Tools used: Python, Jupyter notebook, numpy, pandas, Seaborn, Matplotlib, \
                sci-kit learn, HTML/CSS/javascript, Leaflet. <br>',
    'walkingDirections':'Walking Directions App, built iteratively.<br>',
    'webProjects':'Web design projects. Tools used: HTML/CSS/javascript.<br>',
}

projLinksObj = {
    'housingAnalysis':'<p>Resumen de la información procesada en <b><a href="HousingDataAnalysis/choroplethVarios.html" target="blank">mapas interactivos</a></b></p>\
        <p><b><a href="HousingDataAnalysis/heatmapPrice.html" target="blank">Heatmap interactivo</b></a> con información detallada de todo el dataset</p>\
        <p>Un interesante <b><a href="HousingDataAnalysis/subteEstudio.html" target="blank">estudio de caso</a></b> utilizando otras bases de datos públicas</p>\
        <p><b><a href="https://github.com/iamlucasmateo/dsHousingAnalysis" target="blank">Repositorio de Notebooks</a></b> con el procesamiento y análisis de los datos.</p>',
    'housingPredictions':'<p><b><a href="MLPredictionProperati/interactiveModels.html" target="blank">Mapa interactivo</a></b> comparando modelos de regresión kNN para precios de propiedades residenciales.\
        <p>Notebook: <b><a href="https://github.com/iamlucasmateo/dsHousingPrediction/blob/master/Notebooks/Mercado%20Inmobiliario%20-%20kNN%20Models.ipynb" target="blank">modelos tipo kNN</a></b>.</p> \
        <p>Notebook: <b><a href="https://github.com/iamlucasmateo/dsHousingPrediction/blob/master/Notebooks/Mercado%20Inmobiliario%20-%20Decision%20Tree%20Models.ipynb" target="blank">modelos con decision trees</a></b>.</p>',
    'mathAlgorithms': '<p><b><a href="Math&Algorithms/knnVisualization.html" target="blank">Interactive visualization</a></b> of a kNN algorithm.\
    <p>Notebook  developing a <b><a href="https://github.com/iamlucasmateo/dsMathAlgorithm/blob/master/KNN/KNN%20algorithms.ipynb" target="blank">from-scratch kNN algorithm.</a></b></p>\
    <p>Notebook developing a <b><a href="https://github.com/iamlucasmateo/dsMathAlgorithm/blob/master/Trees/Decision_Tree_Algorithm.ipynb" target="blank">from-scratch decision tree algorithm.</a></b></p>\
    <p>MIT OCW\'s <b><a href="https://github.com/iamlucasmateo/dsMathAlgorithm/tree/master/MIT%20OCW%2018.065" target="blank">Linear Algebra</a></b> for Data Science.</p>',
    'economics':'<p><b><a href="https://github.com/iamlucasmateo/dsEconomics" target="blank">Microeconomic model</a></b> featuring the ROC curve as an optimization constraint.</p>',
    'walkingDirections':'<p><b><a href="WalkingDirections/walkingDirections.html" target="blank">First iteration</a></b> for this personalized Walking Tour app.',
    'webProjects':'<p><a href="https://codepen.io/lucasmateo/" target="blank"><b>Codepen projects</b></a> for FCC Front End certification</p>\
        <p>A simple<a href="WebDesign/ProductLanding/ProductLanding.html" target="blank"><b> Wordpress-style theme</b></a> (almost entirely HTML-CSS).',
}
