function getLocation(){ //checks to see if user location is available
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(displayLocation);
    }else{
      alert("Could not find your Location!");
    }
 }