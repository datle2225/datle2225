// --- Assign global variable ---
let articalInfoList = ArticalInfo.prototype.getArticalsInfo();
let otherItemList = OtherItem.prototype.getOtherItems();

// --- Gen Other Items ---
let otherItem = item => {
    return `
        <div class="other-item">
            <img src="${item["imagePath"]}" alt="Ảnh chủ đề khác">
            <div class="other-item-description">
                <a href="articalSubMenu.html">${item["description"]}</a>
            </div>
        </div>
    `
}

for (let item of otherItemList) {
    $("div.other-menu").append(otherItem(item));
}

$("div.other-item").each((_, element) => {
    $(element).children("img").on("click", () => {
        location.href = $(element).children("div.other-item-description").children("a").attr("href");
    })
})