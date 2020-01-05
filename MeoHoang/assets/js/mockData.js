// --- mock data ---

let users = [{
        "id": 1,
        "username": "user1",
        "password": "Abc@1234",
        "firstName": "Le",
        "lastName": "Dat",
        "likeList": [1, 2, 3]
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

class User {
    getUsers() {
        return users;
    };

    getUsernames() {
        return users.map(user => user["username"]);
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
}