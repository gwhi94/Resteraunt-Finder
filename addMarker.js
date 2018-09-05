var selectedInfoWindow;


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
            animation: google.maps.Animation.DROP
            
            
          });

          
          markers.push(marker); //pushes to markers array


          var contentString = name+"<br>"+address //setting up the infoWindow
          var infowindow = new google.maps.InfoWindow({
            
          content:contentString

            
          });

          google.maps.event.addListener(marker, 'click', function(){
            markerReview(this);

          });

          google.maps.event.addListener(marker,'mouseover',function(){
            
            //checks to see if infowindow is open already, if it is, then close it and open new infowindow
            if(selectedInfoWindow != null && selectedInfoWindow.getMap() != null){
              selectedInfoWindow.close();
            }

            if(selectedInfoWindow == infowindow){
              selectedInfoWindow = null;
              return;
            }

          

          selectedInfoWindow = infowindow;
          selectedInfoWindow.open(map,marker);

          });

       

    }