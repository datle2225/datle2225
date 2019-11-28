let clickToggle = function() {
    $(".hamburger").on("click", function(){
        if ($(".menuList").css("display") === "none"){
            $(".menuList").css("display", "flex");
        }
        else $(".menuList").css("display", "none");
    })
}

let resizeToggle = function() {
    $(window).resize(function(){
        if ($(window).width() < 569) {
            $(".menuList").css("display", "none");
        }
        else {
            $(".menuList").css("display", "flex");
        }
    });
}

clickToggle();
resizeToggle();