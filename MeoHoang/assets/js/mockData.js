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