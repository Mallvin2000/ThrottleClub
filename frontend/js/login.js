function sendDataToBackend(event) {
    event.preventDefault();

    var settings = {
        "url": "https://throttle-club.herokuapp.com/login",//when update button is pressed, it calls this API in app.js which then process it just like postman. only difference is that browser is calling api instead of postman
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "username": $("#txt_username").val(),
            "password": $("#txt_password").val()
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.token);//extracting only the string of the token
       /*  if (response.length == 0) {
            console.log("Invalid username/password");
        } */
        localStorage["token"] = response.token;//store token value into the browsers cookies/storage
        window.location.href = "admin-dashboard.html";//transfer user by adding it to the url bar. changes the url and takes us to that page
    })
    .fail((response) => {
        $('#error-msg').html(`<p>Invalid username/password</p>`);//when backend returns a error when pass/username combo doesnt exist
        //alert("ERROR");
    });;
}


function registerCreateAccountForm() {
$('#create-account-form').submit(sendDataToBackend);//listen for the submit action of the form
}


$(document).ready(function () {//run when document is populated
registerCreateAccountForm();//send data from backend once page is fully loaded

});