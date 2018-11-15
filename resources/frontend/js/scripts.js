$(document).ready(function(){
    $("#searchBar").focus(function(){
        $(this).addClass("open");
    }).blur(function(){
        $(this).removeClass("open");
    });

})
