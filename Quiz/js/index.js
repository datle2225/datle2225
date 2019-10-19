let quiz = [
    {
        "ques" : "Điều nào sau đây đúng về mèo?",
        "answer" : [
            "Mèo có thể tiếp cận độ cao lớn",
            "Mèo ngủ 10 tiếng mỗi ngày",
            "Mèo là động vật đẻ trứng"
        ]
    },
    {
        "ques" : "Mèo tạo được bao nhiêu âm thanh khác nhau?",
        "answer" : [
            "149",
            "298",
            "100"
        ]
    },
    {
        "ques" : "Mèo ko cảm nhận được vị gì?",
        "answer" : [
            "Vị mặn",
            "Vị ngọt",
            "Vị cay"
        ]
    },
    {
        "ques" : "Mèo sẽ hôn lên má của bạn bằng lưỡi khi mà nó ...",
        "answer" : [
            "Yêu bạn",
            "Muốn thịt bạn",
            "Tin tưởng bạn"
        ]
    },
    {
        "ques" : "Mèo ngủ bao nhiêu phần trăm trong suốt cuộc đời?",
        "answer" : [
            "70%",
            "68%",
            "30%"
        ]
    },
    {
        "ques" : "Mèo ngủ mấy tiếng mỗi ngày?",
        "answer" : [
            "14 tiếng",
            "10 tiếng",
            "16 tiếng"
        ]
    },
    {
        "ques" : "Mèo có bao nhiêu lớp lông?",
        "answer" : [
            "2 lớp",
            "1 lớp",            
            "3 lớp"
        ]
    },
    {
        "ques" : "Loài mèo sẽ chịu trách nhiệm về sự tuyệt chủng của bao nhiêu loài động vật?",
        "answer" : [
            "12 loài động vật",
            "33 loài động vật",
            "40 loài động vật"
        ]
    },
    {
        "ques" : "Mèo có cảm xúc giống ...?",
        "answer" : [
            "Con người",
            "Chó",
            "Ai mà bít được @@"
        ]
    },
    {
        "ques" : "Nơi đâu được mệnh danh là thiên đường của loài mèo?",
        "answer" : [
            "Nước Mỹ",
            "Nước Nhật Bản",            
            "Nước Anh"
        ]
    }
]

let rightAnswer = [
    "Mèo có thể tiếp cận độ cao lớn", 
    "100",
    "Vị ngọt",
    "Tin tưởng bạn",
    "70%",     
    "16 tiếng",
    "2 lớp",
    "33 loài động vật",
    "Con người",
    "Nước Nhật Bản"
]
let listAnswer = new Array(10).fill(null);
let chooseQues = 1;

let changeQues = function(quesNum) {
    if (Number.isInteger(quesNum) && (quesNum - 1) > -1 && quesNum <= quiz.length) {
        $(".question").text(quiz[quesNum - 1].ques);
        $('.answer').each(function(index, element) {
            $(element).text(quiz[quesNum - 1].answer[index]);
        });
    }
}

let checkAnswer = function() {
    for (var i = 0; i < listAnswer.length; i++) {
        if (!(rightAnswer.includes(listAnswer[i]))) return false;
    }
    return true;
}

$('.quizNum div:not(.submit)').each(function(_, element) {
    $(element).on("click", function() {
        chooseQues = $(element).text();
        $(element).siblings().css({
            "background-color": "#F6F4F5",
            "color": "#393D46"
        });
        $(element).css({
            "background-color": "#393D46",
            "color": "#F6F4F5"
        });
        changeQues(Number($(element).text()));
        $(".answer").css({
            "background-color": "#F6F4F5",
            "color": "#393D46"
        })
        if (listAnswer[chooseQues - 1] != null) {
            $(`.answer:contains(${listAnswer[chooseQues - 1]})`).css({
                "background-color": "#393D46",
                "color": "#F6F4F5"
            });
        }
    })
});

$('.answer').each(function(index, element) {
    $(element).on("click", function() {
        $(element).siblings().css({
            "background-color": "#F6F4F5",
            "color": "#393D46"
            });
        $(element).css({
            "background-color": "#393D46",
            "color": "#F6F4F5"
            });
        listAnswer[chooseQues - 1] = $(element).text();
        changeQues(Number($(element).text()));
        }
    );
});

$('.submit').on("click", function() {
    if (listAnswer.includes(null)) {
        alert("Cố gắng làm hết nào, may mắn là một phần của thực lực đó!")
    }
    else {
        if (checkAnswer()) location.href = "congratulations.html";
        else alert("Có cố gắng, thử lại nào!");
    }
})