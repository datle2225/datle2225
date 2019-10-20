let warnOn = function(inputElement, warnElement = null, text = null) {
    inputElement.removeClass("accept");
    inputElement.addClass("warning");
    if (text) warnElement.text(text).show();
}

let accept = function(inputElement, warnElement) {
    inputElement.removeClass("warning");
    inputElement.addClass("accept");
    warnElement.hide();
}

let validEmail = function() {
    var email = $("[name=email]").val().trim();
    if (!(email)) warnOn($("[name=email]"), $(".email"), "Bắt buộc")
    else if (!(email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))) {
        warnOn($("[name=email]"), $(".email"), "Hãy nhập theo dạng exam@exam.com")
    }
    else accept($("[name=email]"), $(".email"))
}

let validUsername = function() {
    var username = $("[name=username]").val().trim();
    if (!(username)) warnOn($("[name=username]"), $(".username"), "Bắt buộc")
    else accept($("[name=username]"), $(".username"))
}

let validPassword = function() {
    var password = $("[name=password]").val();
    var confirm = $("[name=confirm]").val();
    if (!(password.match(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/))) {
        warnOn($("[name=password]"), $(".password"), "Mật khẩu phải có ít nhất 8 ký tự bao gồm cả chữ và số");
    }
    else {
        if (password != confirm) {
            warnOn($("[name=password]"), $(".password"), "Mật khẩu không khớp");
            warnOn($("[name=confirm]"));
        }
        else {
            accept($("[name=password]"), $(".password"))
            accept($("[name=confirm]"), $(".password"))
        }
    }
}

let validConfirm = function() {
    var confirm = $("[name=confirm]").val();
    if (!(confirm)) warnOn($("[name=confirm]"));
    else validPassword();
}

$("[name=email]").on("blur", function() {
    validEmail();
})

$("[name=username]").on("blur", function() {
    validUsername();
})

$("[name=password]").on("blur", function() {
    validPassword();
})

$("[name=confirm]").on("blur", function() {
    validConfirm();
})

$("form").on("submit", function (event) {
    var $username = $("[name=username]").hasClass("accept");
    var $email = $("[name=email]").hasClass("accept");
    var $password = $("[name=password]").hasClass("accept");
    var $confirm = $("[name=confirm]").hasClass("accept");
    if (!($username) || !($email) || !($password) || !($confirm)) {
        event.preventDefault();
        if (!($email)) validEmail();
        if (!($username)) validUsername();
        if (!($password)) validPassword();
        if (!($confirm)) validConfirm();
    }
    else alert("Đã đăng ký thành công");
});