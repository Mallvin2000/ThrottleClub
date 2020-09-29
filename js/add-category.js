

function sendDataToBackend(event) {
    event.preventDefault();

    var settings = {
        "url": "https://throttle-club.herokuapp.com/insert/category",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        },
        "data": {
            "name": $('#txt_name').val()
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

function registerAddPostForm() {
    $('#add-category-form').submit(sendDataToBackend);
}


$(document).ready(function () {//run when document is populated
    registerAddPostForm();
});