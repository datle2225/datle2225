var login = 'login'
var password = 'password'
var token = btoa(`${login}:${password}`)

var content = btoa(`content`)

var url = 'https://api.github.com/repos/datle2225/datle2225.github.io/contents/nguoi-Stitch-thuong/test.txt'

var headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Basic ${token}`
}

var body = {
    "message":"message",
    "content":content
}

$.ajax({
    type: "PUT",
    url: "https://api.github.com/repos/datle2225/datle2225.github.io/contents/nguoi-Stitch-thuong/",
    data: "data",
    success: function (response) {
        
    }
});