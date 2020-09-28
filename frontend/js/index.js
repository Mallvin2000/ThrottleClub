const paginationQuery = {
    order: 1
}

const paginationFunction = {
    changeOrder: function (newOrder) {
        paginationQuery["order"] = newOrder;
    }
}


function getPostsFromBackend() {
    var settings = {
        "url": "http://localhost:3000/get/posts?order="+paginationQuery.order,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
            $("#posts-wrapper").append("<div class=\"post post" + i + " col-sm-5\"></div>");//append as a child in selected tag
            $(".post" + i).append("<div class=\"coverImage\"><img class=\"mx-auto d-block img-fluid\" src=\"images/" + response[i].coverimage + "\" width=\"450\" height=\"150\"></div>");//mx-auto d-block these classes are from bootstrap to center the image
            //$(".post" + i).append("<div><p>Title: " + response[i].title + "</p></div>");//display property (title) of object in reponse array
            //$(".post" + i).append("<div><p>Date: " + response[i].date + "</p></div>");
            $(".post" + i).append(`
                <div class=\"details\">
                    <div class="title"><h4 class="text-center">${response[i].title}</h4></div>
                    <div class="sub-content">
                        <p>${response[i].subcontent}</p>
                    </div>
                    <div class="small-details row">
                        <div class="date col-sm-4"><h6>Date: ${response[i].date}</h4></div>
                        <div class="author col-sm-6"><h6>Author: ${response[i].author}</h4></div>
                    </div>
                </div>
            `);
            //$(".post" + i).append("<div><p>Author: " + response[i].author + "</p></div>");
            $(".post" + i).append("<div><button id=" + response[i].postid + "-update class=\"btn btn-primary\">View Post</button></div>");
            $("#" + response[i].postid + "-update").on("click", (event) => {
                //console.log("Viewing Post");
                window.location.href = "post.html?postId=" + response[i].postid + "";
            })



            /*  $(".vehicles").append("<div style=\"border:solid red 1px; margin-top: 3%;\" class=\"vehicle" + i + " col-sm-4\"></div>");//append as a child in selected tag. each object takes 6 out of the row max 12 grid. I.E 2 vehicles per row
             $(".vehicle" + i).append("<div class=\"vehicleimage img-responsive\"><img src=\"images/" + response[i].imagename + "\" width=\"300\" height=\"150\"></div>");
             $(".vehicle" + i).append("<div class=\"text-center vehicle-name-heading\">Name: " + response[i].vehiclename + "</div>");//display property (vehicleName) of object in reponse array
             $(".vehicle" + i).append("<hr>");
             $(".vehicle" + i).append("<div class=\"vehicle-info\"><p>Brand: " + response[i].brand + "</p><p>Price: $" + response[i].vehicleprice + "</p></div>");
             //$(".vehicle" + i).append("");
             $(".vehicle" + i).append("<button class=\"view-more btn btn-primary\"><a href=\"vehicleid" + response[i].vehicleid + ".html\">View</a></button> <button id=\"" + response[i].vehicleid + "-specs\" class=\"btn-specs view-specs btn btn-primary\">See Specifications</button>"); */
        }
    })
        .fail((response) => {
            alert("ERROR");
        });
}



function getCategoriesFromBackend() {
    var settings = {
        "url": "http://localhost:3000/get/categories",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
            $("#category-wrapper").append("<div class=\"category category" + i + "\"></div>");//append as a child in selected tag
            $(".category" + i).append("<div class=\"category-name\"><h3 class=\"text-center\"><a class=\"category-link\" href=\"category.html?categoryId=" + response[i].categoryid + "\">"+ response[i].name + "</a></h3></div>");
            
        }
    })

        .fail((response) => {
            alert("ERROR");
        });;
}



function paginate(event) {
    console.log('Change detected');
    const fn = $(this).attr("fn");
    const value = $(this).attr("value") || $(this).val();//this or operation says if the first is nothing, take the second value instead
    paginationFunction[fn](value);
    $( ".post" ).remove();
    getPostsFromBackend();
}


function registerPaginationForm() {
    $('#sort-order-select').change(paginate)
}



$(document).ready(function () {//run when document is populated
    getPostsFromBackend();
    getCategoriesFromBackend();
    registerPaginationForm();
});