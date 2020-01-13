// --- footer ---

$("footer").load("footer.html div.footer", () => {
    let deactiveArrow = $el => {
        $el.parent().siblings().children(".footer-item-arrow").children(".activeArrow").removeClass("show");
        $el.parent().siblings().children(".footer-item-arrow").children(".defaultArrow").removeClass("hide");
        $el.parent().siblings().children(".list").slideUp("fast");
    }

    $(".footer-item-arrow").on("click", function() {
        if (window.innerWidth < 992) {
            deactiveArrow($(this));
            $(this).children(".activeArrow").toggleClass("show");
            $(this).children(".defaultArrow").toggleClass("hide");
            $(this).siblings(".list").slideToggle("fast");
        }
    })
});