function callBack(results, status){
  if(status == google.maps.places.PlacesServiceStatus.OK){ //checks to see if request was succesful
    for (var i =0; i<results.length; i++){
      var requestDetails ={ //using a request details here, to pull additional information from the API
        placeId:results[i].place_id, //sets place_id as the getDetails request takes a place ID as the place identifier
        fields: ['name', 'formatted_address','review', 'geometry','website','formatted_phone_number']    //data to be pulled from the API   
    };
 
    service = new google.maps.places.PlacesService(map);
    service.getDetails(requestDetails, callBackDetails);  //getDetails service request then passes to callBackDetails to handle results

  }
}
}