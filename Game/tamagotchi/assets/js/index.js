// Defining variables //

let tamagotchi = 'hamster';

// Defining functions //

// tamagotchi moving
let moving = () => {
    return setInterval(() => {
        var width = $('#tamagotchi').width();
        var height = $('div.yard').height() / 2 - $('#tamagotchi').height();
        if($('div.tamagotchi').data('direction') == 'left') {
            var right = parseInt($('div.tamagotchi').css('right'));
            if(width + right < $('div.yard').width() - width + 1) {
                $('div.tamagotchi').css('right', `${width + right}px`);
                $('div.tamagotchi').css('bottom', '0');
            }
            else {
                $('div.tamagotchi').css('bottom', `${height > 0 ? height : 0}px`);
                $('#tamagotchi').attr('src', `assets/images/tamagotchi-${tamagotchi}-1.png`);
                $('div.tamagotchi').data('direction', 'right');
            }
            $('div.tamagotchi').css('left', '');
            $('div.tamagotchi').css('top', '');
        }
        else {
            var left = parseInt($('div.tamagotchi').css('left'));
            if(width + left < $('div.yard').width() - width + 1) {
                $('div.tamagotchi').css('left', `${width + left}px`);
                $('div.tamagotchi').css('top', '0');
            }
            else {
                $('div.tamagotchi').css('top', `${height > 0 ? height : 0}px`);
                $('#tamagotchi').attr('src', `assets/images/tamagotchi-${tamagotchi}-2.png`);
                $('div.tamagotchi').data('direction', 'left');
            }
            $('div.tamagotchi').css('right', '');
            $('div.tamagotchi').css('bottom', '');
        }
    }, 1000)
}

// Run //

$(document).ready(() => {
    $('#tamagotchi').attr('src', `assets/images/tamagotchi-${tamagotchi}-1.png`);
    $('#tamagotchi').removeClass('d-none');
    moving();
});

$('.menu').on('click', function () {
    console.log($(this).data('menu'));
});