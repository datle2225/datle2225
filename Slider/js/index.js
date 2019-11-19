let current = 0;
let index = 0;
let second = 0

let animation = function(move) {
    if (current == 3 && move == 1) current = 0;
    else if (current == 0 && move == -1) current = 3;
    $(".slider").css({left: `-${current}00%`});
    current += move;
    $(".slider").animate({left: `-${current}00%`});
    $(".button").css("pointer-events", "none");
    setTimeout(function() {
        $(".button").css("pointer-events", "auto");
    }, 500)
    second = 0;
}

$(document).ready(function() {    
    setInterval(function() {
        if (second >= 3) {
            animation(1);
            second = 0;
        }
        second++;
    }, 1000);
});

$(".next").click(function() {
    animation(1);
});

$(".prev").click(function() {
    animation(-1);
});

$(".page div").click(function() {
    if (current == 3 && $(this).text() == 1) $(".slider").css({left: `0`});
    else if (current != ($(this).text() - 1)) $(".slider").animate({left: `-${$(this).text() - 1}00%`});
    current = $(this).text() - 1;
    second = 0;
})
