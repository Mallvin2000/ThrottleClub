function sendDataToBackend(event) {
    event.preventDefault();

    var settings = {
        "url": "http://localhost:3000/insert/user",//when update button is pressed, it calls this API in app.js which then process it just like postman. only difference is that browser is calling api instead of postman
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"//,
            //"Authorization": "Bearer " + localStorage["token"]
        },
        "data": {
            "username": $("#txt_username").val(),
            "password": $("#txt_password").val()
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("Update Successful");
        window.location.href = "login.html";
    });
}


function registerCreateAccountForm() {
$('#create-account-form').submit(sendDataToBackend);//listen for the submit action of the form
}


$(document).ready(function () {//run when document is populated
registerCreateAccountForm();//send data from backend once page is fully loaded

});