var mapboxAccessToken = "pk.eyJ1IjoibHVjY2hpbmkyMDIiLCJhIjoiY2s0ZjAydWsxMGpldzNkbzdxM2YwM2pzeiJ9.yeXrZv8dt3jP9lZDPpoRVQ";
var map = L.map('map').setView([-34.610824, -58.451452], 12);


// Fondo Mapbox
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


L.Routing.control({
    waypoints: [
      L.latLng(-34.610824, -58.451452),
      L.latLng(-34.613824, -58.452452)
    ]
  }).addTo(map);
