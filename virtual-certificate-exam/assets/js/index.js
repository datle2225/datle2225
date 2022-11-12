let USERNAME = null
let EXAMS_REPO = "virtual_certificate_exam"
let EXAMS_PATH = "main:exams"
let TOKEN = null

let dump = {}
let pass_point = 850;
let current_tab = 0;
let questions_content = [];
let answers = {};
let flags = [];
let is_submitted = false;
let countdownInterval;

if (!TOKEN) {
    USERNAME = window.prompt("USERNAME: ");
    TOKEN = window.prompt("TOKEN: ");
}

shuffle = array => {
    let currentIndex = array.length,  randomIndex;
    let newArray = [...array];
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex], newArray[currentIndex]];
    }
  
    return newArray;
}

enterExam = () => {
    current_tab = 0;
    questions_content = [];
    answers = {};
    flags = [];
    is_submitted = false;
    // --- header ---
    $("section.header").load("header.html header", () => {
        // countDown(1, $('#clock'));
        $('.page-name').text(dump.exam_name);
    });
    // --- footer ---
    $("section.footer").load("footer.html footer", () => {
        let questions = `
            <div class="question start active">
                S
            </div>
        `;
        $(".questions").html(questions);

        $("#start_exam").click(() => {
            let exam_config = $("input[name='exam_config']:checked").val();
            let max = dump.content.length;
            switch (exam_config) {
                case '2':
                    let exam_start = $("input[name='exam_start']") && $("input[name='exam_start']").val() ? $("input[name='exam_start']").val() : 1;
                    let exam_end = $("input[name='exam_end']") && $("input[name='exam_end']").val() ? $("input[name='exam_end']").val() : dump.content.length;
                    max = Math.max(exam_start, exam_end);
                    let min = Math.min(exam_start, exam_end);
                    questions_content = dump.content.slice(min-1, max);
                    break;
                    
                case '3':
                    let exam_questions = $("input[name='exam_questions']") && $("input[name='exam_questions']").val() ? $("input[name='exam_questions']").val().split(',') : [1, dump.content.length];
                    exam_questions.forEach(val => {
                        if (val > 0 && val < dump.content.length) {
                            questions_content.push(dump.content[val-1]);
                        }
                    });
                    break;
            
                default:
                    max = $("input[name='exam_quality']") && $("input[name='exam_quality']").val() ? $("input[name='exam_quality']").val() : dump.content.length;
                    questions_content = dump.content.slice(0, max);
                    break;
            }
            if ($("input[name='exam_timer']:checked").length) {
                countDown($("input[name='exam_time_limit']").val() ? $("input[name='exam_time_limit']").val()*60 : 60*60, $('#clock'));
            }

            if ($("input[name='random_question']:checked").length) {
                questions_content = shuffle(questions_content);
            }

            if ($("input[name='random_answer']:checked").length) {
                questions_content.forEach(question => {
                    question.answers_content = shuffle(question.answers_content);
                });
            }

            $(".show_answer").show();
            $(".flag").show();
            $(".submit").show();
            $(".start_exam").hide();
            startExam();
        });

        // On Enter press
        $(document).on('keypress',function(e) {
            if(e.which == 13) {
                $("#start_exam").trigger("click");
            }
        });

    });

    if (!current_tab) {
        $('.question_number').text(dump.exam_code);
        $('.question_content').text(dump.exam_name);

        $('.answers_content').html(`
            <div class="exam_config my-4">
                <label>
                    <input type="radio" name="exam_config" value="1" checked>
                    Làm <input type="number" name="exam_quality" min='1' max='${dump.content.length}'> câu hỏi trên toàn bộ bài thi
                </label>
            </div>
            <div class="exam_config my-4">
                <label>
                    <input type="radio" name="exam_config" value="2">
                    Làm câu hỏi từ câu <input type="number" name="exam_start" min='1' max='${dump.content.length}'> đến câu <input type="number" name="exam_end" min='1' max='${dump.content.length}'>
                </label>
            </div>
            <div class="exam_config my-4">
                <label>
                    <input type="radio" name="exam_config" value="3">
                    Làm câu hỏi được chọn (ngăn cách bởi dấu ',') <input type="text" name="exam_questions">
                </label>
            </div>
            <div class="exam_config d-flex" style="gap: 20px; flex-wrap: wrap; margin-top: 20px;">
                <div>
                    <label>
                        <input type="checkbox" name="exam_timer">
                        Tính giờ?
                    </label>
                </div>
                <div>
                    <label>
                        Thời gian làm bài: <input type="number" name="exam_time_limit" min='1' value='60'> phút
                    </label>
                </div>
            </div>
            <div class="exam_config d-flex" style="gap: 20px; flex-wrap: wrap; margin-top: 20px;">
                <div>
                    <label>
                        <input type="checkbox" name="random_question">
                        Đảo câu hỏi?
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="random_answer">
                        Đảo câu trả lời?
                    </label>
                </div>
            </div>
        `);
        regen();
    }
}

goToExam = url => {
    $.ajax({
        type: "GET",
        url: url,
        headers: {
           "Authorization" : `token ${TOKEN}`
        },
        contentType: "application/json",
        // dataType: "json",
        // data: JSON.stringify({
        //     "content": "aGVsbG8=",
        //     "encoding": "utf-8"
        // })
    }).done(function( data ) {
        // let data = {
        //     "sha": "",
        //     "node_id": "",
        //     "size": 0,
        //     "url": "",
        //     "content": "",
        //     "encoding": ""
        // }

        dump = JSON.parse(atob(data.content));
        enterExam();
    });

    dump = JSON.parse(atob(data.content));
    enterExam();

};

goToQuestion = number => {
    $($(".question")[current_tab]).removeClass('active');
    $($(".question")[number]).trigger('click');
};

chooseExam = () => {
    $.ajax({
        type: "GET",
        url: `https://api.github.com/repos/${USERNAME}/${EXAMS_REPO}/git/trees/${EXAMS_PATH}`,
        headers: {
            "Authorization" : `token ${TOKEN}`
        },
        contentType: "application/json",
        // dataType: "json",
        // data: JSON.stringify({
        //     "content": "aGVsbG8=",
        //     "encoding": "utf-8"
        // })
    }).done(function( data ) {
        // let data = {
        //     "sha": "",
        //     "url": "",
        //     "tree": [
        //         {
        //             "path": "",
        //             "mode": "",
        //             "type": "",
        //             "sha": "",
        //             "size": 0,
        //             "url": ""
        //         }
        //     ],
        //     "truncated": false
        // }

        $('.question_number').text('List exam');
        $('.answers_content').text('');
        $('.explain_content').text('');

        let exams = '';
        data.tree.forEach((exam, index) => {
            exams += `
                <div class="question_review" onclick="goToExam('${exam.url}')">
                    <div class="number">
                        ${exam.path}
                    </div>
                </div>
            `
        });

        $('.question_content').html(exams);
    });
        
    $('.question_number').text('List exam');
    $('.answers_content').text('');
    $('.explain_content').text('');

    let exams = '';
    data.tree.forEach((exam, index) => {
        exams += `
            <div class="question_review" onclick="goToExam('${exam.url}')">
                <div class="number">
                    ${exam.path}
                </div>
            </div>
        `
    });

    $('.question_content').html(exams);
}

findTime = timer => {
    let hours, minutes, seconds;
    minutes = parseInt(timer / 60, 10);
    if (minutes > 59) {
            hours = parseInt(minutes / 60, 10);
            minutes = parseInt(minutes % 60, 10);
    } else {
        hours = 0;
    }
    seconds = parseInt(timer % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return [hours, minutes, seconds];
}

countDown = (duration, $element) => {
    var timer = duration;
    let hours, minutes, seconds;
    [hours, minutes, seconds] = findTime(timer);
    $element.text(hours + ":" + minutes + ":" + seconds);

    countdownInterval = setInterval(function () {
        [hours, minutes, seconds] = findTime(timer-1);
        $element.text(hours + ":" + minutes + ":" + seconds);
        if (--timer < 0) {
            clearInterval(countdownInterval);
            endExam();
            $('#timeout').modal('show');
            $element.text("00:00:00");
        }
    }, 1000);
}

// Get answer for old question
getAnswer = () => {
    if (current_tab && current_tab < questions_content.length + 1) {
        let old_question = questions_content[current_tab-1];
        let answer = [];
        $('input[name="answer"]:checked').each((_, el) => {
            answer.push($(el).val());
        })
        if (answer.length == old_question.right_answer.split(',').length) {
            answers[`${current_tab-1}`] = answer;
            $($(".question")[current_tab]).addClass('done');
        } else {
            $($(".question")[current_tab]).removeClass('active');
        }
    } else {
        // If click on Start
        if(!current_tab) {
            $($(".question")[0]).addClass('done');
        } else {
            $($(".question")[current_tab]).removeClass('active');
        }
    }
}

startExam = () => {
    let questions = '';
    questions_content.forEach((_, index) => {
        questions += `            
            <div class="question" data-number="${index}">
                ${index+1}
            </div>
        `
    });
    questions = $(".questions").html() + questions;
    questions += `
        <div class="question end">
            E
        </div>
    ` 
    $(".questions").html(questions);
    regen();
    $($(".question")[1]).trigger('click');
}

endExam = () => {
    getAnswer();
    $($(".question")[current_tab]).removeClass('active');
    current_tab = questions_content.length + 1;
    $('.answers_content').text('');
    $('.explain_content').text('');

    let is_right_answer = false;
    let point = 0;
    let point_per_ques = Math.ceil(1000 / questions_content.length);
    let reviews = '';
    questions_content.forEach((question, index) => {
        is_right_answer = answers[`${index}`] && isArraysSame(answers[`${index}`], question.right_answer.split(','));
        if (is_right_answer) {
            point += point_per_ques;
        }
        reviews += `
            <div class="${is_right_answer  ? 'question_review' : 'question_review red'}" onclick="goToQuestion(${index+1})">
                <div class="number">
                    ${question.question_number}
                </div>
                <div class="flag">
                    <img src="assets/icon/flag.svg" class="${flags.includes(index) ? 'flag-icon' : 'flag-icon d-none'}" alt="flag-icon"/>
                </div>
                <div class="answered">
                    ${answers[`${index}`] ? answers[`${index}`] : ''}
                </div>
            </div>
        `
    });
    
    $('.question_content').html(reviews);

    let message = '';
    if (point >= pass_point) {
        message = `
            <div class="green">
                Chúc mừng, bạn đã pass với số điểm: ${point > 1000 ? 1000 : point} / 1000
            </div>
        `
    } else {
        message = `
            <div class="red">
                Không ổn, bạn đã KHÔNG pass với số điểm: ${point} / 1000
            </div>
        `
    }

    message += `
        <div>
            Số điểm cần: ${pass_point} / 1000
        </div>
    `;

    $('.question_number').html(`
        ${message}
        Review answers
    `);


    $($(".question")[current_tab]).text('R');
    $($(".question")[current_tab]).addClass('done');
    
    $(".show_answer").html(`
        <button id="retake">Retake</button>
    `);
    $("#retake").click(() => {
        $('.explain_content').text('');
        // Reset keypress
        $(document).removeAttr("keypress");
        
        enterExam();

    });
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    is_submitted = true;
}

anwsersGenerate = (number, is_show_answer) => {
    let new_question = questions_content[number];
    let right_answer = new_question.right_answer.split(',');
    let answers_type = right_answer.length > 1 ? 'checkbox' : 'radio';
    let answers_html = '';
    new_question.answers_content.forEach(answer => {
        answers_html += `
            <div class="answer">
                <label ${is_show_answer && right_answer.includes(answer[0]) ? 'class="green"' : ''}>
                    <input type="${answers_type}" name="answer" value="${answer[0]}" 
                        ${answers[data_number] && answers[data_number].includes(answer[0]) ? 'checked' : ''} 
                    >
                        ${answer.slice(3)}
                </label>
            </div>
        `
    });
    $('.answers_content').html(answers_html);

    var obj = $('.explain_content').text(new_question.explanation);
    obj.html(obj.html().replace(/\n/g,'<br/>'));

    if (is_show_answer) {
        $('.explain_content').show();
    } else {
        $('.explain_content').hide();
    }
}

regen = () => {
    $("#show_answer").click(() => {
        getAnswer();
        anwsersGenerate(current_tab-1, true);
    });

    $("#flag").click(() => {
        if (current_tab && current_tab < questions_content.length + 1) {
            const index = flags.indexOf(current_tab - 1);
            if (index > -1) {
                flags.splice(index, 1);
                $($(".question")[current_tab]).removeClass('flag');
                $(".flag-icon").hide();
            } else {
                flags.push(current_tab - 1);
                $($(".question")[current_tab]).addClass('flag');
                $(".flag-icon").show();
            }
        }
    });

    $("#submit").click(() => {
        $("#submit_confirm").modal('show');
    });

    $("#end_exam").click(() => {
        endExam();
        $("#submit_confirm").modal('hide');
    });

    $(".question").each((_, el) => {
        $(el).click(() => {
            data_number = $(el).data('number');
            $('section.body').scrollTop(0);
            if (data_number != null && current_tab - 1 != data_number) {
                // Get answer for old question
                getAnswer();
                // Generate a new question
                current_tab = data_number + 1;
                let new_question = questions_content[data_number];
                $('.question_number').html(`
                    ${new_question.question_number}
                    <img src="assets/icon/flag.svg" class='flag-icon' style='${flags.includes(data_number) ? '' : 'display: none'}' />
                `);
                $('.question_content').text(new_question.question_content);
                anwsersGenerate(data_number, is_submitted);

            } else if ($(el).hasClass("end")) {
                if (is_submitted) {
                    endExam();
                } else {
                    getAnswer();
                    $($(".question")[current_tab]).removeClass('active');
                    current_tab = questions_content.length + 1;
                    $('.question_number').text('List answer');
                    $('.answers_content').text('');
                    $('.explain_content').text('');
    
                    let reviews = '';
                    questions_content.forEach((question, index) => {
                        reviews += `
                            <div class="question_review" onclick="goToQuestion(${index+1})">
                                <div class="number">
                                    ${question.question_number}
                                </div>
                                <div class="flag">
                                    <img src="assets/icon/flag.svg" class="${flags.includes(index) ? 'flag-icon' : 'flag-icon d-none'}" alt="flag-icon"/>
                                </div>
                                <div class="answered">
                                    ${answers[`${index}`] ? answers[`${index}`] : ''}
                                </div>
                            </div>
                        `
                    });
    
                    $('.question_content').html(reviews);
                }
            }
            $(el).addClass('active');
        })
    });
}

chooseExam();