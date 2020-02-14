var mapboxAccessToken = "pk.eyJ1IjoibHVjY2hpbmkyMDIiLCJhIjoiY2s0ZjAydWsxMGpldzNkbzdxM2YwM2pzeiJ9.yeXrZv8dt3jP9lZDPpoRVQ";
var map = L.map('map').setView([-34.610824, -58.451452], 12);

// Fondo Mapbox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: "Leaflet Open Street View Mapbox"
}).addTo(map);


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

let priceList = [600,1500,2000,2400,2800,3200,3700,4000,4500]

let surfaceList = [10,40,60,90,120]

let radiusList = [1,2,3,4,5]

function convert(value,listFrom,listTo) {
    var index;
    for(var i = 0;i<listFrom.length;i++){
        if(value > listFrom[i]){
            index = i;
        } else { break }
    }
    return listTo[index]
}


// Mapeo de puntos según precio y superficie

// map.createPane('markerPane')
// map.getPane('markerPane').style.zIndex = 900;



// Styling de los barrios
// map.createPane('barriosPane')
// map.getPane('barriosPane').style.zIndex = 100;

// function style(feature) {
//   return {
//       fillColor: "rgba(230,230,230,0.3)",
//       weight: 1,
//       opacity: 1,
//       color: '#2F2F2F',
//       dashArray: '4',
//       fillOpacity: 0,
//   };
// }

function style(feature) {
    return {
        fillColor: '#999',
        weight: 2,
        opacity: 1,
        color: '#2F2F2F',
        dashArray: '3',
        fillOpacity: 0.35,
        pane: 'barriosPane'
    };
}

map.createPane('barriosPane')
map.getPane('barriosPane').style.zIndex = 200;

L.geoJson(barrios, {style: style}).addTo(map).bringToBack();



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

var myRenderer = L.canvas({ padding: 0.5, zIndex:900});

for (var i = 0; i < points.length; i += 1) {
	L.circleMarker([points[i][0],points[i][1]], {
      renderer: myRenderer,
      radius:convert(points[i][3],surfaceList,radiusList),
      fillOpacity:1,
      fillColor:convert(points[i][2],priceList,colorList),
      stroke:true,
      fillRule:'nonzero',
      color:'black',
      weight:0.2,
    //   pane: 'markerPane'
  }).addTo(map).bindPopup('<b>Precio M2:</b> US$' + points[i][2]+'<br><br><b>Superficie:</b>'+ points[i][3]+'m2');
}


