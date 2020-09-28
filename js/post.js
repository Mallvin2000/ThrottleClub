
function populatePage(data) {
    $('#post-container').html(data.content);
    $('head').append(`<link rel="stylesheet" href="css/post-styling/postId-${data.postid}.css">`);
}

function getPostFromBackend(postId) {
    var settings = {
        "url": "http://localhost:3000/get/post/"+postId,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        populatePage(response[0]);//because will only return 1 post, so take the first item in the 1 item array
    });
}


function registerPostId() {
    var postId = window.location.href.split("postId=")[1];
    //console.log(postId);
    getPostFromBackend(postId)
}


$(document).ready(function () {//run when document is populated
    registerPostId();
});
