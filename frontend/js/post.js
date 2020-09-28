
function populatePage(data) {
    $('#post-container').html(data.content);
    $('head').append(`<link rel="stylesheet" href="css/post-styling/postId-${data.postid}.css">`);
}

function getPostFromBackend(postId) {
    var settings = {
        "url": "http://localhost:3000/get/post/" + postId,
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



function populateCommentSection(data) {
    for (let i = 0; i < data.length; i++) {
        $('#comments-container').append("<div class=\"comment comment" + i + " col-sm-12\" style=\"border: 1px solid black;padding:20px\"></div>");//add border to seperate comments
        $('.comment'+i).append("<p class=\"text-left\"><span style=\"font-weight: bold;\">" + data[i].name +"</span> says:</p>")
        $('.comment'+i).append("<p class=\"text-left\">Posted on: " + data[i].date +"</p>")
        $('.comment'+i).append(`<div class="comment-content" style="margin-top: 5%;"><p class="text-center">${data[i].comment}</p>`)
        
    }
}


function getCommentsFromBackend() {
    var settings = {
        "url": "http://localhost:3000/get/comments",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        populateCommentSection(response)
    });
}


function registerPostId() {
    var postId = window.location.href.split("postId=")[1];
    //console.log(postId);
    getPostFromBackend(postId)
}


function insertNewCommentToBackend(event) {
    event.preventDefault();
    var date = new Date();
    var postId = parseInt(window.location.href.split("postId=")[1]);
    var settings = {
        "url": "http://localhost:3000/insert/comment",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "name": $('#txt_name').val(),
            "comment": $('#txt_comment').val(),
            "date": date,
            "postId": postId
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("Added sucessfully")
        location.reload();
    })
        .fail((response) => {
            alert("ERROR");
        });
}

function registerLeaveCommentForm() {
    $('#comment-form').submit(insertNewCommentToBackend)
}


$(document).ready(function () {//run when document is populated
    registerPostId();
    getCommentsFromBackend();
    registerLeaveCommentForm();
});
