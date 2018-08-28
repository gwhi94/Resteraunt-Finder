function writeReview(thisBtn){
   $('.modalReview').css('display','flex');   
   $(thisBtn).css('display', 'none');
   $(thisBtn).next().prop('disabled',false);
   
}
