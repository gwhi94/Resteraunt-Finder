
function mapControl(filter1,filter2) { //function to detect map change and handle assoc
                                        //events

google.maps.event.addListener(map,'click', function(event) {formControl(event)});


google.maps.event.addListener(map, 'dragend', function() {sideBarPop(filter1,filter2),addReview(filter1,filter2)} );

}