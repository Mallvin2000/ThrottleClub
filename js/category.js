const paginationQuery = {
    order: 1
}

const paginationFunction = {
    changeOrder: function (newOrder) {
        paginationQuery["order"] = newOrder;
    }
}

function getPostsInCategoryFromBackend(categoryId) {
    var settings = {
        "url": "http://localhost:3000/get/category/posts/?categoryId=" + categoryId + "&order=" + paginationQuery.order,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    $.ajax(settings).done(function (response) {
        console.log("categories");
        console.log(response);
        $(".main-section-title").append(`<h2 class="text-center">Category: ${response[0].categoryname}</h2>`);//append as a child in selected tag
        for (let i = 0; i < response.length; i++) {
            $("#posts-wrapper").append("<div class=\"post post" + i + " col-sm-5\"></div>");//append as a child in selected tag
            $(".post" + i).append("<div class=\"coverImage\"><img class=\"mx-auto d-block img-fluid\" src=\"images/" + response[i].coverimage + "\" width=\"450\" height=\"150\"></div>");//mx-auto d-block these classes are from bootstrap to center the image
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
            $(".post" + i).append("<div><button id=" + response[i].postid + "-update class=\"btn btn-primary\">View Post</button></div>");
            $("#" + response[i].postid + "-update").on("click", (event) => {
                //console.log("Viewing Post");
                window.location.href = "post.html?postId=" + response[i].postid + "";

            })
        }
    });
}


function registerCategoryId() {
    var categoryId = window.location.href.split("categoryId=")[1];
    //console.log(categoryId);
    getPostsInCategoryFromBackend(categoryId)
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
    //console.log('Change detected');
    const fn = $(this).attr("fn");
    const value = $(this).attr("value") || $(this).val();//this or operation says if the first is nothing, take the second value instead
    paginationFunction[fn](value);
    $( ".post" ).remove();
    $('.main-section-title').empty();
    registerCategoryId();
}


function registerPaginationForm() {
    $('#sort-order-select').change(paginate)
}


$(document).ready(function () {//run when document is populated
    registerCategoryId();
    getCategoriesFromBackend();
    registerPaginationForm();
});
