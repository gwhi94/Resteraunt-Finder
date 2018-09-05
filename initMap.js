$('.modalAdd').css('display','none'); //controlling vis of user input forms
$('.modalReview').css('display','none');

var map; //defines map
var markers = []; //defines array to hold markers pulled from JSON file
var placesArr = []; //defines array to hold places retrieved through places API

function initMap(latLng){ //function to display the map
        //Map options
        var options ={
          zoom:12,
          center:latLng, //map centers on user
          gestureHandling:'greedy' //allows zooming without cntrl key
        };

        //creating a new google map
        map = new google.maps.Map(document.getElementById('map'),options);

        for (var x=0; x < resteraunts.length; x++){ //loops through the resteraunts in the JSON file
          var resteraunt = resteraunts[x];
          var location = new google.maps.LatLng(resteraunt.lat,resteraunt.lng); //sets location as the lat lng from restraunts within the JSON
         
          addMarker(map, resteraunt.resterauntName,location,resteraunt.address,resteraunt.ratings,resteraunt.avStars,resteraunt.lat,resteraunt.lng);
          //passes resteraunts to addMarker function
        }

        var request = { //sets up request to be passed as an argument to the google service.nearbySearch
          location:latLng,
          radius:14047,
          types: ['resteraunt'] //sets type of 'place' to return
        };


        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callBack);
        
        var searchBox = new google.maps.places.SearchBox(document.getElementById('mapSearch'));
        
        google.maps.event.addListener(searchBox,'places_changed',function(){ //listens for a new area search 
          
          
          for (var i=0; i<markers.length;i++){ //removes current markers from map and emptys array
            markers[i].setMap(null);
          }

          markers.length = 0;

          for (var x = 0; i<placesArr.length;x++){ //removes google places markers from map
            placesArr[x].setMap(null);
          }

          var places = searchBox.getPlaces(); //pulls places from searchbox search
          var bounds = new google.maps.LatLngBounds(); //sets new bounds                
          var p, place;

          for(p=0; place=places[p];p++){          
            bounds.extend(place.geometry.location);
            var newLoc = place.geometry.location;                   
          }

          map.fitBounds(bounds);
          map.setZoom(12);
          newArea(newLoc);
          setTimeout(sideBarPop,700);


        });
}