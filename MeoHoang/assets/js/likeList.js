// --- Assign global variable ---
let sort = "newestLike";

// --- Sort ---

$("div.likeListSort-label").on("click", () => {
    $("div.likeListValue").toggleClass("blueColor-likeList");
    $("div.likeListValues").toggleClass("show");
    $($("div.likeListSort-label").children("svg.likeListSort-svg")[0]).toggleClass("hide");
    $($("div.likeListSort-label").children("svg.likeListSort-svg")[1]).toggleClass("show");
});

$("div.likeListValues").children().each((_, el) => {
    $(el).on("click", () => {
        $("div.likeListValue").text(`${$(el).text()}`);
        $("div.likeListValues").removeClass("show");
        $("div.likeListValue").removeClass("blueColor-likeList");
        $($("div.likeListSort-label").children("svg.likeListSort-svg")[0]).removeClass("hide");
        $($("div.likeListSort-label").children("svg.likeListSort-svg")[1]).removeClass("show");
        
        sort = $(el).data("value");
    });
});
