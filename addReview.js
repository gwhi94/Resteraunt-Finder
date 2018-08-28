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