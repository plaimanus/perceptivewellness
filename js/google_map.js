
var google;

function init() {
    
    var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);

    var marker;
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 59.325, lng: 18.070}
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: 59.327, lng: 18.067}
    });
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
   
}
google.maps.event.addDomListener(window, 'load', init);