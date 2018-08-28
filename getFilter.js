function getFilter(){ //handling filter inputs 
  $("#starsFilter1").blur();
  $("#starsFilter2").focus();
  var filter1 = document.getElementById("starsFilter1").value;
  var filter2 = document.getElementById("starsFilter2").value;
  sideBarPop(filter1,filter2);
  mapControl(filter1,filter2);
}
