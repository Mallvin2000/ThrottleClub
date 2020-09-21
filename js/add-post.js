
function checkImages() {
    var file = $('#imageFile')[0].files;
    console.log(file);
    var totalFileSize = 0;
    var imagesNames = [];

    for (let i = 0; i < file.length; i++) {
        console.log(file[i].name);
        imagesNames.push(file[i].name);
        
    }

    return imagesNames
}



function sendDataToBackend(event) {
    event.preventDefault();
    //var images = ["abc", "123"];
    /* var content = ``;
    content += $('#txt_content').val();
 */

    var images = checkImages();
    var categoryId = parseInt($("#category-select option:selected").val());
    var settings = {
        "url": "http://localhost:3000/insert/post",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        },
        "data": {
            "title": $('#txt_title').val(),
            "date": $('#txt_date').val(),
            "author": $('#txt_author').val(),
            "content": $('#txt_content').val(),
            "subContent": $('#txt_sub_content').val(),
            "images": images,
            "categoryId": categoryId
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
    $('#add-post-form').submit(sendDataToBackend);
}


$(document).ready(function () {//run when document is populated
    registerAddPostForm();
});