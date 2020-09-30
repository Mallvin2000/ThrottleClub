
function sendDataToBackend(event) {
    event.preventDefault();

    var settings = {
        "url": "https://throttle-club.herokuapp.com/insert/message",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "name": $('#txt_name').val(),
            "email": $('#txt_email').val(),
            "message": $('#txt_textArea').val()
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        //location.reload();
        $('#message').html(`<p class="text-center" style="color: green;">Message Sent!</p>`);
        setTimeout(() => { 
           location.reload();
        }, 5000)//after 5 seconds, call the callback function to make the page reload
    })
        .fail((response) => {
            $('#message').html(`<p class="text-center" style="color: red;">Invalid Input!</p>`);
        });
}



function registerSubmitMessageForm() {
    $('#message-form').submit(sendDataToBackend)
}




$(document).ready(function () {
    registerSubmitMessageForm();

});