//body

$("header").load("header.html nav", () => {
    let deactiveIcon = $el => {
        $el.children(".title").children(".activeIcon").removeClass("show");
        $el.children(".title").children(".defaultIcon").removeClass("hide");
        $el.children(".title").children(".hoverIcon").removeClass("hide");
        $el.children(".nav-subnav").removeClass("show");
    }
    
    $(".header-title").on("click", function() {
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
});

// $("modal").load("modal.html", () => {
//     $("div.modal-input-row").children("input").each((_, el) => {
//         $(el).on("blur", () => {
//             if ($(el).val().trim()) {
//                 $(el).removeClass("redBorder").addClass("greenBorder");
//             }
//             else {
//                 $(el).removeClass("greenBorder");
//                 if ($(el).attr("name") != "firstName" && $(el).attr("name") != "lastName") {
//                     $(el).addClass("redBorder");
//                 }
//             }
//         })
//     });
// });

$("footer").load("footer.html div.footer", () => {
    let deactiveArrow = $el => {
        console.log($el.parent().siblings().children(".footer-item-arrow").children(".activeArrow"))
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