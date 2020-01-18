// --- mock data ---

let users = [{
        "id": 1,
        "username": "user1",
        "password": "1",
        "firstName": "Le",
        "lastName": "Dat",
        "likeList": [2, 1, 5, 4, 3]
    },
    {
        "id": 2,
        "username": "user2",
        "password": "abcd1234",
        "firstName": "",
        "lastName": "",
        "likeList": []
    }
]

let cats = [{
        "id": 1,
        "name": "Boss",
        "place": "Hà Nội",
        "age": "6 tháng",
        "gender": "Đực",
        "breed": "Mèo mun",
        "imagePath": "assets/images/cats/1.png",
        "about": [
            "Sống tình cảm và rất chân thành",
            "Mồm kêu rất to khi bị bắt đi tắm hoặc bị đưa đi chơi",
            "Có sở thích ngắm đường phố và ngủ trong lòng chủ"
        ],
        "color": "Đen",
        "joinedDate": "2019/04/22"
    },
    {
        "id": 2,
        "name": "Mỳ",
        "place": "Hà Nội",
        "age": "6 tháng",
        "gender": "Cái",
        "breed": "Mèo Anh lông ngắn",
        "imagePath": "assets/images/cats/2.png",
        "about": [
            "Một cô nàng đỏng đảnh. Nếu đã cho phép bạn chạm vào người thì bạn sẽ được bế ẵm, ôm ấp. Còn nếu không thì đừng hòng chạm được vào cô ấy",
            "Rất thích ăn sữa chua",
            "Đanh đá với các bạn mèo khác nhưng lại rất thích chơi với trẻ em"
        ],
        "color": "Đen",
        "joinedDate": "2019/10/25"
    },
    {
        "id": 3,
        "name": "Bông Xù",
        "place": "Hồ Chí Minh",
        "age": "Sơ sinh",
        "gender": "Cái",
        "breed": "Mèo Ba Tư",
        "imagePath": "assets/images/cats/3.png",
        "about": [],
        "color": "Trắng",
        "joinedDate": "2019/03/25"
    },
    {
        "id": 4,
        "name": "Bim Bim",
        "place": "Hà Nam",
        "age": "Sơ sinh",
        "gender": "Đực",
        "breed": "Mèo mướp",
        "imagePath": "assets/images/cats/4.png",
        "about": [],
        "color": "Vàng",
        "joinedDate": "2019/09/23"
    },
    {
        "id": 5,
        "name": "Bi",
        "place": "Hà Giang",
        "age": "6 tháng",
        "gender": "Đực",
        "breed": "Mèo Anh lông ngắn",
        "imagePath": "assets/images/cats/5.png",
        "about": [],
        "color": "Đen",
        "joinedDate": "2019/09/24"
    },
    {
        "id": 6,
        "name": "Hoàng Tử",
        "place": "Hải Dương",
        "age": "1 tuổi",
        "gender": "Cái",
        "breed": "Mèo Anh lông dài",
        "imagePath": "assets/images/cats/6.png",
        "about": [],
        "color": "Nâu",
        "joinedDate": "2019/10/25"
    }
]

let articalSubMenus = [{
        "menuTitle": "Nhận nuôi mèo",
        "imgPath": "assets/images/articalMenu/catAdopt.png",
        "descriptionTitle": "Danh sách kiểm tra trước khi nhận nuôi mèo",
        "descriptionMore": "Suy nghĩ về việc nhận nuôi một con mèo? Tìm hiểu những gì cần xem xét để đảm bảo một gia đình yên bình và hạnh phúc.",
        "subArticals": [
            "Nhận nuôi mèo phù hợp với bạn",
            "Một con mèo có giá bao nhiêu?",
            "9 điều tâm linh về mèo thường gặp"
        ]
    },
    {
        "menuTitle": "NHỮNG MẨU CHUYỆN VUI KHI NHẬN NUÔI THÚ CƯNG",
        "imgPath": "assets/images/articalMenu/funStories.png",
        "descriptionTitle": "Đối với cặp vợ chồng yêu mèo này, hai tốt hơn một",
        "descriptionMore": "Khi Mathé và Jordan đến thăm Cửa hàng thú cưng ở New York Animal Care and Control vào tháng 12 năm ngoái, họ biết rằng họ muốn có một con mèo, nhưng hai ư? Họ đã không ngờ đến điều đó.",
        "subArticals": [
            "Bella là một sự bổ sung hoàn hảo",
            "Pony đã nhảy vào một cuộc sống và trái tim của một cặp đôi như thế nào?",
            "Hitchcock đã có một câu chuyện mới"
        ]
    },
    {
        "menuTitle": "THÔNG TIN KHI NHẬN NUÔI THÚ",
        "imgPath": "assets/images/articalMenu/adoptInfo.png",
        "descriptionTitle": "Năm quan niệm sai lầm phổ biến về việc nhận nuôi thú cưng",
        "descriptionMore": "Có rất nhiều điều bí mật và quan niệm sai lầm về việc nhận nuôi thú cưng. Chúng ta hãy cùng đi tìm hiểu sự thật nào.",
        "subArticals": [
            "Dự luật về quyền nhận thú nuôi",
            "Làm thế nào để tôi khiếu nại về nơi trú ẩn hoặc nhóm cứu hộ?",
            "Trước khi bạn phàn nàn về nơi trú ẩn động vật địa phương của bạn"
        ]
    }
]

let otherItems = [{
        "imagePath": "assets/images/articalOtherItems/catCare.png",
        "description": "Các bài viết về cách chăm sóc mèo"
    },
    {
        "imagePath": "assets/images/articalOtherItems/hospital.png",
        "description": "Các bài viết về các trung tâm cứu hộ"
    },
    {
        "imagePath": "assets/images/articalOtherItems/video.png",
        "description": "Thư viện video"
    }
]

let articalsInfo = [{
        "title": "Tại sao một số chú mèo lại thích nước?",
        "imgPath": "assets/images/articalSubMenu/adopt/1.png",
        "owner": "Petfinder",
        "description": "Mèo nổi tiếng là ghét nước, nhưng bạn có biết rằng một số giống mèo thích bị ướt? Tìm hiểu những giống mèo đó, và tại sao. Con mèo của bạn có thích bị ướt không? Nói theo thống kê, có lẽ là không! Hầu hết những con mèo đều bị cuốn hút bởi nước chảy ngay cả khi chúng không muốn chơi trong nó - nhưng một số mèo không chỉ chịu đựng được nước, chúng ...",
    },
    {
        "title": "Tên mèo ngọt ngào và dễ thương bạn chưa bao giờ nghe",
        "imgPath": "assets/images/articalSubMenu/adopt/2.png",
        "owner": "Petfinder",
        "description": "Suy nghĩ về việc nhận nuôi một con mèo? Thử xem liệu một trong những tên mèo tuyệt vời này có thể là hoàn hảo cho thú cưng mới của bạn! Bạn đã sẵn sàng để nhận nuôi một con mèo mới? Có rất nhiều việc phải làm để đảm bảo bạn đã sẵn sàng, nhưng ít nhất là phải chọn được một cái tên đáng yêu cho mèo của bạn. Dưới đây là 20 chú mèo dễ thương và sáng tạo ...",
    },
    {
        "title": "Giống mèo tốt nhất cho trẻ em",
        "imgPath": "assets/images/articalSubMenu/adopt/3.png",
        "owner": "Petfinder",
        "description": "Tìm kiếm một giống mèo tuyệt vời cho trẻ em? Không gì ngoài những người bạn đồng hành vui tươi, tình cảm. Mèo là vật nuôi thích hợp cho các gia đình có trẻ em vì chúng ít phải kiểm soát và dễ chăm sóc. Tuy nhiên, bạn sẽ muốn xem xét lối sống của gia đình bạn để chọn giống mèo phù hợp. Các giống độc lập, ít năng lượng sẽ không thích hợp cho việc huấn luyện ...",
    },
    {
        "title": "Tại sao người Ai Cập thờ mèo?",
        "imgPath": "assets/images/articalSubMenu/adopt/4.png",
        "owner": "Petfinder",
        "description": "Bên cạnh việc là bạn đồng hành tuyệt vời, mèo có thể đã thực sự cứu nền văn minh khỏi nạn đói và bệnh tật. Hãy tưởng tượng bạn đang sống ở một nơi mà mọi ngôi nhà đều tấp nập với những con thú nhỏ bé, nguy hiểm. Một số mối đe dọa ẩn nấp ở mọi góc: rắn độc trốn trong lọ đất sét, chuột làm hỏng số lượng lớn hạt lưu trữ, bọ cạp độc bò dưới nôi. Trong thời gian và địa điểm này ...",
    }
]

class User {
    getUsers() {
        return users;
    };

    getUsernames() {
        return users.map(user => user["username"]);
    };

    getUserLikeList(username) {
        for (let user of users) {
            if (user["username"] == username) return user["likeList"];
            return [];
        }
    };

    addUser(user) {
        var userObject = {
            "id": users.length + 1,
            "username": user["username"],
            "password": user["password"],
            "firstName": user["firstName"],
            "lastName": user["lastName"],
            "likeList": []
        }
        users.push(userObject);
        return userObject
    };

    login(username, password) {
        for (var i = 0; i < users.length; i++) {
            if (username == users[i]["username"]) {
                if (password == users[i]["password"]) return users[i];
                else return {};
            }
        }
        return {};
    }

    changPassword(username, oldPassword, newPassword) {
        for (var i = 0; i < users.length; i++) {
            if (username == users[i]["username"]) {
                if (oldPassword == users[i]["password"]) {
                    users[i]["password"] = newPassword;
                    return true;
                } else return false;
            }
        }
        return false;
    }
}

class Cat {
    getCats() {
        return cats;
    }

    getCatById(catId) {
        for (var i = 0; i < cats.length; i++) {
            if (cats[i]["id"] == catId) return cats[i];
        }
        return {};
    }

    getCatsByLikeList(likeList) {
        var result = [];
        for (let catId of likeList) {
            result.push(this.getCatById(catId));
        }
        return result;
    }

    searchCatByName(name) {
        var catList = [];
        for (var i = 0; i < cats.length; i++) {
            if (cats[i]["name"].toLowerCase().includes(name.toLowerCase())) catList.push(cats[i]);
        }
        return catList;
    }

    searchCatByNameInList(catList, name) {
        var result = [];
        for (var i = 0; i < catList.length; i++) {
            if (catList[i]["name"].toLowerCase().includes(name.toLowerCase())) result.push(catList[i]);
        }
        return result;
    }

    searchCatByAgeInList(catList, age) {
        var result = [];
        for (var i = 0; i < catList.length; i++) {
            for (let item of age) {
                if (catList[i]["age"] == item) result.push(catList[i]);
            }
        }
        return result;
    }

    searchCatByBreedInList(catList, breed) {
        var result = [];
        for (var i = 0; i < catList.length; i++) {
            for (let item of breed) {
                if (catList[i]["breed"] == item) result.push(catList[i]);
            }
        }
        return result;
    }

    searchCatByGenderInList(catList, gender) {
        var result = [];
        for (var i = 0; i < catList.length; i++) {
            for (let item of gender) {
                if (catList[i]["gender"] == item) result.push(catList[i]);
            }
        }
        return result;
    }

    searchCatByColorInList(catList, color) {
        var result = [];
        for (var i = 0; i < catList.length; i++) {
            for (let item of color) {
                if (catList[i]["color"] == item) result.push(catList[i]);
            }
        }
        return result;
    }

    searchCat(data) {
        var catList = this.getCats();
        if (data.name) {
            catList = this.searchCatByNameInList(catList, data.name.trim());
        }
        if (data.breed) {
            catList = this.searchCatByAgeInList(catList, data.age);
        }
        if (data.age) {
            catList = this.searchCatByBreedInList(catList, data.age);
        }
        if (data.gender) {
            catList = this.searchCatByBreedInList(catList, data.age);
        }
        if (data.color) {
            catList = this.searchCatByBreedInList(catList, data.color);
        }
        return catList;
    }
}

class ArticalSubMenu {
    getArticalSubMenus() {
        return articalSubMenus;
    }
}

class OtherItem {
    getOtherItems() {
        return otherItems;
    }
}

class ArticalInfo {
    getArticalsInfo() {
        return articalsInfo;
    }
}