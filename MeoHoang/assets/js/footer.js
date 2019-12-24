let deactiveIcon = $el => {
    console.log($el.parent().siblings().children(".footer-item-arrow").children(".activeArrow"))
    $el.parent().siblings().children(".footer-item-arrow").children(".activeArrow").removeClass("show");
    $el.parent().siblings().children(".footer-item-arrow").children(".defaultArrow").removeClass("hide");
    $el.parent().siblings().children(".list").slideUp("fast");
}

$(".footer-item-arrow").on("click", function() {
    if (window.innerWidth < 992) {
        deactiveIcon($(this));
        $(this).children(".activeArrow").toggleClass("show");
        $(this).children(".defaultArrow").toggleClass("hide");
        $(this).siblings(".list").slideToggle("fast");
    }
})