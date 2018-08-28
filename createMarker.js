function createMarker(latLng){ //displays users current position
  var markerOptions={ //defines marker options
    position:latLng,
    map:map,
    clickable:true,
    icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  }

  var marker = new google.maps.Marker(markerOptions);


}