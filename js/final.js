let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slides");
    
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    
    slideIndex++;
    if (slideIndex > slides.length) { 
        slideIndex = 1;
    }
    
    
    slides[slideIndex - 1].style.display = "block";
    
    
    setTimeout(showSlides, 3000);
}


window.onload = function() {
    showSlides();
};

function initMap() {
    var location = { lat: -34.397, lng: 150.644 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: location
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });

    var styledMarker = new google.maps.Marker({
        position: { lat: -33.867, lng: 151.207 },
        map: map,
        icon: ''
    });

    var infoWindow = new google.maps.InfoWindow({
        content: '<h3>Custom Marker Location</h3><p>This is a custom marker on the map.</p>'
    });

    styledMarker.addListener('click', function() {
        infoWindow.open(map, styledMarker);
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(userLocation);
            var userMarker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'Your Location'
            });
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
