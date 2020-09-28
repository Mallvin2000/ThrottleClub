function isUserLoggedIn() {
    if (localStorage.getItem("token") === null) {
        return false;//not logged in
    } else {
        return true;
    }

}



function showLoggedInNavBar() {
    $("#main-nav").empty();//to clear what ever is appended . like refreshing the page
    var html = `
        <!--<a class="navbar-brand" href="#"><img class="img-fluid" src="images/rsz_2svlogosmaller.png" alt="Logo"></a>-->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="nav-list collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Admin Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" href="add-post.html">Add post</a></li>
                <li class="nav-item"><a class="nav-link" href="create-account.html">Create Account</a></li>
                <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                <li class="nav-item"><a class="nav-link" href="logout.html">Logout</a></li>
            </ul>
        </div>
    `;

    $('#main-nav').html(html);
}



function showNotLoggedInNavBar() {
    $("#main-nav").empty();//to clear what ever is appended . like refreshing the page
    var html = `
        <!--<a class="navbar-brand" href="#"><img class="img-fluid" src="images/throttleClubLogo.png" alt="Logo"></a>-->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="nav-list collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            </ul>
        </div>
    `;

    $('#main-nav').html(html);
}



function checkLoginState() {
    if (isUserLoggedIn()) {
        showLoggedInNavBar()
    } else {
        showNotLoggedInNavBar()
    }
}


$(document).ready(function () {//run when document is populated
    checkLoginState();
});
