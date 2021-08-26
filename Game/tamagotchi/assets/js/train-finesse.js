// Defining variables //

let myGamePiece;
let myObstacles = [];
let myScore;
let gameDiv = {
    $element: $('#game'),
    width: $('#game').width(),
    height: $('#game').height(),
    speed: 14000 / $('#game').width() > 10 ? 10 : 14000 / $('#game').width()
};
let size = gameDiv.width > gameDiv.height ? gameDiv.width * 0.03 : gameDiv.height * 0.03;

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.context = this.canvas.getContext("2d");
        this.canvas.width = gameDiv.width;
        this.canvas.height = gameDiv.height;
        gameDiv.$element.html(this.canvas);
        $(this.canvas).mousedown(() => { accelerate(-gameDiv.speed / (size * 3)) });
        $(this.canvas).mouseup(() => { accelerate(gameDiv.speed / (size * 10)) });
        $(this.canvas).on('touchstart', () => { $(this.canvas).trigger('mousedown') });
        $(this.canvas).on('touchend', () => { $(this.canvas).trigger('mouseup') });
        this.frameNo = 0;
        this.frameSpeed = 150;
        this.interval = setInterval(updateGameArea, gameDiv.speed);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        gameDiv.$element.html(null);
    },
}


// Defining functions //

function startGame() {
    myGamePiece = new Component(size, size, "red", 10, 100);
    myGamePiece.gravity = gameDiv.speed / (size * 10);
    myScore = new Component("1.6rem", null, "black", gameDiv.width * 0.95, 40, "text");
    myGameArea.start();
}

class Component {
    constructor(width, height, color, x, y, type) {
        this.type = type;
        this.score = 0;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.update = function() {
            var ctx = myGameArea.context;
            if (this.type == "text") {
                ctx.font = this.width + ' "Press Start 2P"';
                ctx.textAlign = "right";
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        };
        this.newPos = function() {
            this.gravitySpeed += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY + this.gravitySpeed;
            this.hitBottom();
            this.hitCeiling();
        };
        this.hitBottom = function() {
            var rockbottom = myGameArea.canvas.height - this.height;
            if (this.y > rockbottom) {
                this.y = rockbottom;
                this.gravitySpeed = 0;
            }
        };
        this.hitCeiling = function() {
            if (this.y < 0) {
                this.y = 0;
                this.gravitySpeed = 0;
            }
        };
        this.crashWith = function(otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }
            return crash;
        };
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (let obstacle of myObstacles) {
        if (myGamePiece.crashWith(obstacle)) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(myGameArea.frameSpeed)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height;
        minHeight = size * 3;
        maxHeight = size * 5;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = size * 3;
        maxGap = size * 6;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new Component(size / 2, height, "green", x, 0));
        myObstacles.push(new Component(size / 2, y - height - gap, "green", x, height + gap));
    }
    for (let obstacle of myObstacles) {
        obstacle.x += -1;
        obstacle.update();
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
    if (myGameArea.frameNo % 2000 === 0 && myGameArea.frameSpeed <= 20 && gameDiv.speed > 7) {
        gameDiv.speed--;
        clearInterval(this.interval);
        this.interval = setInterval(updateGameArea, gameDiv.speed);
    }
    if (myGameArea.frameNo % 500 === 0) {
        myGameArea.frameSpeed = myGameArea.frameSpeed - myGameArea.frameNo / 500 > 20 ? myGameArea.frameSpeed - myGameArea.frameNo / 500 : 20
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 === 0) {
        return true;
    }
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}

startGame();
$(window).resize(function() {
    myGameArea.stop();
});