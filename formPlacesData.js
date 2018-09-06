function formPlacesData(placesArr){ //simple function to loop through places array and call the addMarker function with correct arguments in the correct form


  for (var x=0; x < placesArr.length; x++){ //loops through the resteraunts in the JSON file
          var resteraunt = placesArr[x];
          var location = new google.maps.LatLng(resteraunt.geometry.location.lat(),resteraunt.geometry.location.lng());

          addMarker(map,resteraunt.name,location,resteraunt.formatted_address,resteraunt.rating,resteraunt.avStars,
          	resteraunt.geometry.location.lat(),resteraunt.geometry.location.lng(),resteraunt.website,resteraunt.formatted_phone_number)
          
  }
}