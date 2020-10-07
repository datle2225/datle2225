let images = [];

function toFirstLetterUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function pad(n) {
    return n<10 ? '0'+n : n;
}

$.ajax({
    type: "GET",
    headers: {
        Accept: 'application/vnd.github.v3+json',
        // Authorization: `Basic ${token}`
        Authorization: `token ${CONSTANT.READONLY}`
    },
    url: `https://api.github.com/repos/${CONSTANT.USER}/${CONSTANT.REPO}/git/trees/${CONSTANT.BRANCH}:${CONSTANT.FOLDER}/${CONSTANT.IMAGES_PATH}`,
    success: function (response) {
        for (let image of response.tree) {
            images.push(image.path);
        }
        $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/vnd.github.v3+json',
                // Authorization: `Basic ${token}`
                Authorization: `token ${CONSTANT.READONLY}`
            },
            url: `https://api.github.com/repos/${CONSTANT.USER}/${CONSTANT.REPO}/git/trees/${CONSTANT.BRANCH}:${CONSTANT.FOLDER}/${CONSTANT.ARTICLES_PATH}`,
            success: function (response) {
                var tree = UTILS.sortByDate(response.tree);
                var articles = '';
                for (let article of tree) {
                    var info = article.path.split('-');

                    var datetime = new Date(parseInt(info[0]))
                    datetime = `${pad(datetime.getDate())}-${pad(datetime.getMonth() + 1)}-${datetime.getFullYear()}`

                    var link = info.slice(1).join('-');
                    var title = toFirstLetterUpperCase(link.replaceAll('-', ' ').slice(0, -5));
        
                    var imageName = `${article.path.slice(0, -5)}.png`;
                    if (images.includes(imageName)) {
                        articles += `
                            <div class="article">
                                <img src="https://${CONSTANT.REPO}/${CONSTANT.FOLDER}/${CONSTANT.IMAGES_PATH}/${imageName}" alt="article-image"/>
                                <div class="info">
                                    <a href='${CONSTANT.ARTICLES_PATH}/${article.path}'>${title}</a>
                                    <p>Được viết ngày ${datetime}</p>
                                </div>
                            </div>
                        `;
                    }
                    else {
                        articles += `
                            <div class="article">
                                <img src="https://${CONSTANT.REPO}/${CONSTANT.FOLDER}/${CONSTANT.IMAGES_PATH}/default.png" alt="article-image"/>
                                <div class="info">
                                    <a href='${CONSTANT.ARTICLES_PATH}/${article.path}'>${title}</a>
                                    <p>Được viết ngày ${datetime}</p>
                                </div>
                            </div>
                        `;
                    }
                }
                $("#articles").html(articles);
            }
        });
    }
});

