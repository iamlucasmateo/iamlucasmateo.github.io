var mapboxAccessToken = "pk.eyJ1IjoibHVjY2hpbmkyMDIiLCJhIjoiY2s0ZjAydWsxMGpldzNkbzdxM2YwM2pzeiJ9.yeXrZv8dt3jP9lZDPpoRVQ";
var map = L.map('map').setView([-34.610824, -58.451452], 12);
var buttons = document.querySelectorAll(".buttons");
var state = "Price"
alert('OK')

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: "Leaflet Open Street View Mapbox"
}).addTo(map);

var colorGrades = [['#7f0000','#b30000','#d7301f','#ef6548','#fc8d59','#fdbb84','#fdd49e','#fee8c8','#fff7ec'],
['#49006a','#7a0177','#ae017e','#dd3497','#f768a1','#fa9fb5','#fcc5c0','#fde0dd','#fff7f3'],
['#004529','#006837','#238443','#41ab5d','#78c679','#addd8e','#d9f0a3','#f7fcb9','#ffffe5']]

var gradesList = [[0, 1500, 1750, 2000, 2250, 2500, 2750, 3250],[0,60,75,90,105,120,135,150],[0,2.1,2.4,2.7,3,3.3,3.6,3.9]];

function getColor(d,index) {
    return d > gradesList[index][7] ? colorGrades[index][0] :
           d > gradesList[index][6] ? colorGrades[index][1] :
           d > gradesList[index][5] ? colorGrades[index][2] :
           d > gradesList[index][4] ? colorGrades[index][3] :
           d > gradesList[index][3] ? colorGrades[index][4] :
           d > gradesList[index][2] ? colorGrades[index][5] :
           d > gradesList[index][1] ? colorGrades[index][6] :
           d > gradesList[index][0] ? colorGrades[index][7] :
                                      colorGrades[index][8];
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.price,0),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}

function styleM2(feature) {
    return {
        fillColor: getColor(feature.properties.sup,1),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}

function styleRooms(feature) {
    return {
        fillColor: getColor(feature.properties.room,2),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
var mapBase = L.geoJson(barrios, {style: style});

mapBase.addTo(map);

var geojson;

// Highlighting when mouse over
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.45
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    if(state == "Price"){
        info.updatePrice(layer.feature.properties);
    } else if(state == "M2") {
        info.updateM2(layer.feature.properties);
    } else {
        info.updateRooms(layer.feature.properties);
    }
    
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    if(state == "Price"){
        info.updatePrice();
    } else if(state == "M2") {
        info.updateM2();
    } else {
        info.updateRooms();
    }
}

function popUpBarrio(e){
    var layer = e.target;
    var strBarrio = "<img src='Imgs/PrecioM2/" + layer.feature.properties.barrio + ".png' height=300 width=400>";
    if(state == "Price"){
    layer.bindPopup(strBarrio,{maxWidth:500}).openPopup();
    } else {};
};

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: popUpBarrio
    });
}

geojson = L.geoJson(barrios, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

// Info Control (showing information)

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Info</h4>' +  (props ?
        '<b>' + props.barrio + '</b><br />' + props.price + ' USD per m<sup>2</sup>'
        : '');
}

info.addTo(map);

// functions to be used when changing maps

info.updatePrice = function (props) {
    this._div.innerHTML = '<h4>Precio por m2</h4>' +  (props ?
        '<b>' + props.barrio + '</b><br />' + props.price + ' USD per m<sup>2</sup>' + '<br><b>CV:</b> ' + props.cv
        : '');
};

info.updateM2 = function (props) {
    this._div.innerHTML = '<h4>Superficie promedio</h4>' +  (props ?
        '<b>' + props.barrio + '</b><br />' + props.sup + ' m<sup>2</sup>'
        : '');
};

info.updateRooms = function (props) {
    this._div.innerHTML = '<h4>Habitaciones promedio</h4>' +  (props ?
        '<b>' + props.barrio + '</b><br />' + props.room + ' habitaciones'
        : '');
};

// Legend Control

var legendPrice = L.control({position: 'bottomright'});
var legendM2 = L.control({position: 'bottomright'});
var legendRooms = L.control({position: 'bottomright'});
var legendList = [legendPrice,legendM2,legendRooms];

// legend for each map
for(let i=0;i<legendList.length;i++){
    legendList[i].onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = gradesList[i],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var j = 0; j < grades.length; j++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[j] + 1,i) + '"></i> ' +
                grades[j] + (grades[j + 1] ? '&ndash;' + grades[j + 1] + '<br>' : '+');
        }

        return div;
    };
}

var shownLegend = legendList[0];

shownLegend.addTo(map);

var styleList = [style,styleM2,styleRooms]

buttons[0].disabled = true;
buttons[1].disabled = false;
buttons[2].disabled = false;

var infoList = ['price','sup','room']
var infoStr = [' USD per m<sup>2</sup>',' m<sup>2</sup>',' habitaciones']
var stateList = ["Price","M2","Rooms"]

//  buttons for changing maps
document.addEventListener("click",function(event){
    if(event.target.matches(".buttons")){
        for(i=0;i < buttons.length;i++){
            buttons[i].disabled = false;
        }
        event.target.disabled = true;
        clearMap();
        state = stateList[event.target.id];
        shownLegend = legendList[event.target.id];
        shownLegend.addTo(map);
        info.addTo(map);
        mapBase = L.geoJson(barrios, {style: styleList[event.target.id]});
        mapBase.addTo(map);
        geojson = L.geoJson(barrios, {
        style: styleList[event.target.id],
        onEachFeature: onEachFeature
    }).addTo(map);

    }
});

function clearMap(){
    mapBase.remove(map);
    geojson.remove();
    shownLegend.remove(map);
    info.remove();
}


