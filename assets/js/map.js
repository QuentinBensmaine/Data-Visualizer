//Map
var mymap = L.map('myMap').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicXVlbnRpbmJlbnNtYWluZSIsImEiOiJja20yNTQzbmQwNXk1MnJucjBzMmsxbngxIn0.LgHAnZAb-5ZVx431TK787g'
}).addTo(mymap);
let marker

//------------------------------------------------------------------------------\\

//Get API
get = function(url) {
    fetch(url)
        .then(response => response.json())
        .then(function(data) {
            all = data.people;
            let newtable = [];
            for (let id = 0; id < all.length; id++) {
                marker = L.marker([all[id].contact.location.lat, all[id].contact.location.lon]).addTo(mymap);
                marker.bindPopup("<b>" + all[id].firstname + " " + all[id].lastname + "</b>")
            }
        });
};
get('https://run.mocky.io/v3/70e5b0ad-7112-41c5-853e-b382a39e65b7');