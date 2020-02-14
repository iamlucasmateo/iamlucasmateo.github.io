var mapboxAccessToken = "pk.eyJ1IjoibHVjY2hpbmkyMDIiLCJhIjoiY2s0ZjAydWsxMGpldzNkbzdxM2YwM2pzeiJ9.yeXrZv8dt3jP9lZDPpoRVQ";
var map = L.map('map').setView([-34.610824, -58.451452], 12);
var map2 = L.map('map2').setView([-34.584993, -58.466520], 14); -34.584993, -58.460520

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: "Leaflet Open Street View Mapbox"
}).addTo(map);

function getColor(d) {
    return d == 'No significativa' ? '#ffffff': 
           d > 0.3 ? '#b30000' : 
           d > 0.2 ? '#d7301f' :
           d > 0.1 ? '#ef6548' :
           d > 0.0 ? '#fee8c8' :
           d > -0.1 ? '#ece7f2' :
           d > -0.2 ? '#74a9cf' :
           d > -0.3 ? '#3690c0' :
           d > -0.5 ? '#045a8d' :
                      '#023858';
};

function style(feature) {
    return {
        fillColor: getColor(feature.properties.corr_subte),
        weight: 2,
        opacity: 1,
        color: '#2F2F2F',
        dashArray: '3',
        fillOpacity: 0.35
    };
}


L.geoJson(barrios, {style: style}).addTo(map);


var geojson;


// Highlighting when mouse over
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    };

    info.update(layer.feature.properties);
    // Para que la lineas de subte esten siempre al frente
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        for(i=0;i<polylineList.length;i++){
            polylineList[i].bringToFront();
        }
    };
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function popUpBarrio(e){
    var layer = e.target;
    var strBarrio = "<img src='Imgs/Subte/" + layer.feature.properties.barrio + ".png' height=300 width=400>";
    layer.bindPopup(strBarrio,{maxWidth:500}).openPopup();
}

function onEachFeature(feature, layer) {
    layer.on({
        click: popUpBarrio,
        mouseover: highlightFeature,
        mouseout: resetHighlight,
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
    this._div.innerHTML = '<h4>Correlacion</h4>' +  (props ?
        '<b>' + props.barrio + '</b><br />' + props.corr_subte + '<br><b>Observaciones</b><br>' + props.observaciones
        : '');
};

info.addTo(map);

// Lineas de Subte
var polylineA = L.polyline(latlngsA, {color: 'blue'}).addTo(map);
var polylineB = L.polyline(latlngsB, {color: 'red'}).addTo(map);
var polylineD = L.polyline(latlngsD, {color: 'green'}).addTo(map);
var polylineE = L.polyline(latlngsE, {color: 'purple'}).addTo(map);
var polylineH = L.polyline(latlngsH, {color: 'yellow'}).addTo(map);

var polylineList = [polylineA,polylineB,polylineD,polylineE,polylineH]

polylineA.bindPopup("Linea A");
polylineB.bindPopup("Linea B");
polylineD.bindPopup("Linea D");
polylineE.bindPopup("Linea E");
polylineH.bindPopup("Linea H");

for(i=0;i<polylineList.length;i++){
    polylineList[i].setStyle({
        weight: 4,
        opacity: 1,
    }); 
    polylineList[i].on('mouseover', function(e) {
        var layer = e.target;
        layer.setStyle({weight: 8});
    });    
    polylineList[i].on('mouseout', function(e) {
        var layer = e.target;
        layer.setStyle({weight: 4});
    });
}

map2.createPane('barriosPane')
map2.getPane('barriosPane').style.zIndex = 200;

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: "Leaflet Open Street View Mapbox"
}).addTo(map2);

function getColor2(b) {
        return b == 'CHACARITA' ? '#b30000' : 
               b == 'VILLA URQUIZA' ? '#045a8d' :
               b == 'VILLA ORTUZAR' ? '#ece7f2' :
               b == 'VILLA CRESPO' ? '#74a9cf' :
               b == 'PARQUE CHAS' ? '#3690c0' :
               b == 'PATERNAL' ? '#b30000' :
                          'rgba(255,255,255,0.9)';
    };
function style2(feature) {
        return {
            fillColor: getColor2(feature.properties.barrio),
            weight: 2,
            opacity: 1,
            color: '#333',
            dashArray: '3',
            fillOpacity: 0.7,
            pane:'barriosPane',
        };
    }
    
L.geoJson(barrios, {style: style2}).addTo(map2).bringToBack();

var polylineB = L.polyline(latlngsB, {color: 'red',stroke:true,weight:6,}).addTo(map2);

var myRenderer = L.canvas({ padding: 0.5});
var myRenderer2 = L.canvas({ padding: 0.5});

for (var i = 0; i < points.length; i += 1) {
	L.circleMarker([points[i][1],points[i][2]], {
      renderer: myRenderer,
      radius:4,
      fillOpacity:1,
      fillColor:points[i][3],
      stroke:true,
      fillRule:'nonzero',
      color: 'black',
      weight:1,
  }).addTo(map2).bindPopup('<b>Precio M2:</b> US$' + points[i][0]);
}




