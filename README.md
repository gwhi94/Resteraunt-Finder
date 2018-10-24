# Project 8 - Launch your own restaurant review site
### OpenClassrooms 

 **1** -Obtain a Google Maps and geolocation API <br/>
 **2** - Integrate a Google Map into the website <br/>
 **3** - Create and style the website <br/>
 **4** - Import resteraunts and reviews from JSON <br/>
 **5** - Show resteraunts on map <br/> 
 **6** - Allow users to leave reviews and add their own resteraunts <br/>
 **7** - Use Google Places API to populate the map with real-world resteraunts, pull data from these resteraunts
 <br/>
 ### Skills Developed
 * External API use
 * JavaScript
 * jQuery
 * Develop a full JavaScript application according to a specification
 
 ### Setup
 
 ```
 open index.html
 allow location access
 
 ```
 
 ![resteraunt](https://user-images.githubusercontent.com/40371755/47438455-655bf800-d7a2-11e8-8f49-4613805b3644.png)
<br/>
 ### Example Code
 
 ```JavaScript
 function callBackDetails(place, status){ //forms retrieved data before calling addMarker and populating map with new markers

var placesArr=[];

if (status == google.maps.places.PlacesServiceStatus.OK) {  
    place['rating'] = []; 
    
    //in order to pass my newly retrieved places into my addMarker function, i had to manipulate the 'review' structure within the           pulled places
    // so here i set a new object key with name 'rating' and gave it a value of an empty array
    
    for (var i=0; i<place.reviews.length; i++){ 
    //for loop, to push a new review object to the empty array, taking data from the original Google places retrieval
   
     place['rating'].push({review:place.reviews[i].text,
                           stars:place.reviews[i].rating});    
    }

    placesArr.push(place); //pushes all places to the places Array
    formPlacesData(placesArr);
  }

