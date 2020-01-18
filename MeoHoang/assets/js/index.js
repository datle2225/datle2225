// --- Action card items ---
$("div.card-item").each((_, element) => {
    $(element).children("svg").on("click", () => {
        location.href = $(element).data("url");
    });
    $(element).children("button").on("click", () => {
        location.href = $(element).data("url");
    });
});

$("div.articalCard").each((_, element) => {
    $(element).on("click", () => {
        location.href = $(element).data("url");
    });
});