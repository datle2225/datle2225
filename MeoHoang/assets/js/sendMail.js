// --- Submit ---

let thanks = `
        <div class="sended">
            <div class="thanks">
                Cảm ơn bạn đã để lại thông tin<br /> Chúng tôi sẽ liên lạc ngay khi có thể
            </div>
            <div class="more">
                Trong lúc đó hãy <a href="#">Xem thêm</a> các chú mèo khác nhé!
            </div>
        </div>
    `

$("#sendMail").on("click", () => {
    var email = $("#email").val().trim();
    if (email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        $("label[for='email']").removeClass("redBorder");
        $("label[for='email']").children("div").removeClass("redColor");
        $("section.mail").children("div").empty().append(thanks);
    } else {
        $("label[for='email']").addClass("redBorder");
        $("label[for='email']").children("div").addClass("redColor");
    }
})