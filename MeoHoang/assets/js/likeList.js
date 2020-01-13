// --- Assign global variable ---
let sortType = "newestLike";
let likeList = sessionStorage.getItem("likeList") ? sessionStorage.getItem("likeList").split(",") : [];
let likeListCats = likeList.length ? Cat.prototype.getCatsByLikeList(likeList) : [];
let username = sessionStorage.getItem("username");

let onOffLikeButton = () => {
    $("div.card-likeList").each((_, element) => {
        if (likeList.includes(`${$(element).data("id")}`)) {
            $($(element).children("div.card-heart").children("svg")[0]).addClass("hide");
            $($(element).children("div.card-heart").children("svg")[1]).addClass("show");
        }
    });
}

let likeButton = () => {
    onOffLikeButton();

    // --- Like button ---
    $("div.card-heart").each((_, element) => {
        $(element).on("click", () => {
            var id = `${$(element).parent().data("id")}`;
            if (likeList.indexOf(id) > -1) {
                removeItemInArray(likeList, id);
                $($(element).children("svg")[0]).removeClass("hide");
                $($(element).children("svg")[1]).removeClass("show");

                $("section.cards-likeList").empty();
                likeListCats = Cat.prototype.getCatsByLikeList(likeList);

                for (let cat of likeListCats) {
                    $("section.cards-likeList").append(cardLikeList(cat));
                };
                likeButton();
                $("#likeListAmount").text(`${likeList.length}`);
            }
            sessionStorage.setItem("likeList", likeList);
        })
    });
};

// --- Like list amount ---
$("#likeListAmount").text(`${likeList.length}`);

// --- Gen like list ---
let cardLikeList = cat => {
    return `
        <div class="card-likeList" data-id="${cat.id}">
            <div class="card-heart">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.6705 1.64103C19.1018 -0.860706 15.2815 -0.410714 12.9238 2.36959L12.0003 3.45707L11.0769 2.36959C8.72385 -0.410714 4.89892 -0.860706 2.33022 1.64103C-0.613476 4.51241 -0.76816 9.66589 1.86616 12.7783L10.9363 23.4817C11.5222 24.1728 12.4738 24.1728 13.0597 23.4817L22.1298 12.7783C24.7689 9.66589 24.6142 4.51241 21.6705 1.64103V1.64103Z" fill="#F13E4B"/>
                    <path d="M18.447 5.09402C16.7345 3.4262 14.1877 3.72619 12.6158 5.57973L12.0002 6.30472L11.3846 5.57973C9.8159 3.72619 7.26595 3.4262 5.55348 5.09402C3.59102 7.00827 3.48789 10.4439 5.24411 12.5189L11.2909 19.6545C11.6815 20.1152 12.3158 20.1152 12.7065 19.6545L18.7532 12.5189C20.5126 10.4439 20.4094 7.00827 18.447 5.09402V5.09402Z" fill="white"/>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.6705 1.64103C19.1018 -0.860706 15.2815 -0.410714 12.9238 2.36959L12.0003 3.45707L11.0769 2.36959C8.72385 -0.410714 4.89892 -0.860706 2.33022 1.64103C-0.613476 4.51241 -0.76816 9.66589 1.86616 12.7783L10.9363 23.4817C11.5222 24.1728 12.4738 24.1728 13.0597 23.4817L22.1298 12.7783C24.7689 9.66589 24.6142 4.51241 21.6705 1.64103Z" fill="#F13E4B"/>
                </svg>
            </div>
            <img class="avatar" src="${cat.imagePath}" alt="Ảnh mèo" onClick="redirect('sendMail.html', {catId: ${cat.id}})">
            <div class="name">${cat.name}</div>
            <div class="info">
                <span class="age">${cat.age}</span> - <span class="gender">${cat.gender}</span><br />
                <span class="breed">${cat.breed}</span>
            </div>
            <button class="card-likeList-button" onClick="redirect('sendMail.html', {catId: ${cat.id}})">Nhận nuôi</button>
        </div>
    `
}

for (let cat of likeListCats) {
    $("section.cards-likeList").append(cardLikeList(cat));
};

likeButton();

// --- Sort ---

let sortLikeList = (likeListCats, sortType) => {
    switch (sortType) {
        case "ascAlpha":
            return likeListCats.slice().sort((cat1, cat2) => {
                if (cat1["name"] > cat2["name"]) return 1;
                else if (cat1["name"] < cat2["name"]) return -1;
                return 0;
            });
            break;
        case "descAlpha":
            return likeListCats.slice().sort((cat2, cat1) => {
                if (cat1["name"] > cat2["name"]) return 1;
                else if (cat1["name"] < cat2["name"]) return -1;
                return 0;
            });
            break;
        case "oldest":
            return likeListCats.slice().sort((cat1, cat2) => {
                if (cat1["joinedDate"].split("/").join("") > cat2["joinedDate"].split("/").join("")) return 1;
                else if (cat1["joinedDate"].split("/").join("") < cat2["joinedDate"].split("/").join("")) return -1;
                return 0;
            });
            break;
        default:
            return likeListCats;
    }
}

$("div.likeListSort-label").on("click", () => {
    $("div.likeListValue").toggleClass("blueColor-likeList");
    $("div.likeListValues").toggleClass("show");
    $($("div.likeListSort-label").children("svg.likeListSort-svg")[0]).toggleClass("hide");
    $($("div.likeListSort-label").children("svg.likeListSort-svg")[1]).toggleClass("show");
});

$("div.likeListValues").children().each((_, el) => {
    $(el).on("click", () => {
        likeListCats = Cat.prototype.getCatsByLikeList(likeList);
        $("div.likeListValue").text(`${$(el).text()}`);
        $("div.likeListValues").removeClass("show");
        $("div.likeListValue").removeClass("blueColor-likeList");
        $($("div.likeListSort-label").children("svg.likeListSort-svg")[0]).removeClass("hide");
        $($("div.likeListSort-label").children("svg.likeListSort-svg")[1]).removeClass("show");

        if (sortType != $(el).data("value")) {
            $("section.cards-likeList").empty();
            sortType = $(el).data("value");
            var sortList = sortLikeList(likeListCats, sortType);
            for (let cat of sortList) {
                $("section.cards-likeList").append(cardLikeList(cat));
            };
        }

        likeButton();
    });
});