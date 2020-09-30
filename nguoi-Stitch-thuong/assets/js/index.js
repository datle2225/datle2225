function toFirstLetterUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$.ajax({
    type: "GET",
    url: `https://api.github.com/repos/datle2225/datle2225.github.io/git/trees/${CONSTANT.BRANCH}:${CONSTANT.FOLDER}/${CONSTANT.ARTICLES_PATH}`,
    success: function (response) {
        console.log(response.tree);
        var articles = '';
        for (let article of response.tree) {
            var info = article.path.split('-');
            var link = info.slice(4).join('-');
            var title = toFirstLetterUpperCase(link.replaceAll('-', ' ').slice(0, -5));
            articles += `
                <div style="margin: 5px 0;">
                    <a href='${CONSTANT.ARTICLES_PATH}/${article.path}'>${title}</a>
                    <p>Được viết ngày ${info[0]}-${info[1]}-${info[2]}</p>
                </div>
            `;
        }
        $("#articles").html(articles);
    }
});