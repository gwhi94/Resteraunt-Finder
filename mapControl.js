
function mapControl(filter1,filter2) { //function to detect map change and handle associated
                                        //events

google.maps.event.addListener(map,'click', function(event) {formControl(event)});


google.maps.event.addListener(map, 'dragend', function() {sideBarPop(filter1,filter2),addReview(filter1,filter2)} );


google.maps.event.addListener(map,'rightclick',function(event){ //listens for right click and re pops map with new location
	
	for (var i=0; i<markers.length;i++){ //removes current markers from map and emptys array
            markers[i].setMap(null);
          }

          markers.length = 0;

          for (var x = 0; i<placesArr.length;x++){ //removes google places markers from map
            placesArr[x].setMap(null);
          }

	map.setCenter(event.latLng)

	 let request = {
		location:event.latLng,
		radius:8000,
		type:['resteraunt']
	};

	service.nearbySearch(request, callBack);
	setTimeout(sideBarPop,1100);
})

}