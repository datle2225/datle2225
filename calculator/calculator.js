let display = function(event) {
    var key = checkKey(event.target.textContent);
    if (key) {
        try {
            var screen = document.getElementsByClassName("screen")[0];
            if (screen.textContent != Infinity) {
                if (key == "=") screen.textContent = calculator(screen.textContent);
                else if (key == "←") screen.textContent = screen.textContent.slice(0, -1);
                else if (key == "x2") screen.textContent = Number(Math.pow(screen.textContent, 2).toFixed(5));
                else if (key == "x!") screen.textContent = factorial(screen.textContent);
                else if (key == "√x") {
                    sqrt = Math.sqrt(screen.textContent);
                    if (sqrt !== sqrt) throw Error;
                    screen.textContent = Number(sqrt.toFixed(5));
                }
                else if (screen.textContent.length < 20) screen.textContent += key;
            }
            if (key == "AC") screen.textContent = "";
        }
        catch(err) {
            alert("Bạn đã nhập không đúng.")
        }
    }
}

let checkKey = function(key) {
    if (key.length < 3) {
        var acceptedKey = "0123456789+-×÷.=←ACx2x!√x";
        if (acceptedKey.includes(key)) return key;
    }
    return null;
}

let calculator = function(str) {
    var newStr = str.replace(/×/g, "*").replace(/÷/g, "/").replace(/--/g, "+");
    var result = eval(newStr);
    if (Math.ceil(result) == result) {
        if (result != Infinity) return result;
        else throw Error;
    }
    else return Number(result.toFixed(5));
}

let factorial = function(num) {
    if (Math.ceil(num) == num && num >= 0) {
        if (num > 10000) {
            alert("Phép tính quá lớn");
            return num;
        }
        else {
            var result = 1;
            for(i = 1; i <= num; i++) {
                result *= i;
            }
            return result;
        }
    }
    else throw Error;
}

let buttons = document.getElementsByClassName("calculator")[0];
buttons.addEventListener("click", display)