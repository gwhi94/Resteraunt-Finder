function closeForm(){ //function to handle the closing of the modal input form
  $('.modalReview').css('display','none');
  $('.modalAdd').css('display','none');
  $('.writeReviewBtn').prop('disabled', false);
  $('.writeReviewBtn').css('display', 'inline-block');
  $('.addReviewBtn').prop('disabled',true);
}