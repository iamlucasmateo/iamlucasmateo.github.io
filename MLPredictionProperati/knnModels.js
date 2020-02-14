var mapboxAccessToken = "pk.eyJ1IjoibHVjY2hpbmkyMDIiLCJhIjoiY2s0ZjAydWsxMGpldzNkbzdxM2YwM2pzeiJ9.yeXrZv8dt3jP9lZDPpoRVQ";
var map = L.map('map').setView([-34.610824, -58.435552], 12); -34.584993, -58.460520
var buttons = document.querySelectorAll(".buttons");
var pModelo =  document.querySelector('.pModelo')
var state = -1

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: "Leaflet Open Street View Mapbox"
}).addTo(map);

buttons[0].disabled = false;
buttons[1].disabled = false;

// Styling barrios
function style(feature) {
    return {
        fillColor: '#DDADDD',
        weight: 2,
        opacity: 1,
        color: '#4C2347',
        dashArray: '3',
        fillOpacity: 0.2,
        pane:'barriosPane',
    };
}

map.createPane('barriosPane')
map.getPane('barriosPane').style.zIndex = 200;
    
L.geoJson(barrios, {style: style}).addTo(map).bringToBack();

// Info Control (showing information)
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (pricePred,priceTest,price_m2Pred,price_m2Test,surfacePred,surfaceTest) {
    let tabla;
    if(priceTest != undefined) {
        tabla = tablaFunc(pricePred,priceTest,price_m2Pred,price_m2Test,surfacePred,surfaceTest)
    } else {tabla = ''};
    this._div.innerHTML = '<b>Info</b><br>'+ tabla;
};

info.addTo(map);

function tablaFunc(pricePred,priceTest,price_m2Pred,price_m2Test,surfacePred,surfaceTest) {
    let htmlString = `
    <table border='1' class='info-table'>
        <thead>
            <tr>
                <th></th>
                <th>Neighbors</th>
                <th>Target</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><b>Surface</b></td>
                <td align='right'>`+surfacePred+`</td>
                <td align='right'>`+surfaceTest+`</td>
            </tr>
            <tr>
                <td><b>Price m2</b></td>
                <td align='right'>`+price_m2Pred+`</td>
                <td align='right'>`+price_m2Test+`</td>
            </tr>
            <tr>
                <td><b>Price</b></td>
                <td align='right'>`+pricePred+`</td>
                <td align='right'>`+priceTest+`</td>
            </tr>
        </tbody>
    </table> `
    return htmlString
}


var myRenderer = L.canvas({ padding: 0.5});

var markerList = [];

// Lista de modelos, llamos a cada uno con la variable state
var predictionList = [predictionNaif]

var listaPrueba = ['loca1','loca2','loca3','loca4','loca5','loca6','loca7','loca8','loca9','loca10','loca11',]

// for (let i = 0; i < points.length; i += 1) {
// 	markerList[i] = L.circleMarker([points[i][1],points[i][2]], {
//       renderer: myRenderer,
//       radius:5,
//       fillOpacity:1,
//       fillColor:points[i][3],
//       stroke:true,
//       fillRule:'nonzero',
//       color: 'black',
//       weight:1,
//   }).addTo(map)
// }

function showSample(buttonId) {
    // var buttonIndex = Number(buttonId.slice(0,2));
    for (let i = 0; i < sampleList.length; i += 1) {
        markerList[i] = L.circleMarker([sampleList[i]['lat'],sampleList[i]['lon']], {
          renderer: myRenderer,
          radius:5,
          fillOpacity:1,
          fillColor:'#44203F',
          stroke:true,
          fillRule:'nonzero',
          color: '#FF35FF',
          weight:1,
      }).addTo(map)
    }
}

var bigIcon = new L.Icon({
    iconSize: [35, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [10, 10]
});


function infoUpdate() {
    for (let i = 0; i < sampleList.length; i += 1) {
        markerList[i].on('mouseover', function(e) {
            var priceTest = sampleList[i]['price'];
            var price_m2Test = sampleList[i]['price_m2'];
            var surfaceTest = sampleList[i]['surface'];
            var surfacePred = predictionList[state][i]['neigh_mean_surf'];
            var price_m2Pred = predictionList[state][i]['neigh_mean_price_m2'];
            var pricePred = predictionList[state][i]['pred_price'];
            info.update(pricePred,priceTest,price_m2Pred,price_m2Test,surfacePred,surfaceTest);
            console.log('OK')
        });
        markerList[i].on('mouseout', function(e) {
            info.update();
        });
    }
};

// Cambio de modelo
document.addEventListener("click",function(e){
    if(e.target.matches(".buttons")){
        for(i=0;i < buttons.length;i++){
            buttons[i].disabled = false;
        }
        e.target.disabled = true;
        let buttonId = e.target.id
        state = Number(buttonId.slice(0,2))
        updateText(buttonId)
        showSample(buttonId)
        infoUpdate();
        // clearMap();
        // state = stateList[event.target.id];
        // shownLegend = legendList[event.target.id];
        // shownLegend.addTo(map);
        // info.addTo(map);
        // mapBase = L.geoJson(barrios, {style: styleList[event.target.id]});
        // mapBase.addTo(map);
        // geojson = L.geoJson(barrios, {
        // style: styleList[event.target.id],
        // onEachFeature: onEachFeature
    // }).addTo(map);

    }
});

var textModelo = {
    '00naifKNN': 'Este es un modelo de regresión de k vecinos, ajustado según el default de sci-kit learn. \
    Es decir, 5 vecinos y pesos no proporcionales. En el mapa pueden observarse los vecinos, cuya superficie es proporcional al radio del punto\
    y cuya intensidad de color es proporcional al precio por m2. El detalle del conjunto de predictores está en el cuadro informativo del mapa.',
    '01gridKNN':'Modelo kNN optimizado a través de Grid Search, resultando en un k óptimo de 14 <a href="#">(link al notebook aquí)</a>. \
    Los vecinos que se muestran en el mapa tienen las mismas características que el modelo kNN básico.'
}

function updateText(buttonId) {
    pModelo.innerHTML = textModelo[buttonId]
}

// function updateSample(buttonId) {

// }

