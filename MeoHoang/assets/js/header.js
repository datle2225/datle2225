let deactiveIcon = $el => {
    $el.children(".title").children(".activeIcon").removeClass("show");
    $el.children(".title").children(".defaultIcon").removeClass("hide");
    $el.children(".title").children(".hoverIcon").removeClass("hide");
    $el.children(".nav-subnav").removeClass("show");
}

$(".title").on("click", function() {
    $(this).parent().siblings().removeClass("blueColor");
    deactiveIcon($(this).parent().siblings());
    $(this).parent().toggleClass("blueColor");
    $(this).children(".activeIcon").toggleClass("show");
    $(this).children(".defaultIcon").toggleClass("hide");
    $(this).children(".hoverIcon").toggleClass("hide");
    $(this).siblings(".nav-subnav").toggleClass("show");
})

$(".hamburger-menu").on("click", function() {
    $("header").toggleClass("blueBackground");
    $(".whiteLogo").toggleClass("show");
    $(".blackLogo").toggleClass("hide");
    $(".activeIcon-hamburger").toggleClass("show");
    $(".defaultIcon-hamburger").toggleClass("hide");
    $(".nav-menu:not('.hamburger-menu')").slideToggle("fast");
})