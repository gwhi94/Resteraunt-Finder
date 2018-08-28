function newArea(newLoc){

var request = { 
          location:newLoc,
          radius:12047,
          types: ['resteraunt']
        };

var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callBack);

}