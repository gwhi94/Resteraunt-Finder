function addResteraunt(event){
  
  
  let newLat = event.latLng.lat();
  let newLng = event.latLng.lng();
  
  const Url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+newLat+","+newLng+"+&key=AIzaSyAoHv4k8hPjT1cFGfULh72Ngew8MGYSdr0";
  //Url for submitting a geocoding API request
  var newAddress;  
  $.getJSON(Url, function(result){ //makes a getJSON request to reverse geocode latLng into a formatted address
    newAddress = result.results[0].formatted_address;

  let newName = document.getElementById('Uname').value;
  let newReviews = [];
  let newAvStars = 0;
  let location = new google.maps.LatLng(newLat,newLng);
  
   
  addMarker(map,newName,location,newAddress,newReviews,newAvStars,newLat,newLng);
  sideBarPop(); //adds marker with new data

});
}
