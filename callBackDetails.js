
function callBackDetails(place, status){ //forms retrieved data before calling addMarker and populating map with new markers

var placesArr=[];

if (status == google.maps.places.PlacesServiceStatus.OK) {  
    place['rating'] = []; //in order to pass my newly retrieved places into my addMarker function, i had to manipulate the 'review' structure within the pulled places
                          // so here i set a new object key with name 'rating' and gave it a value of an empty array
    for (var i=0; i<place.reviews.length; i++){ //for loop, to push a new review object to the empty array, taking data from the original Google places retrieval
   
     place['rating'].push({review:place.reviews[i].text,
                           stars:place.reviews[i].rating});    
    }

    placesArr.push(place); //pushes all places to the places Array
    formPlacesData(placesArr);
  }


}   