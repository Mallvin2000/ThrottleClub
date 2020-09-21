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
    /* console.log($("#txt_lift_id").val(),
    $("#txt_weight").val(),
    $("#txt_year").val(),
    $("#month-select option:selected").val()); */
    var liftType = $("#liftType-select option:selected").val()
    var url = "";
    if (liftType == "Squat") {
        url = "https://strength-visualiser.herokuapp.com/squat/update"
    } else if (liftType == "Bench") {
        url = "https://strength-visualiser.herokuapp.com/bench/update"
    } else if (liftType == "Deadlift") {
        url = "https://strength-visualiser.herokuapp.com/deadlift/update"
    }

    var settings = {
        "url": url,
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        },
        "data": {
            "liftid": $("#txt_lift_id").val(),
            "weight": $("#txt_weight").val(),
            "year": $("#txt_year").val(),
            "month": $("#month-select option:selected").val()

        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        //populateTable(response)
    });
}


function registerUpdateRecordForm(id) {
    var liftType = $("#liftType-select option:selected").val()
    console.log(liftType + " : " + id);
    if (liftType == "Squat") {
        $(`#update-record-form-squat-${id}`).submit(updateDataInBackend)
    } else if (liftType == "Bench") {
        $(`#update-record-form-bench-${id}`).submit(updateDataInBackend)
    } else if (liftType == "Deadlift") {
        $(`#update-record-form-deadlift-${id}`).submit(updateDataInBackend)
    }


}

function populateOptions(data) {
    var liftType = $("#liftType-select option:selected").val();


    if (liftType == "Squat") {
        for (let i = 0; i < data.length; i++) {
            $('#delete-' + data[i].squatid).on("click", (event) => {
                //console.log("CLICKED" + data[i].squatid);
                console.log("Clicked");
                $(".modal-body").append(`<p>Are you sure you want to DELETE this record?</p>`)
                $(".modal-body").append(`<button id="delete-button-${data[i].squatid}" type="submit" class="btn btn-danger">DELETE</button>`)
                $(`#delete-button-${data[i].squatid}`).on("click", (event) => {
                    console.log("deleting" + data[i].squatid);

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

            $('#update-' + data[i].squatid).on("click", (event) => {
                console.log("Clicked");
                var settings = {//contains all the parameters like postman
                    "url": "https://strength-visualiser.herokuapp.com/get/all/squat/" + data[i].squatid,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage["token"]
                    }
                };

                $.ajax(settings).done(function (response) {
                    //console.log("Login Success");
                    console.log(response);

                    for (let i = 0; i < response.length; i++) {
                        /*$(".modal-body").append("<p>Squat ID: " + response[i].squatid + "</p>");//change these to a form with inputs with a submit button with a register/listener
                        $(".modal-body").append("<p>Weight: " + response[i].weight + "</p>");
                        $(".modal-body").append("<p>Year: " + response[i].year + "</p>");*/
                        var options = "";
                        var month = parseInt(response[i].month);
                        //console.log(month); 
                        switch (month) {
                            case 01:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option selected>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 02:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option selected>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 03:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option selected>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 04:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option selected>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 05:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option selected>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 06:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option selected>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 07:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option selected>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 08:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option selected>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 09:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option selected>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 10:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option selected>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 11:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option selected>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 12:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option selected>12</option>
                                `
                                break;

                            default:
                                break;
                        }



                        $(".modal-body").append(`<form id="update-record-form-squat-${response[i].squatid}" method="POST">
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="txt_weight">Squat ID:</label>
                                <input disabled type="number" class="form-control" id="txt_lift_id" value="${response[i].squatid}" >
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="txt_weight">Weight (KG) :</label>
                                <input type="number" class="form-control" id="txt_weight" value="${response[i].weight}" >
                            </div>
                        </div>
                    
                    
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="txt_year">Year: </label>
                                <input type="number" class="form-control" id="txt_year" value="${response[i].year}">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="month-select">Month:</label>
                                <select id="month-select" class="form-control">
                                    ${options}
                                </select>
                            </div>
                        </div>
                        <div id="message">
                        </div>
                        <button id="new-log-button" type="submit" class="btn btn-primary">Update</button>
                    </form>`);
                        $(".modal-title-container").append("<h4 class=\"modal-title\">Update Record</h4>");

                        registerUpdateRecordForm(response[i].squatid);
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


    } else if (liftType == "Bench") {
        for (let i = 0; i < data.length; i++) {
            $('#delete-' + data[i].benchid).on("click", (event) => {
                //console.log("CLICKED" + data[i].squatid);
                console.log("Clicked");
                $(".modal-body").append(`<p>Are you sure you want to DELETE this record?</p>`)
                $(".modal-body").append(`<button id="delete-button-${data[i].benchid}" type="submit" class="btn btn-danger">DELETE</button>`)
                $(`#delete-button-${data[i].benchid}`).on("click", (event) => {
                    console.log("deleting" + data[i].benchid);

                    var settings = {
                        "url": "https://strength-visualiser.herokuapp.com/bench/delete/" + data[i].benchid,
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

            $('#update-' + data[i].benchid).on("click", (event) => {
                console.log("Clicked");
                var settings = {//contains all the parameters like postman
                    "url": "https://strength-visualiser.herokuapp.com/get/all/bench/" + data[i].benchid,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage["token"]
                    }
                };

                $.ajax(settings).done(function (response) {
                    //console.log("Login Success");
                    console.log(response);

                    for (let i = 0; i < response.length; i++) {
                        /*$(".modal-body").append("<p>Squat ID: " + response[i].squatid + "</p>");//change these to a form with inputs with a submit button with a register/listener
                        $(".modal-body").append("<p>Weight: " + response[i].weight + "</p>");
                        $(".modal-body").append("<p>Year: " + response[i].year + "</p>");*/
                        var options = "";
                        var month = parseInt(response[i].month);
                        //console.log(month); 
                        switch (month) {
                            case 01:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option selected>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 02:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option selected>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 03:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option selected>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 04:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option selected>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 05:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option selected>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 06:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option selected>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 07:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option selected>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 08:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option selected>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 09:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option selected>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 10:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option selected>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 11:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option selected>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 12:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option selected>12</option>
                                `
                                break;

                            default:
                                break;
                        }



                        $(".modal-body").append(`<form id="update-record-form-bench-${response[i].benchid}" method="POST">
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="txt_weight">Bench ID:</label>
                                <input disabled type="number" class="form-control" id="txt_lift_id" value="${response[i].benchid}" >
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="txt_weight">Weight (KG) :</label>
                                <input type="number" class="form-control" id="txt_weight" value="${response[i].weight}" >
                            </div>
                        </div>
                    
                    
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="txt_year">Year: </label>
                                <input type="number" class="form-control" id="txt_year" value="${response[i].year}">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="month-select">Month:</label>
                                <select id="month-select" class="form-control">
                                    ${options}
                                </select>
                            </div>
                        </div>
                        <div id="message">
                        </div>
                        <button id="new-log-button" type="submit" class="btn btn-primary">Update</button>
                    </form>`);
                        $(".modal-title-container").append("<h4 class=\"modal-title\">Update Record</h4>");

                        registerUpdateRecordForm(response[i].benchid);

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

    } else if (liftType == "Deadlift") {
        for (let i = 0; i < data.length; i++) {
            $('#delete-' + data[i].deadliftid).on("click", (event) => {
                //console.log("CLICKED" + data[i].squatid);
                console.log("Clicked");
                $(".modal-body").append(`<p>Are you sure you want to DELETE this record?</p>`)
                $(".modal-body").append(`<button id="delete-button-${data[i].deadliftid}" type="submit" class="btn btn-danger">DELETE</button>`)
                $(`#delete-button-${data[i].deadliftid}`).on("click", (event) => {
                    console.log("deleting" + data[i].deadliftid);

                    var settings = {
                        "url": "https://strength-visualiser.herokuapp.com/deadlift/delete/" + data[i].deadliftid,
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

            $('#update-' + data[i].deadliftid).on("click", (event) => {
                console.log("Clicked");
                var settings = {//contains all the parameters like postman
                    "url": "https://strength-visualiser.herokuapp.com/get/all/deadlift/" + data[i].deadliftid,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage["token"]
                    }
                };

                $.ajax(settings).done(function (response) {
                    //console.log("Login Success");
                    console.log(response);

                    for (let i = 0; i < response.length; i++) {
                        /*$(".modal-body").append("<p>Squat ID: " + response[i].squatid + "</p>");//change these to a form with inputs with a submit button with a register/listener
                        $(".modal-body").append("<p>Weight: " + response[i].weight + "</p>");
                        $(".modal-body").append("<p>Year: " + response[i].year + "</p>");*/
                        var options = "";
                        var month = parseInt(response[i].month);
                        //console.log(month); 
                        switch (month) {
                            case 01:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option selected>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 02:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option selected>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 03:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option selected>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 04:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option selected>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 05:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option selected>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 06:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option selected>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 07:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option selected>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 08:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option selected>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 09:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option selected>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 10:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option selected>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 11:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option selected>11</option>
                                    <option>12</option>
                                `
                                break;
                            case 12:
                                options = `
                                <option disabled>Choose a month...</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option selected>12</option>
                                `
                                break;

                            default:
                                break;
                        }



                        $(".modal-body").append(`<form id="update-record-form-deadlift-${response[i].deadliftid}" method="POST">
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="txt_weight">Deadlift ID:</label>
                                <input disabled type="number" class="form-control" id="txt_lift_id" value="${response[i].deadliftid}" >
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="txt_weight">Weight (KG) :</label>
                                <input type="number" class="form-control" id="txt_weight" value="${response[i].weight}" >
                            </div>
                        </div>
                    
                    
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="txt_year">Year: </label>
                                <input type="number" class="form-control" id="txt_year" value="${response[i].year}">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="month-select">Month:</label>
                                <select id="month-select" class="form-control">
                                    ${options}
                                </select>
                            </div>
                        </div>
                        <div id="message">
                        </div>
                        <button id="new-log-button" type="submit" class="btn btn-primary">Update</button>
                    </form>`);
                        $(".modal-title-container").append("<h4 class=\"modal-title\">Update Record</h4>");

                        registerUpdateRecordForm(response[i].deadliftid);

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
}


function populateTable(data) {
    //console.log(data);
    var liftType = $("#liftType-select option:selected").val();
    if (liftType == "Squat") {
        var tableData = data.map(
            ({ squatid, weight, year, month }) => `
                <tr>
                    <td>${weight}</td>
                    <td>${year}</td>
                    <td>${month}</td>
                    <td><button id="update-${squatid}" type="button" class="btn btn-primary btn-update">Update</button><button id="delete-${squatid}" type="button" class="btn btn-primary btn-delete">Delete</button></td>
                </tr>
            `);
    } else if (liftType == "Bench") {
        var tableData = data.map(
            ({ benchid, weight, year, month }) => `
                <tr>
                    <td>${weight}</td>
                    <td>${year}</td>
                    <td>${month}</td>
                    <td><button id="update-${benchid}" type="button" class="btn btn-primary btn-update">Update</button><button id="delete-${benchid}" type="button" class="btn btn-primary btn-delete">Delete</button></td>
                </tr>
            `);
    } else if (liftType == "Deadlift") {
        var tableData = data.map(
            ({ deadliftid, weight, year, month }) => `
                <tr>
                    <td>${weight}</td>
                    <td>${year}</td>
                    <td>${month}</td>
                    <td><button id="update-${deadliftid}" type="button" class="btn btn-primary btn-update">Update</button><button id="delete-${deadliftid}" type="button" class="btn btn-primary btn-delete">Delete</button></td>
                </tr>
            `);
    }


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
        //populateTable(response)
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