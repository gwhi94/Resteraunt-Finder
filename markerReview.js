function markerReview(thisMarker){ //function to allow reviews on marker click
  let name = thisMarker.name;
  let rest = $("h2").filter(function(){
              var text = $(this).text();
              return text === name});

  let targetRest = $(rest).nextAll('button').first();
  $(targetRest).click(); 

  var isolateDiv = $(rest).parent();  //hiding other resteraunts except selected one
  $(isolateDiv).siblings().hide();


 
}