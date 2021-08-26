// Defining variables //
let gameManager = new GameManager(4, KeyboardInputManager, HTMLActuator);
let gameDiv = {
    $element: $('#game'),
    width: $('#game').outerWidth(),
    height: $('#game').outerHeight()
};
let size = gameDiv.width < gameDiv.height ? gameDiv.width : gameDiv.height;

// Defining functions //
let isDeviceWideEnough = () => {
    gameDiv = {
        $element: $('#game'),
        width: $('#game').outerWidth(),
        height: $('#game').outerHeight()
    }
    return (gameDiv.width > 320 && gameDiv.height > 415) || (gameDiv.width > 415 && gameDiv.height > 320);
}

let checkDevice = () => {
    if (!isDeviceWideEnough()) {
        gameDiv.$element.html(`
            <div style="text-align: center">
                This device is not wide enough!
            </div>
        `);
    }
}


// Run //
$(window).resize(function() {
    checkDevice();
});

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function() {
    if (isDeviceWideEnough) {
        gameManager.restart();
    }
});

checkDevice();