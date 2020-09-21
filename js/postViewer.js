const paginationQuery = {
    limit: 5,//limit is page size
    offset: 0//offset is page number
}

const paginationFunction = {
    gotoFirstPage: function () {
        paginationQuery["offset"] = 0;
    },
    changePage: function (delta) {
        paginationQuery["offset"] += parseInt(delta);
    },
    changePageSize: function (newPageSize) {
        //console.log(newPageSize);

        paginationQuery["limit"] = newPageSize
    }
}

function modal() {
    console.log("ENTER");
    // Get the modal
    var modal = $("#myModal");

    // Get the button that opens the modal
    var btn = $('.btn-update');

    // Get the Close button that opens the modal
    var btnClose = $('.btn-close');

    // Get the <span> element that closes the modal
    var span = $(".close");

    // When the user clicks on the button, open the modal
    btn.click(function () {
        console.log("Pressed");
        modal.attr("style", "display:block");
    })


    // When the user clicks on <span> (x), close the modal
    span.click(function () {
        modal.attr("style", "display:none");
        $(".modal-body").empty();//to clear what ever is appended when the submit is clicked. like refreshing the page
        $(".modal-title-container").empty();
    }
    )

    // When the user clicks on <button> close, close the modal
    btnClose.click(function () {
        modal.attr("style", "display:none");
        $(".modal-body").empty();//to clear what ever is appended when the submit is clicked. like refreshing the page
        $(".modal-title-container").empty();
    }
    )


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.attr("style", "display:none");
        }
    }
}


function modalDelete() {
    console.log("ENTER");
    // Get the modal
    var modal = $("#myModal");

    // Get the button that opens the modal
    var btn = $('.btn-delete');

    // Get the Close button that opens the modal
    var btnClose = $('.btn-close');

    // Get the <span> element that closes the modal
    var span = $(".close");

    // When the user clicks on the button, open the modal
    btn.click(function () {
        console.log("Pressed");
        modal.attr("style", "display:block");
    })


    // When the user clicks on <span> (x), close the modal
    span.click(function () {
        modal.attr("style", "display:none");
        $(".modal-body").empty();//to clear what ever is appended when the submit is clicked. like refreshing the page
        $(".modal-title-container").empty();
    }
    )

    // When the user clicks on <button> close, close the modal
    btnClose.click(function () {
        modal.attr("style", "display:none");
        $(".modal-body").empty();//to clear what ever is appended when the submit is clicked. like refreshing the page
        $(".modal-title-container").empty();
    }
    )


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.attr("style", "display:none");
        }
    }
}



function updateDataInBackend(event) {
    event.preventDefault();
 
    var settings = {
        "url": "http://localhost:3000/update/post",
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        },
        "data": {
            "title": $("#txt_title").val(),
            "date": $("#txt_date").val(),
            "author": $("#txt_author").val(),
            "content": $("#txt_content").val(),
            "subContent": $("#txt_sub_content").val(),
            "categoryId": $("#txt_categoryId").val()

        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        //populateTable(response)
    });
}


function registerUpdateRecordForm(id) {
    $(`#update-post-${id}`).submit(updateDataInBackend)
}

function populateOptions(data) {


        for (let i = 0; i < data.length; i++) {
            $('#delete-' + data[i].postid).on("click", (event) => {
                console.log("Clicked");
                $(".modal-body").append(`<p>Are you sure you want to DELETE this post?</p>`)
                $(".modal-body").append(`<button id="delete-button-${data[i].postid}" type="submit" class="btn btn-danger">DELETE</button>`)
                $(`#delete-button-${data[i].squatid}`).on("click", (event) => {
                    console.log("deleting" + data[i].postid);

                    var settings = {
                        "url": "https://strength-visualiser.herokuapp.com/squat/delete/" + data[i].squatid,
                        "method": "DELETE",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": "Bearer " + localStorage["token"]
                        }
                    };

                    $.ajax(settings).done(function (response) {//response array holds a return/result object
                        //console.log("Login Success");
                        location.reload();

                    })
                        .fail((response) => {
                            console.log("Error!");
                            //alert("Wrong username/password");

                        });
                })
            });



            $('#update-' + data[i].postid).on("click", (event) => {
                console.log("Clicked");
                var settings = {//contains all the parameters like postman
                    "url": "http://localhost:3000/get/post/" + data[i].postid,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"/* ,
                        "Authorization": "Bearer " + localStorage["token"] */
                    }
                };

                $.ajax(settings).done(function (response) {
                    //console.log("Login Success");
                    console.log(response);

                    for (let i = 0; i < response.length; i++) {

                        /* var options = "";
                        var month = parseInt(response[i].month); */
                        //console.log(month); 

                        $(".modal-body").append(`<form id="update-post-${response[i].postid}" method="POST">
                            <div class="form-group">
                                <label for="txt_title">Title:</label>
                                <input type="text" class="form-control" id="txt_title" placeholder="Enter title of post" value=${response[i].title}>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="txt_date">Date:</label>
                                    <input type="date" class="form-control" id="txt_date"
                                        placeholder="Date post was written" value=${response[i].date}>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="txt_author">Author:</label>
                                    <input type="text" class="form-control" id="txt_author"
                                        placeholder="Author of the post" value=${response[i].author}>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txt_author">Category ID:</label>
                                <input type="number" class="form-control" id="txt_categoryId"
                                    placeholder="Category ID" value=${response[i].categoryid}>
                            </div>
                            <div class="form-group">
                                <label for="txt_sub_content">Sub Content:</label>
                                <textarea class="form-control" id="txt_sub_content" rows="6">${response[i].subcontent}</textarea>
                                <small id="emailHelp" class="form-text text-muted">A glimpse of what the article is about. Written in plain text</small>
                            </div>
                            <div class="form-group">
                                <label for="txt_content">Main Content:</label>
                                <textarea class="form-control" id="txt_content" rows="13">${response[i].content}</textarea>
                                <small id="emailHelp" class="form-text text-muted">Written with preferred formatting in
                                    html</small>
                            </div>
                            <button type="submit" class="btn btn-primary mb-5">Update</button>
                        </form>
                    `);
                        $(".modal-title-container").append(`<h4 class=\"modal-title\">Update Post: ${response[i].title}</h4>`);

                        registerUpdateRecordForm(response[i].postid);
                    }

                })
                    .fail((response) => {
                        console.log("Error!");
                        //alert("Wrong username/password");

                    });



            });
        }
        modal();
        modalDelete();


}


function populateTable(data) {
    //console.log(data);

    var tableData = data.map(
        ({ postid, title, date, author}) => `
            <tr>
                <td>${postid}</td>
                <td>${title}</td>
                <td>${date}</td>
                <td>${author}</td>
                <td><button id="update-${postid}" type="button" class="btn btn-primary btn-update">Update</button><button id="delete-${postid}" type="button" class="btn btn-primary btn-delete">Delete</button></td>
            </tr>
        `);

    $("#basic-data-tbody").html(tableData);

    populateOptions(data);

}






function getUserDataFromBackend() {
    //event.preventDefault();
    var postIdFilter = $('#postIdFilter').val();
    var dateFilter = $('#dateFilter').val();
    var categoryIdFilter = $('#categoryIdFilter').val();

    var settings = {
        "url": "http://localhost:3000/get/posts2?postId=" + postIdFilter + "&date=" + dateFilter + "&categoryId" + categoryIdFilter + "&limit=" + paginationQuery.limit + "&offset=" + paginationQuery.offset,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        populateTable(response)
    });
}

function dataRetrievalMiddleMan(event) {
    event.preventDefault();
    getUserDataFromBackend();
    return false;//return false is like prevent defualt.
}

function registerFilterForm() {
    $("#basic-data-filter-form").submit(dataRetrievalMiddleMan);
}


function paginateBasicData(event) {
    //console.log("clicked");
    //console.log($(this)); this refers to the caller/ the link the was clicked
    const fn = $(this).attr("fn");
    const value = $(this).attr("value") || $(this).val();//this or operation says if the first is nothing, take the second value instead
    paginationFunction[fn](value);
    getUserDataFromBackend();
};



function registerBasicDataPaginationForm() {//add event listeners
    $("#first-page").click(paginateBasicData);
    $("#previous-page").click(paginateBasicData);
    $("#next-page").click(paginateBasicData);
    $("#page-size-select").change(paginateBasicData);
};


/* function defualtLoad() {
    getUserDataFromBackend();
    registerFilterForm();
} */





$(document).ready(function () {
    //defualtLoad();
    registerFilterForm();
    registerBasicDataPaginationForm();
});