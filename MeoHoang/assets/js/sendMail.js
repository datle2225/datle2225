// --- Assign global variable ---
let catId = sessionStorage.getItem("catId");
let catInfo = catId ? Cat.prototype.getCatById(Number.parseInt(catId)) : null;
if (!catInfo) location.href = "index.html";

// --- Gen introduce ---

let about = listAbout => {
    let result = "";
    for (let item of listAbout) {
        result += `
            <li>
                ${item}
            </li>
        `;
    }
    return result;
}

let introduce = cat => {
    return `
        <div class="avatar">
            <img src="${cat.imagePath}" alt="Ảnh mèo - avatar">
        </div>
        <div class="information">
            <div class="name">Nhận nuôi <span id="catName">${cat.name}</span></div>
            <div class="info">
                <span class="age">${cat.age}</span> - <span class="gender">${cat.gender}</span><br />
                <span class="breed">${cat.breed}</span>
            </div>
        </div>
        <ul class="about">
            ${about(cat.about)}
        </ul>
    `
}

$("div.introduce").append(introduce(catInfo));

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