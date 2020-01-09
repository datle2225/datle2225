// --- import data in ./mockData.js ---

// --- header ---

$("header").load("header.html nav", () => {
    let deactiveIcon = $el => {
        $el.children(".header-title").children(".activeIcon").removeClass("show");
        console.log($el.children(".header-title").children(".activeIcon").hasClass("show"));
        $el.children(".header-title").children(".defaultIcon").removeClass("hide");
        $el.children(".header-title").children(".hoverIcon").removeClass("hide");
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

    $("#likeList").on("click", () => {
        $("#likeList").children(":first-child").hide();
        $("#likeList").children(":last-child").show();
        location.href = "modal.html";
    });

    $("#account").children("svg").on("click", () => {
        $(".sub-account").toggleClass("show");
        $($("#account").children("svg")[0]).toggleClass("hide");
        $($("#account").children("svg")[1]).toggleClass("show");
    });

    $("#logout").on("click", () => {
        sessionStorage.clear();
        $("#likeList").hide();
        $("#account").hide();
        $("div.nav-item[data-target='#signup']").show();
        $("div.nav-item[data-target='#login']").show();
    });

    $("#logoutResponsive").on("click", () => {
        sessionStorage.clear();
        $("#likeList").hide();
        $("#account").hide();
        $("div.nav-item[data-target='#signup']").show();
        $("div.nav-item[data-target='#login']").show();
    });
});

// --- modal ---

$("div.modal-input-row").children("input").each((_, el) => {
    $(el).on("blur", () => {
        if ($(el).val().trim()) {
            $(el).removeClass("redBorder").addClass("greenBorder");
        } else {
            $(el).removeClass("greenBorder");
            if ($(el).attr("name") != "firstName" && $(el).attr("name") != "lastName") {
                $(el).addClass("redBorder");
            }
        }
    })
});

$(".modal").each((_, element) => {
    $(element).on("hide.bs.modal", () => {
        $("div.modal-input-row").children("input").each((_, el) => {
            $(el).parent().siblings("p.warn").removeClass("show");
            $(el).val("").removeClass("redBorder").removeClass("greenBorder");
            $("img.showPass").hide();
            $("img.hidePass").show();
            $("div.modal-input-row").children("input[name = 'password']").attr("type", "password");
            $("div.modal-input-row").children("input[name = 'confirm']").attr("type", "password");
        });
    });
});

$("img.showPass").on("click", () => {
    $("img.showPass").hide();
    $("img.hidePass").show();
    $("div.modal-input-row").children("input[name = 'password']").attr("type", "password");
    $("div.modal-input-row").children("input[name = 'confirm']").attr("type", "password");
})

$("img.hidePass").on("click", () => {
    $("img.hidePass").hide();
    $("img.showPass").show();
    $("div.modal-input-row").children("input[name = 'password']").attr("type", "text");
    $("div.modal-input-row").children("input[name = 'confirm']").attr("type", "text");
})

$("#submit-login").on("click", () => {
    var error = [true, true];
    var $username = $("div.modal-input-row").children("input[name = 'username']")[0];
    var $password = $("div.modal-input-row").children("input[name = 'password']")[0];

    if ($($username).val().trim()) {
        $($username).val($($username).val().trim());
        $($username).removeClass("redBorder").addClass("greenBorder");
        $($username).parent().next("p.warn").removeClass("show");
        error.pop();
    } else {
        $($username).removeClass("greenBorder").addClass("redBorder");
        $($username).parent().next("p.warn").addClass("show");
    }

    if ($($password).val()) {
        $($password).removeClass("redBorder").addClass("greenBorder");
        error.pop();
    } else {
        $($password).removeClass("greenBorder").addClass("redBorder");
        $($password).parent().next("p.warn").addClass("show").text("Hãy nhập mật khẩu");
    }

    if (!error.includes(true)) {
        var user = User.prototype.login($($username).val().trim(), $($password).val());
        if (!Object.keys(user).length) {
            $($username).removeClass("greenBorder").addClass("redBorder");
            $($password).removeClass("greenBorder").addClass("redBorder");
            $($password).val("").parent().next("p.warn").addClass("show").text("Sai tài khoản hoặc mật khẩu");
        } else {
            sessionStorage.setItem("username", user["username"]);
            sessionStorage.setItem("name", user["lastName"] + user["firstName"]);
            sessionStorage.setItem("likeList", user["likeList"]);
            $('#login').modal('hide');

            $("div.nav-item[data-target='#signup']").hide();
            $("div.nav-item[data-target='#login']").hide();
            if ($(window).width() > 991) {
                $("#likeList").show();
                $("#account").show();
            }
            else {
                $("#likeList").show();
                $("#changePassResponsive").show();
                $("#logoutResponsive").show();
            }
        }
    }
})

$("#submit-signup").on("click", () => {
    var error = [true, true];
    var $username = $("div.modal-input-row").children("input[name = 'username']")[1];
    var $password = $("div.modal-input-row").children("input[name = 'password']")[1];
    var $confirm = $("div.modal-input-row").children("input[name = 'confirm']")[0];

    if ($($username).val().trim()) {
        if (User.prototype.getUsernames().includes($($username).val().trim())) {
            $($username).removeClass("greenBorder").addClass("redBorder");
            $($username).parent().next("p.warn").addClass("show").text("Tài khoản đã tồn tại");
        } else {
            $($username).removeClass("redBorder").addClass("greenBorder");
            $($username).parent().next("p.warn").removeClass("show");
            error.pop();
        }
    } else {
        $($username).removeClass("greenBorder").addClass("redBorder");
        $($username).parent().next("p.warn").addClass("show").text("Hãy nhập tên tài khoản");
    }

    if ($($password).val().match(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/)) {
        if ($($password).val() != $($confirm).val()) {
            $($password).parent().next("p.warn").addClass("show").text("Mật khẩu và xác nhận mật khẩu không giống nhau");
            $($password).removeClass("greenBorder").addClass("redBorder");
            $($confirm).removeClass("greenBorder").addClass("redBorder");
        } else {
            $($password).parent().next("p.warn").removeClass("show");
            $($password).removeClass("redBorder").addClass("greenBorder");
            $($confirm).removeClass("redBorder").addClass("greenBorder");
            error.pop();
        }
    } else {
        $($password).parent().next("p.warn").addClass("show").text("Mật khẩu phải có ít nhất 6 ký tự bao gồm cả chữ và số");
        $($password).removeClass("greenBorder").addClass("redBorder");
        $($confirm).removeClass("greenBorder").addClass("redBorder");
    }

    if (!error.includes(true)) {
        var user = {
            "username": $($username).val().trim(),
            "password": $($password).val(),
            "firstName": $("div.modal-input-row").children("input[name = 'firstName']").val().trim(),
            "lastName": $("div.modal-input-row").children("input[name = 'lastName']").val().trim()
        }
        User.prototype.addUser(user);
        var user = User.prototype.login($($username).val().trim(), $($password).val());
        sessionStorage.setItem("username", user["username"]);
        sessionStorage.setItem("name", user["lastName"] + user["firstName"]);
        sessionStorage.setItem("likeList", user["likeList"]);
        $('#signup').modal('hide');
        $('#signupSuccess').modal('show');

        $("div.nav-item[data-target='#signup']").hide();
        $("div.nav-item[data-target='#login']").hide();
        if ($(window).width() > 991) {
            $("#likeList").show();
            $("#account").show();
        }
        else {
            $("#likeList").show();
            $("#changePassResponsive").show();
            $("#logoutResponsive").show();
        }
    }
});

$("#submit-changePass").on("click", () => {
    var error = [true, true];
    var $oldPassword = $("div.modal-input-row").children("input[name = 'password']")[2];
    var $newPassword = $("div.modal-input-row").children("input[name = 'password']")[3];
    var $confirm = $("div.modal-input-row").children("input[name = 'confirm']")[1];

    if (!$($oldPassword).val()) {
        $($oldPassword).removeClass("greenBorder").addClass("redBorder");
        $($oldPassword).parent().next("p.warn").addClass("show").text("Hãy nhập mật khẩu hiện tại");
    } else {
        error.pop();
        $($oldPassword).removeClass("redBorder").addClass("greenBorder");
        $($oldPassword).parent().next("p.warn").removeClass("show");
    }

    if (!$($newPassword).val().match(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/)) {
        $($newPassword).removeClass("greenBorder").addClass("redBorder");
        $($newPassword).parent().next("p.warn").addClass("show");
    } else {
        $($newPassword).parent().next("p.warn").removeClass("show");
        if ($($newPassword).val() != $($confirm).val()) {
            $($newPassword).removeClass("greenBorder").addClass("redBorder");
            $($confirm).removeClass("greenBorder").addClass("redBorder");
            $($confirm).parent().next("p.warn").addClass("show");
        } else {
            error.pop();
            $($newPassword).removeClass("redBorder").addClass("greenBorder");
            $($confirm).removeClass("redBorder").addClass("greenBorder");
            $($confirm).parent().next("p.warn").removeClass("show");
        }
    }

    if (!error.includes(true)) {
        if (User.prototype.changPassword(sessionStorage.getItem("username"), $($oldPassword).val(), $($newPassword).val())) {
            $('#changePassModal').modal('hide');
            $('#changePassSuccess').modal('show');
        } else {
            $($oldPassword).removeClass("greenBorder").addClass("redBorder");
            $($oldPassword).parent().next("p.warn").addClass("show").text("Mật khẩu không chính xác");
            $($oldPassword).val("");
            $($newPassword).val("");
            $($confirm).val("");
        }
    }
});

// --- footer ---

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