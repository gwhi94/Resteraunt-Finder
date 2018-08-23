
$('.modalAdd').css('display','none'); //controlling vis of user input forms
$('.modalReview').css('display','none');



var map; //defines map
var markers = []; //defines array to hold markers pulled from JSON file
var placesArr = []; //defines array to hold places retrieved through places API


 function getLocation(){ //checks to see if user location is available
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(displayLocation);
    }else{
      alert("Could not find your Location!");
    }
 }

function displayLocation(position){ //display location function 
    
  var latitude = position.coords.latitude; //lat of current user position 
  var longitude = position.coords.longitude; //lng of current user position 

  var latLng = new google.maps.LatLng(latitude,longitude); //forms a new google maps latLng object

  initMap(latLng); //calls init map with latLng as argument
  createMarker(latLng); //also calling createMarker function 
  setTimeout(formPlacesData,1200);
  setTimeout(sideBarPop,1150);
  setTimeout(mapControl,1150);
  setTimeout(addReview,1150);
}

function initMap(latLng){ //function to display the map
        //Map options
        var options ={
          zoom:12,
          center:latLng, //map centers on user
          gestureHandling:'greedy'
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
          radius:12047,
          types: ['resteraunt'] //sets type of 'place' to return
        };


        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callBack);
        
        var searchBox = new google.maps.places.SearchBox(document.getElementById('mapSearch'));
        
        google.maps.event.addListener(searchBox,'places_changed',function(){
          var places = searchBox.getPlaces();
          var bounds = new google.maps.LatLngBounds();         
          var i, place;

          for(i=0; place=places[i];i++){          
            bounds.extend(place.geometry.location);
            var newLoc = place.geometry.location;                   
          }
         
          map.fitBounds(bounds);
          map.setZoom(12);
          newArea(newLoc);
          setTimeout(formPlacesData,500);
          setTimeout(sideBarPop,600);


        });
}


function newArea(newLoc){

var request = { 
          location:newLoc,
          radius:12047,
          types: ['resteraunt']
        };

var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callBack);

}







function callBack(results, status){
  if(status == google.maps.places.PlacesServiceStatus.OK){ //checks to see if request was succesful
    for (var i =0; i<results.length; i++){
      var requestDetails ={ //using a request details here, to pull additional information from the API
        placeId:results[i].place_id, //sets place_id as the getDetails request takes a place ID as the place identifier
        fields: ['name', 'formatted_address','review', 'geometry']    //data to be pulled from the API   
    };
 
    service = new google.maps.places.PlacesService(map);
    service.getDetails(requestDetails, callBackDetails);  //getDetails service request then passes to callBackDetails to handle results

  }
}
}

// JUST NEED TO FIND A WAY TO CALL FORMPLACESDATA AGAIN AFTER NEW SEARCH
// and clear markers upon new area search


function callBackDetails(place, status){ //forms retrieved data before calling addMarker and populating map with new markers

if (status == google.maps.places.PlacesServiceStatus.OK) {  
    place['rating'] = []; //in order to pass my newly retrieved places into my addMarker function, i had to manipulate the 'review' structure within the pulled places
                          // so here i set a new object key with name 'rating' and gave it a value of an empty array
    for (var i=0; i<place.reviews.length; i++){ //for loop, to push a new review object to the empty array, taking data from the original Google places retrieval
   
     place['rating'].push({review:place.reviews[i].text,
                           stars:place.reviews[i].rating});    
    }

    placesArr.push(place); //pushes all places to the places Array
  }



}   


function formPlacesData(){ //simple function to loop through places array and call the addMarker function with correct arguments in the correct form

  for (var x=0; x < placesArr.length; x++){ //loops through the resteraunts in the JSON file
          var resteraunt = placesArr[x];
          var location = new google.maps.LatLng(resteraunt.geometry.location.lat(),resteraunt.geometry.location.lng());

          addMarker(map,resteraunt.name,location,resteraunt.formatted_address,resteraunt.rating,resteraunt.avStars,resteraunt.geometry.location.lat(),resteraunt.geometry.location.lng())

  }
}
     


function addMarker(map,name,location,address,reviews,avStars,lat,lng){ //function to display the resteraunts
          

          var marker = new google.maps.Marker({ //creating a new google maps marker
            position:location,
            map:map,
            name:name,
            address:address,
            rating:reviews,
            avStars:avStars,
            lat:lat,
            lng:lng,
            
            
          });

          
          markers.push(marker); //pushes to markers array

          var contentString = name+"<br>"+address //setting up the infoWindow
          var infowindow = new google.maps.InfoWindow({
            
          content:contentString

            
          });

          google.maps.event.addListener(marker, 'click', function(){
            infowindow.open(map,marker); //info window with resteraunt name
            markerReview(this);

          });

          

    }


function markerReview(thisMarker){ //function to allow reviews on marker click
  let name = thisMarker.name;
  let rest = $("h2").filter(function(){
              var text = $(this).text();
              return text === name});

  let targetRest = $(rest).nextAll('button').first();
  $(targetRest).click(); 


 
}



        
function createMarker(latLng){ //displays users current position
  var markerOptions={
    position:latLng,
    map:map,
    clickable:true,
    icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  }

  var marker = new google.maps.Marker(markerOptions);


}





function sideBarPop(filter1,filter2){ //function to control the sidebar resteraunts//passing in filter arguments

  $('#sideBar').empty(); //emptys the sidebar
 

  if (filter1 === undefined){
     filter1 = 1;   
  }if (filter2 === undefined){
     filter2 = 5; 
  }

  
  for (var i =0; i < markers.length;i++){ //loops through the markers array     
      var avStars = 0; 
      var reviews = [];  //array to store reviews per resteraunt 


          if (map.getBounds().contains(markers[i].getPosition()) ){ //checks to see if markers in map bounds
                
                for (var x = 0; x < markers[i].rating.length; x++){ //nested for loop to pull out all star ratings then find and average and round to INT              
                      avStars += Math.round(markers[i].rating[x].stars/markers[i].rating.length);


                  if (avStars > 5){ //catches round errors if they are greater than the max stars
                    avStars = 5;
                  }                  
                markers[i].avStars = avStars;

                }

                for (var x = 0; x < markers[i].rating.length; x++){             
                    
                    reviews.push(markers[i].rating[x].review+"</br>"); //pushes reviews to the array                    
                    reviews.push("<b>"+markers[i].rating[x].stars+" Stars"+"</b>");
                    reviews.push('</br>');
                    reviews.push('</br>');
                    
                  }
 
if ((markers[i].avStars >= filter1) && (markers[i].avStars <= filter2) || (markers[i].avStars == 0)){
  
  markers[i].setMap(map);
 
  var sideBarDiv = $(

    "<div id = 'infoDiv'>"+
    "<h2 id='restName'>"+markers[i].name+"</h2>"+ //controls the markers information displayed in the side bar
    "<h3 class='infoNames'>Address: </h3>"+markers[i].address+
    "<h3 class ='infoNames'>Average Stars: </h3>"+markers[i].avStars+
                          
    "<h4 class='reviewLink'>Show Reviews</h4>"+
    "<div class='reviewHolder'>"+"</br>"+reviews.join(' ')+
    "<img src='https://maps.googleapis.com/maps/api/streetview?size=200x200&location="
    +markers[i].lat+","+markers[i].lng+"&key=AIzaSyAoHv4k8hPjT1cFGfULh72Ngew8MGYSdr0'"+
    "</div>"+

    "</div>"+
    "<button type='button' class='writeReviewBtn btn btn-primary' onclick ='writeReview(this)'>Write Review</button>"+
    "<button type ='button' class='addReviewBtn btn btn-success' disabled='disabled'>Add Review</button>"+
    "<div id ='sideBarDivider'</div>"
    )

             
    $("#sideBar").append(sideBarDiv); //appends the dynamic div to the sidebar  
        
   }else{markers[i].setMap(null)}

   } 
}
          
    $('.reviewHolder').hide();
    $(".reviewLink").click(function(){
       $(this).next('.reviewHolder').toggle();        
          $(this).text(function(_,oldText){
            return oldText === 'Hide Reviews' ? 'Show Reviews':'Hide Reviews';
                
             });

  });

addReview(filter1,filter2);

}


function mapControl(filter1,filter2) { //function to detect map change and handle assoc
                                        //events

google.maps.event.addListener(map,'click', function(event) {formControl(event)});


google.maps.event.addListener(map, 'dragend', function() {sideBarPop(filter1,filter2),addReview(filter1,filter2)} );

}


function getFilter(){ //handling filter inputs 
  $("#starsFilter1").blur();
  $("#starsFilter2").focus();
  var filter1 = document.getElementById("starsFilter1").value;
  var filter2 = document.getElementById("starsFilter2").value;
  sideBarPop(filter1,filter2);
  mapControl(filter1,filter2);
}




function addReview(filter1,filter2){
  
  $(".addReviewBtn").off().on('click', function(event){
      event.stopPropagation();
      event.preventDefault();
      
     
      let newStar = document.getElementById('Ustars').value;
      let newReview = document.getElementById('Urev').value;       
      let restName = $(this).prevAll('#restName').html(); 
 
      var index = markers.findIndex (x => x.name == restName);
      markers[index].rating.push({stars:newStar, review:newReview})
      sideBarPop(filter1,filter2);
     
      //this works by first grabbing resteraunt name from clicked div using prevAll
      //then searches through array of markers for resteraunt      
      //that matches the pulled name
      //then finds the index of that resteraunt
      //then pushes the new reviews to the correct object in array

  });
}

function writeReview(thisBtn){
   $('.modalReview').css('display','flex');   
   $(thisBtn).css('display', 'none');
   $(thisBtn).next().prop('disabled',false);
   
}


function addResteraunt(event){
  
  let newLat = event.latLng.lat();
  let newLng = event.latLng.lng();
  let newName = document.getElementById('Uname').value;
  let newAddress = document.getElementById('Uadd').value;
  let newReviews = [];
  let newAvStars = 0;
  let location = new google.maps.LatLng(newLat,newLng);
 
  addMarker(map,newName,location,newAddress,newReviews,newAvStars,newLat,newLng);
  sideBarPop();

}


function formControl(event){
  $('.modalAdd').css('display','flex');
  
  $("#formClose").off().on('click', function(){
    addResteraunt(event);

});

}

function closeForm(){
  $('.modalReview').css('display','none');
  $('.modalAdd').css('display','none');
  $('.writeReviewBtn').prop('disabled', false);
  $('.writeReviewBtn').css('display', 'inline-block');
  $('.addReviewBtn').prop('disabled',true);
}



