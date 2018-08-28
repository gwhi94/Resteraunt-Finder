function formControl(event){ //function to handle the opening and closing of the add resteraunt form
  $('.modalAdd').css('display','flex');
  
  $("#formClose").off().on('click', function(){
    addResteraunt(event);

});

}
