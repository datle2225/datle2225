// --- Assign global variable ---
let subMenus = ArticalSubMenu.prototype.getArticalSubMenus();
let otherItemList = OtherItem.prototype.getOtherItems();

// --- Gen Artical Sub Menu Items ---
let articalSubMenuItem = articalSubMenu => {
    var subArticals = "";
    for (let subArtical of articalSubMenu["subArticals"]) {
        subArticals += `
            <li>
                <a href="artical.html">${subArtical}</a>
            </li>
        `
    }

    return `
        <div class="articalSubMenu-item">
            <div class="articalSubMenu-menuTitle" data-url="articalSubMenu.html">
                ${articalSubMenu["menuTitle"]}
            </div>
            <hr />
            <div class="articalSubMenu-articals" data-url="artical.html">
                <div class="articalSubMenu-mainArtical">
                    <img src="${articalSubMenu["imgPath"]}" alt="Ảnh bài viết">
                    <div class="articalSubMenu-description">
                        <div class="articalSubMenu-descriptionTitle">
                            ${articalSubMenu["descriptionTitle"]}
                        </div>
                        <div class="articalSubMenu-descriptionMore">
                            ${articalSubMenu["descriptionMore"]}
                        </div>
                    </div>
                </div>

                <ul class="articalSubMenu-subArticals">
                    ${subArticals}
                    <li><a href="articalSubMenu.html">Đọc thêm các bài viết về ${articalSubMenu["menuTitle"].toLowerCase()}</a></li>
                </ul>
            </div>
        </div>
    `
}

for (let subMenu of subMenus) {
    $("div.articalSubsMenu").append(articalSubMenuItem(subMenu));
}

$("div.articalSubMenu-menuTitle").each((_, element) => {
    $(element).on("click", () => {
        location.href = $(element).data("url");
    });
});

$("div.articalSubMenu-articals").each((_, element) => {
    $(element).children("div.articalSubMenu-mainArtical").children("img").on("click", () => {
        location.href = $(element).data("url");
    });

    $(element).children("div.articalSubMenu-mainArtical").children("div.articalSubMenu-description").children("div.articalSubMenu-descriptionTitle").on("click", () => {
        location.href = $(element).data("url");
    });
});

// --- Gen Other Items ---
let otherItem = item => {
    return `
        <div class="other-item">
            <img src="${item["imagePath"]}" alt="Ảnh chủ đề khác">
            <div class="other-item-description">
                <a href="#">${item["description"]}</a>
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