// --- Assign global variable ---
let articalInfoList = ArticalInfo.prototype.getArticalsInfo();
let otherItemList = OtherItem.prototype.getOtherItems();

// --- Gen Artical Sub Menu Items ---
let articalInfoItem = articalInfo => {
    return `
        <div class="articalSubMenu-item">
            <hr />
            <div class="articalSubMenu-articals">
                <div class="articalSubMenu-mainArtical" data-url="artical.html">
                    <img src="${articalInfo["imgPath"]}" alt="Ảnh bài viết">
                    <div class="articalSubMenu-description">
                        <div class="articalSubMenu-descriptionTitle">
                            ${articalInfo["title"]}
                        </div>
                        <div class="articalSubMenu-descriptionOwner">
                            Viết bởi ${articalInfo["owner"]}
                        </div>
                        <div class="articalSubMenu-descriptionMore">
                            ${articalInfo["description"]}
                        </div>
                        <div class="more">
                            Đọc thêm
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

for (let articalInfo of articalInfoList) {
    $("div.articalSubsMenu").append(articalInfoItem(articalInfo));
}

$("div.articalSubMenu-mainArtical").each((_, element) => {
    $(element).children("img").on("click", () => {
        location.href = $(element).data("url");
    });

    $(element).children("div.articalSubMenu-description").children("div.articalSubMenu-descriptionTitle").on("click", () => {
        location.href = $(element).data("url");
    });

    $(element).children("div.articalSubMenu-description").children("div.more").on("click", () => {
        location.href = $(element).data("url");
    });
});

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