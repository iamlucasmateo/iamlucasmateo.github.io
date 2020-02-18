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

// genera HTML para la tabla del Info
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

// Listas y función para convertir de precio a color y de superficie a radio del marker

let colorList = ['rgba(0,0,127,255)',
 'rgba(0,0,254,255)',
 'rgba(0,96,255,255)',
 'rgba(0,212,255,255)',
 'rgba(76,255,170,255)',
 'rgba(166,255,79,255)',
 'rgba(255,229,0,255)',
 'rgba(255,126,0,255)',
 'rgba(255,22,0,255)']

let greysList = ['#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525','#000000']

let priceList = [600,1500,2000,2400,2800,3200,3700,4000,4500]

let errorList = [0,5000,10000,15000,20000,25000,30000,35000,40000]

let surfaceList = [10,40,60,90,120]

let radiusListSample = [2,3,4,5,6,7,8,9,10]

let radiusListNeighbors = [10,11,12,13,14]

function convert(value,listFrom,listTo) {
    var index;
    for(var i = 0;i<listFrom.length;i++){
        if(value > listFrom[i]){
            index = i;
        } else { break }
    }
    return listTo[index]
}

// Markers variables
var myRenderer = L.canvas({ padding: 0.5});
var markerList = [];

// Legend Control

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        // grades = priceList
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var j = 0; j < priceList.length; j++) {
        div.innerHTML +=
            '<i style="background-color:' + convert(priceList[j]+1,priceList,colorList) + '"></i> ' +
            priceList[j] + (priceList[j + 1] ? '&ndash;' + priceList[j + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

// Lista de modelos, calleamos a cada uno con la variable state
var model;
var modelList = [naifKNN,optimizedKNN]

var listaPrueba = ['loca1','loca2','loca3','loca4','loca5','loca6','loca7','loca8','loca9','loca10','loca11',]

function showSample(buttonId) {
    // var buttonIndex = Number(buttonId.slice(0,2));
    for (let i = 0; i < sampleList['lat'].length; i += 1) {
        var error = Math.abs(sampleList['price'][i] - model['pred_price'][i]);
        markerList[i] = L.circleMarker([sampleList['lat'][i],sampleList['lon'][i]], {
          renderer: myRenderer,
          radius:7,
          fillOpacity:1,
          fillColor:convert(error,errorList,greysList),
          stroke:true,
          fillRule:'nonzero',
          color: 'black',
          weight:0.4,
      }).addTo(map)
    }
}

// Function to plot marker radius based on error
// function errorToRadius(error) {

// }

var bigIcon = new L.Icon({
    iconSize: [35, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [10, 10]
});


var myIcon = L.divIcon({color: 'black'});
// you can set .my-div-icon styles in CSS


// A lot going on here
// This function will show the details for each sample
// i will stand for the sample, j for its neighbors
function infoUpdate() {
    for (let i = 0; i < sampleList['lat'].length; i += 1) {
        var neighborsList = [];
        markerList[i].on('mouseover', function(e) {
            // update Info
            var priceTest = sampleList['price'][i];
            var price_m2Test = sampleList['price_m2'][i];
            var surfaceTest = sampleList['surface'][i];
            var surfacePred = model['neigh_mean_surf'][i];
            var price_m2Pred = model['neigh_mean_price_m2'][i];
            var pricePred = model['pred_price'][i];
            info.update(pricePred,priceTest,price_m2Pred,price_m2Test,surfacePred,surfaceTest);
            // highlight neighbors,self
            for(let j = 0;j<model['neigh_lat_list'][0].length;j++){
                neighborsList[j] = L.circleMarker([model['neigh_lat_list'][i][j],model['neigh_lon_list'][i][j]], {
                    renderer: myRenderer,
                    radius:convert(model['neigh_surf_list'][i][j],surfaceList,radiusListNeighbors),
                    fillOpacity:1,
                    fillColor:convert(model['neigh_price_m2_list'][i][j],priceList,colorList),
                    stroke:true,
                    fillRule:'nonzero',
                    color:'black',
                    weight:0.4,
                }).addTo(map);
              }
        });
        markerList[i].on('mouseout', function(e) {
            info.update();
            for(let j = 0;j<model['neigh_lat_list'][0].length;j++){
                neighborsList[j].remove(map)
            }
        });
    };
};

// Cambio de modelo
document.addEventListener("click",function(e){
    if(e.target.matches(".buttons")){
        for(i=0;i < buttons.length;i++){
            buttons[i].disabled = false;
        }
        e.target.disabled = true;
        let buttonId = e.target.id;
        state = Number(buttonId.slice(0,2));
        model = modelList[state];
        updateText(buttonId);
        showSample(buttonId);
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

