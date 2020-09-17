function populatePage(data) {
    $('#post-container').html(data.content);
    $('head').append(`<link rel="stylesheet" href="css/${data.postid}.css">`);
}

function getPostFromBackend() {
    var settings = {
        "url": "http://localhost:3000/get/posts",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    $.ajax(settings).done(function (response) {
        //console.log(response);
        populatePage(response[2]);
    });
}



$(document).ready(function () {//run when document is populated
    getPostFromBackend();
});