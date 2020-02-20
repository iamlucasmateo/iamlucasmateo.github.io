var mapboxAccessToken = "pk.eyJ1IjoibHVjY2hpbmkyMDIiLCJhIjoiY2s0ZjAydWsxMGpldzNkbzdxM2YwM2pzeiJ9.yeXrZv8dt3jP9lZDPpoRVQ";
var map = L.map('map').setView([-34.610824, -58.451452], 12);
var go = document.querySelector('#go')
var pointA = document.querySelector('#pointA')


// Fondo Mapbox
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


function goFunc(latA,lonA,latB,lonB) {
  L.Routing.control({
    waypoints: [
      L.latLng(latA, lonA),
      L.latLng(latB, lonB)
    ],
    router: L.Routing.mapbox(mapboxAccessToken)
  }).addTo(map);
}

go.addEventListener('click',function(){
  let coordA = pointA.value.split(' ')
  let coordB = pointB.value.split(' ')
  let latA = parseFloat(coordA[0]);
  let lonA = parseFloat(coordA[1]);
  let latB = parseFloat(coordB[0]);
  let lonB = parseFloat(coordB[1]); 
  goFunc(latA,lonA,latB,lonB)
})

