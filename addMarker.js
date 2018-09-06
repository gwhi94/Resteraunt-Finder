var selectedInfoWindow;


function addMarker(map,name,location,address,reviews,avStars,lat,lng,website,phone){ //function to display the resteraunts
          
          var marker = new google.maps.Marker({ //creating a new google maps marker
            position:location,
            map:map,
            name:name,
            address:address,
            rating:reviews,
            avStars:avStars,
            website:website,
            phone:phone,
            lat:lat,
            lng:lng,
            animation: google.maps.Animation.DROP
            
            
          });

          
          markers.push(marker); //pushes to markers array


          google.maps.event.addListener(marker, 'click', function(){
           $('#targetName').html(this.name);
            markerReview(this);

          });

          google.maps.event.addListener(marker,'mouseover',function(){

          var starsHolder;
          starsHolder = this.avStars;

          var websiteTag = "Website"; //forms wesbite link
          var websiteLink = websiteTag.link(website);
          var contentString = name+"<br>"+address+"<br>"+websiteLink+"<br>"+phone+"<br>"+"Stars: "+starsHolder //setting up the infoWindow
          var infowindow = new google.maps.InfoWindow({
            
          content:contentString

        });

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