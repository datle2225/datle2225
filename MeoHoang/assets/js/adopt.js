// --- Assign global variable ---
let catsList = Cat.prototype.getCats();
let likeList = sessionStorage.getItem("likeList") ? sessionStorage.getItem("likeList").split(",") : [];
let filter = {
    breed: [],
    age: [],
    gender: [],
    color: [],
};

// --- Gen cards adopt ---
let cardAdopt = cat => {
    return `
        <div class="card-adopt" data-id="${cat.id}">
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
};

for (let cat of catsList) {
    $("div.cards-adopt").append(cardAdopt(cat));
};

$("div.card-adopt").each((_, element) => {
    if (likeList.includes(`${$(element).data("id")}`)) {
        $($(element).children("div.card-heart").children("svg")[0]).addClass("hide");
        $($(element).children("div.card-heart").children("svg")[1]).addClass("show");
    }
});

// --- Like button ---
$("div.card-heart").each((_, element) => {
    $(element).on("click", () => {
        var id = `${$(element).parent().data("id")}`;
        if (likeList.indexOf(id) > -1) {
            removeItemInArray(likeList, id);
            $($(element).children("svg")[0]).removeClass("hide");
            $($(element).children("svg")[1]).removeClass("show");
        } else {
            likeList.push(id);
            $($(element).children("svg")[0]).addClass("hide");
            $($(element).children("svg")[1]).addClass("show");
        }
        sessionStorage.setItem("likeList", likeList);
    })
});

// --- Filter ---
$("div.filter-adopt-input:not(.catName)").each((_, element) => {
    $(element).on("click", () => {
        $($(element).children("div.symbol").children("svg")[0]).toggleClass("hide");
        $($(element).children("div.symbol").children("svg")[1]).toggleClass("show");
        $(element).toggleClass("blueBorder-filter");
        $(element).siblings("div.filter-adopt-dropdown-menu").toggleClass("show-flex");
        $(element).parent().siblings().each((_, el) => {
            var $menuChildEl = $(el).children("div.filter-adopt-dropdown-menu");
            var $svgChildrenEL = $(el).children("div.filter-adopt-input").children("div.symbol").children("svg");
            $(el).children("div.filter-adopt-input").removeClass("blueBorder-filter");
            $($menuChildEl).removeClass("show-flex");
            $($($svgChildrenEL)[0]).removeClass("hide");
            $($($svgChildrenEL)[1]).removeClass("show");
        })
    });
});

$("div.filter-adopt-dropdown-item").each((_, element) => {
    $(element).on("click", () => {
        var key = $(element).parent().siblings("div.filter-adopt-input").data("key");
        var value = $(element).data("value");
        if (filter[key].includes(value)) {
            removeItemInArray(filter[key], value);
            $(element).children("div.symbol").children("div.symbol-add").removeClass("hide");
            $(element).children("div.symbol").children("div.symbol-remove").removeClass("show");
        } else {
            filter[key].push(value);
            $(element).children("div.symbol").children("div.symbol-add").addClass("hide");
            $(element).children("div.symbol").children("div.symbol-remove").addClass("show");
        }
        if (filter[key].length) {
            $(element).parent().siblings("div.filter-adopt-input").children("div.filter-adopt-dropdown").text(`${filter[key]}`);
        } else {
            $(element).parent().siblings("div.filter-adopt-input").children("div.filter-adopt-dropdown").text("Bất kỳ");
        }
    });
});

$("div.filter-clear").each((_, element) => {
    $(element).on("click", () => {
        var $parentSiblings = $(element).parent().siblings("div.filter-adopt-input");
        var key = $($parentSiblings).data("key");
        filter[key] = [];
        $($parentSiblings).children("div.filter-adopt-dropdown").text("Bất kỳ");
        $(element).siblings("div.filter-adopt-dropdown-item").each((_, el) => {
            $(el).children("div.symbol").children("div.symbol-add").removeClass("hide");
            $(el).children("div.symbol").children("div.symbol-remove").removeClass("show");
        });
    });
});

$("div.filter-adopt-dropdown").each((_, element) => {
    $(element).on("DOMSubtreeModified", () => {
        console.log($(element).text());
    });
});

// --- Filter button for responsive ---
$("div.filter-button-responsive").on("click", () => {
    $("div.filter-button-responsive").toggleClass("filter-button-blueBackground");
    $("div.filter-button-responsive").children("div.filter-button-off").toggleClass("hide");
    $("div.filter-button-responsive").children("div.filter-button-on").toggleClass("show-flex");
    $("div.filter-adopt-menu").toggleClass("show");
});