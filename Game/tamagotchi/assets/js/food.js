// Defining variables //

let options = [
    ['hamburger', 'hotdog', 'icecream', 'candy'],
    ['carrot', 'apple', 'juice', 'coffee']
]

// Defining functions //
let loadOptions = () => {
    let rowDiv = ''
    for (let row of options) {
        var colDiv = ''
        for (let col of row) {
            colDiv += `
                <div class="col d-flex justify-content-center align-items-center p-0 mx-5 _mx-sm-5 h-100">
                    <div class="option select nes-pointer h-100 d-flex justify-content-center align-items-center" data-option="${col}">
                        <img src="assets/images/food-${col}-default.png" alt="food-${col}-default" class="mw-100 _h-sm-auto">
                        <img src="assets/images/food-${col}-active.png" alt="food-${col}-active" class="mw-100 _h-sm-auto d-none">
                    </div>
                </div>
            `
        }
        rowDiv += `
            <div class="mw-100 row m-0 py-5 h-50">
                ${colDiv}
            </div>
        `
    }
    $('#options').html(rowDiv);
}

let toggle = ({mainElementId, sideElementId=null, totalStatus=2, status=0, changeSideWhenStatus=0, sideStatus=0, second=600, loop=6, callback=null}) => {
    setTimeout(() => {
        $($(`#${mainElementId}`).children()[status]).addClass('d-none');
        status = status + 1 >= totalStatus ? 0 : status + 1;
        $($(`#${mainElementId}`).children()[status]).removeClass('d-none');
        if (status === changeSideWhenStatus) {
            $($(`#${sideElementId}`).children()[sideStatus]).addClass('d-none');
            $($(`#${sideElementId}`).children()[++sideStatus]).removeClass('d-none');
        }
        loop--;
        if (loop > 0) {
            toggle({mainElementId, sideElementId, totalStatus, status, changeSideWhenStatus, sideStatus, second, loop, callback});
        } else if (callback) callback();
    }, second);
}

let eating = option => {
    $('#options').html(`
        <div class="mw-100 row m-0 py-5 h-100">
            <div class="col-7 d-flex justify-content-center align-items-center p-0 h-100" id="sideToggle">
                <img src="assets/images/food-${option}-active.png" alt="food-${option}-active" class="mw-100 h-100 _h-sm-auto">
                <img src="assets/images/food-${option}-eating1.png" alt="food-${option}-eating1" class="mw-100 h-100 _h-sm-auto d-none">
                <img src="assets/images/food-${option}-eating2.png" alt="food-${option}-eating2" class="mw-100 h-100 _h-sm-auto d-none">
            </div>
            <div class="col-5 d-flex justify-content-start align-items-end p-0 h-100" id="mainToggle">
                <img src="assets/images/status-closemouth.png" alt="closemouth" class="_mh-70 _h-sm-auto">
                <img src="assets/images/status-openmouth.png" alt="openmouth" class="_mh-70 _h-sm-auto d-none">
            </div>
        </div>
    `);
    toggle({mainElementId: 'mainToggle', sideElementId: 'sideToggle', callback: happy});
}

let sayNo = () => {
    $('#options').html(`
        <div class="mw-100 row m-0 py-5 h-100">
            <div class="col-12 d-flex justify-content-center align-items-center p-0 h-100" id="status">
                <img src="assets/images/status-normal.png" alt="normal" class="_mh-70 _h-sm-auto">
                <img src="assets/images/status-leftside.png" alt="happy" class="_mh-70 _h-sm-auto d-none">
                <img src="assets/images/status-normal.png" alt="normal" class="_mh-70 _h-sm-auto d-none">
                <img src="assets/images/status-rightside.png" alt="happy" class="_mh-70 _h-sm-auto d-none">
            </div>
        </div>
    `);
    toggle({mainElementId: 'status', totalStatus: 4, loop: 8, second: 300, callback: refresh});
}

let happy = () => {
    $('#options').html(`
        <div class="mw-100 row m-0 py-5 h-100">
            <div class="col-12 d-flex justify-content-center align-items-center p-0 h-100" id="status">
                <img src="assets/images/status-normal.png" alt="normal" class="_mh-70 _h-sm-auto">
                <img src="assets/images/status-happy.png" alt="happy" class="_mh-70 _h-sm-auto d-none">
            </div>
        </div>
    `);
    toggle({mainElementId: 'status', loop: 4, callback: refresh});
}

// Run //

let refresh = () => {
    loadOptions();
    
    $('.option').on('click', function() {
        eating($(this).data('option'));
        // sayNo();
    })
};

refresh();