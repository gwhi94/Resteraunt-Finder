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
                          
    "<h4 class='reviewLink'>Show Reviews"+"("+markers[i].rating.length+")"+"</h4>"+
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


/*function mapControl(filter1,filter2) { //function to detect map change and handle assoc
                                        //events

google.maps.event.addListener(map,'click', function(event) {formControl(event)});


google.maps.event.addListener(map, 'dragend', function() {sideBarPop(filter1,filter2),addReview(filter1,filter2)} );

}*/