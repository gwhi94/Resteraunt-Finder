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
            infowindow.open(map,marker); //info window with resteraunt name
            markerReview(this);

          });

       

    }