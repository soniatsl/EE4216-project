var pos = {lat: 999, lng: 999};
var map;
var marker;
var bankMarkers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 22.288, lng: 114.1937}
    });
    map.addListener('click', function(e) {
        placeCurrentPositionMarker(e.latLng);
    });
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            console.log('places.length is 0', places);
            return;
        }
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            console.log(places, places.length);
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            if (places.length === 1) {
                placeCurrentPositionMarker(place.geometry.location);
            }
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
        });
    map.fitBounds(bounds);
    });
}

function placeCurrentPositionMarker(position) {
        if (marker != null) {
           marker.setMap(null); 
        }
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'Your current position',
            icon: './assets/curPos.png'
        });
        map.panTo(position);
        pos = position;    
}

$('#curPosBtn').click(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
                let coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                placeCurrentPositionMarker(coords);
            }, () => {alert('Getting current location failed.');}
        );
    } else{
        alert("Sorry, your browser does not support geolocation services.");
    }
});

$('#searchBtn').click(function() {
    if (pos.lat === 999 && pos.lng === 999) {
        alert('Please choose your location before searching!');
        return;
    }
    if ($('#selectBank').val() === null) {
        alert('Please choose a bank before searching!');
        return;
    }


    //Parameters for our places request
    var request = {
        location: pos,
        radius: '2000',
        query: $('#selectBank').val()
    };
    //Make the service call to google
    var callPlaces = new google.maps.places.PlacesService(map);
    callPlaces.textSearch(request, function(results,status){
        if (bankMarkers.length > 0) {
            for (let each of bankMarkers) {
                each.setMap(null);
            }
        }

        //trace what Google gives us back
        $.each(results, function(i,place){
            let temp = place.name.toLowerCase();
            if (temp.includes('atm') || temp.includes('櫃員機')) {
                console.log(temp);
            } else {
                var placeLoc = place.geometry.location;
                bankMarkers.push(new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    title: place.name
                    })
                );                
            }

        })
    });
});