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
    if (window.innerWidth > 991) $(this).children(".activeIcon").toggleClass("show");
    else $(this).not(".adopt").children(".activeIcon").toggleClass("show");
    $(this).children(".defaultIcon").toggleClass("hide");
    $(this).children(".hoverIcon").toggleClass("hide");
    if (window.innerWidth > 991) $(this).siblings(".nav-subnav").toggleClass("show");
    else $(this).siblings(".nav-subnav:not(.adopt)").toggleClass("show");
})

$(".hamburger-menu").on("click", function() {
    $("header").toggleClass("blueBackground");
    $(".whiteLogo").toggleClass("show");
    $(".blackLogo").toggleClass("hide");
    $(".activeIcon-hamburger").toggleClass("show");
    $(".defaultIcon-hamburger").toggleClass("hide");
    $(".nav-menu:not('.hamburger-menu')").slideToggle("fast");
})

$("#nav-item-search").children("svg").on("click", () => {
    $("#nav-item-search-active").addClass("show-flex");
    deactiveIcon($(".nav-item"));
    $(".nav-item").removeClass("blueColor");
})

$("svg.search-article-close").on("click", () => {
    $("#nav-item-search-active").removeClass("show-flex");
})

// $("svg.search-article").on("click", () => {
//     $("#nav-item-search-active").removeClass("show-flex");
// })