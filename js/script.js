window.onload = function ()
{
    // function that adding pages to dropdown
    var j = 0;
    var numberOfPages = 31;
    document.getElementById("dropdown-row").innerHTML += "<div class='col-xs-4' id='colRow" + j + "'" + "></div>";
    for (var i = 1; i < (numberOfPages); i++)
    {
        if (((i % 10) === 0) && (i < (numberOfPages - 1)))
        {
            document.getElementById("dropdown-row").innerHTML += "<div class='col-xs-4' id='colRow" + (i / 10) + "'" + "></div>";
            document.getElementById("colRow" + j).innerHTML += "<a class='dropdown-item' href=" + "'js" + i + ".html'" + ">Wyzwanie " + i + "</a >";
            j++;
        }
        else
        {

            document.getElementById("colRow" + j).innerHTML += "<a class='dropdown-item' href=" + "'js" + i + ".html'" + ">Wyzwanie " + i + "</a >";
        }
    }
    // End of function
    highlight();
    
};

//function which add color to special words of Javascript

function highlight() {
    if (window.location.pathname != '/index.html') {
        var scriptCon = document.getElementById("challengeCode");
        var words = scriptCon.textContent.split(" ");
        scriptCon.innerHTML = "";

        for (var i = 0; i < words.length; i++) {
            if (words[i] === "function" || words[i] === "if" || words[i] === "for" || words[i] === "var" || words[i] === "else" || words[i] === "return" || words[i] === "const") {
                    words.splice(i, 0, "<span class='jsWord'>");
                    words.splice(i + 2, 0, '</span>');
                    if (words[i] === "<span class='jsWord'>" || words[i] === "</span") {
                        i++;
                    };
                }
        };
    }
    else
        return;
    return scriptCon.innerHTML = words.join(" ");
};

// End of function

//drum sound functions, challegne 1
if (window.location.pathname == '/js1.html') {
    var clapSound = document.getElementById('clap');
    var hihatSound = document.getElementById('hihat');
    var kickSound = document.getElementById('kick');
    var openhatSound = document.getElementById('openhat');
    var boomSound = document.getElementById('boom');
    function pressedA() {
        clapSound.currentTime = 0;
        clapSound.play();
        document.getElementById("A").style.background = "#595959";
        setTimeout(function () {
            document.getElementById("A").style.background = "#262626";
        }, 100);

    };
    function pressedS() {
        hihatSound.currentTime = 0;
        hihatSound.play();
        document.getElementById("S").style.background = "#595959";
        setTimeout(function () {
            document.getElementById("S").style.background = "#262626";
        }, 100);

    };
    function pressedD() {
        kickSound.currentTime = 0;
        kickSound.play();
        document.getElementById("D").style.background = "#595959";
        setTimeout(function () {
            document.getElementById("D").style.background = "#262626";
        }, 100);

    };
    function pressedF() {
        openhatSound.currentTime = 0;
        openhatSound.play();
        document.getElementById("F").style.background = "#595959";
        setTimeout(function () {
            document.getElementById("F").style.background = "#262626";
        }, 100);

    };
    function pressedG() {
        boomSound.currentTime = 0;
        boomSound.play();
        document.getElementById("G").style.background = "#595959";
        setTimeout(function () {
            document.getElementById("G").style.background = "#262626";
        }, 100);

    };
    window.addEventListener("keypress", drumFunction);
    function drumFunction(evt) {

        if (evt.keyCode === 97) {
            pressedA();
        }
        else if (evt.keyCode === 115) {
            pressedS();
        }
        else if (evt.keyCode === 100) {
            pressedD();
        }
        else if (evt.keyCode === 102) {
            pressedF();
        }
        else if (evt.keyCode === 103) {
            pressedG();
        }
        else
            return;
    };
};

//End of function
//Clock, challenge 2
if (window.location.pathname == '/js2.html') {
    setInterval(setClock, 1000);
    const hourHand = document.getElementById("hour");
    const minuteHand = document.getElementById("minute");
    const secondHand = document.getElementById("second");
    function setClock() {
        const currentDate = new Date();
        const currentSecond = currentDate.getSeconds();
        const currentMinutes = ((currentSecond / 60) + currentDate.getMinutes());
        const currentHour = ((currentMinutes / 60) + currentDate.getHours());
        secondHand.style.transform = "rotate(calc(" + currentSecond + "* 6deg))";
        minuteHand.style.transform = "rotate(calc(" + currentMinutes + "* 6deg))";
        hourHand.style.transform = "rotate(calc(" + currentHour + "* 30deg))";
    }
    setClock();
}

//end of function, challenge 2