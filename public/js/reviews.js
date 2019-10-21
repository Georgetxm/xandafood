function fetchReviews()
{
    var request = new XMLHttpRequest();

    request.open("GET", review_url, true);

    request.onload = function(){
        review_array = JSON.parse(request.responseText);
        displayReviews();
    };

    request.send();
}

function displayReviews() {
    var reviewBody = document.getElementById("emptyReview");
    var totalReviews = parseInt(review_array.length);

    for (var count = (totalReviews-1); count > (totalReviews-6); count--) {
        var reviewId = review_array[count].review_id;
        var email = review_array[count].user_id;
        var comment = review_array[count].comment;
        var datePosted = review_array[count].date_posted;

        var cell = '<div class="col-md-12 list-group-item reviewTab" item="' + count +'" onClick = "focusReview(this)" style="cursor: pointer;">\
                        <h4 class="text-left" >' + email +'</h4>\
                        <p>' + comment + '\
                        </p>\
                        <div class="row">\
                            <div class="col-md-9 pull-right">\
                                <p>' + datePosted +'</p>\
                            </div>\
                        </div>\
                    </div>';
        document.getElementById("emptyReview").insertAdjacentHTML('beforebegin', cell);
    }
}

function newReview() {
    var reviewModal = new Modal (document.getElementById("reviewModal"));

    if (sessionStorage.getItem('email') != null) {
        reviewModal.show();

    document.getElementById("Cemail").value = sessionStorage.getItem("email");
    document.getElementById("userComments").value = "";
    }
    else {
        getLoginForm();
    }
    
}

function addReview() {
    var reviewModal = new Modal (document.getElementById("reviewModal"));
    var review = new Object();

    reviewModal.hide();

    review.username = document.getElementById('Cemail').value;
    review.comment = document.getElementById('userComments').value;

    var postReview = new XMLHttpRequest();

    postReview.open("POST", review_url, true);
    postReview.setRequestHeader("Content-Type", "application/json");

    postReview.onload = function() {
        fetchReviews();
        var addedModal = new Modal (document.getElementById("addedModal"));
        addedModal.show();
    };

    postReview.send(JSON.stringify(review));    

}

function focusReview(element) {

    var item = parseInt(element.getAttribute("item")) ;
    var focusReviewModal = new Modal (document.getElementById("focusReviewModal"));
    console.log(review_array[item].user_id);
    if (sessionStorage.getItem("email") != review_array[item].user_id) {
        $('#editReview').attr('style', 'visibility: hidden;');
        $('#deleteReview').attr('style', 'visibility: hidden;');
    } else
    {
        $('#editReview').attr('style', 'visibility: visible;');
        $('#deleteReview').attr('style', 'visibility: visible;');
    }
    sessionStorage.setItem("reviewId", review_array[item].review_id);
    document.getElementById("FCemail").value = review_array[item].user_id;
    document.getElementById("FCComments").value = review_array[item].comment;
    focusReviewModal.show();
}

function edittReview () {
    var focusReviewModal = new Modal (document.getElementById("focusReviewModal"));
    var editReviewModal = new Modal (document.getElementById("editReviewModal"));

    focusReviewModal.hide();
    editReviewModal.show();
        
}

function sendUpdatedReview() {

    var editReviewModal = new Modal(document.getElementById("editReviewModal"));

    var updatedComment = new Object();

    var edit_review_url = review_url + "/" + sessionStorage.getItem("reviewId");
    console.log(edit_review_url);
    var updateReview = new XMLHttpRequest();
    updateReview.open("PUT", edit_review_url, true);
    updateReview.setRequestHeader("Content-Type", "application/json");
    updatedComment.username = document.getElementById("FCemail").value;
    updatedComment.comment = document.getElementById("EdComments").value;

    updateReview.onload = function () {
        editReviewModal.hide();
        alert("Review has been updated");
        fetchReviews();
    }


    updateReview.send(JSON.stringify(updatedComment));
    console.log(JSON.stringify(updatedComment));
}

function deleteeReview() {
    var response = confirm("Are you sure you want to delete this review?");

    if (response == true) {
        var focusReviewModal = new Modal (document.getElementById("focusReviewModal"));
        focusReviewModal.hide();
        

        var delete_review_url = review_url + "/" + sessionStorage.getItem("reviewId");
        
        var eraseReview = new XMLHttpRequest();

        eraseReview.open("DELETE", delete_review_url, true);
        eraseReview.onload = function() {
            
            alert("Review has been deleted")
            fetchReviews();
        };

        eraseReview.send();
    }
}

