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
        var scriptCon = document.getElementById("scriptContainer");
        var words = div.textContent.split(" ");
        scriptCon.innerHTML = "";

        for (var i = 0; i < words.length; i++) {
            if (words[i] === "bad" || words[i] === "good") {
                words.splice(i, 0, "<span class='jsWord'>");
                words.splice(i + 2, 0, '</span>');
                alert(words);
                if (words[i] === "<span class='jsWord'>" || words[i] === "</span") {
                    i++;
                }
            }
        }
        return scriptCon.innerHTML = words.join(" ")
    }
    else
        return;
};

// End of function

//drum sound functions
if (window.location.pathname == '/js1.html') {
    var clapSound = document.getElementById('clap');
    var hihatSound = document.getElementById('hihat');
    var kickSound = document.getElementById('kick');
    var openhatSound = document.getElementById('openhat');
    var boomSound = document.getElementById('boom');
    function pressedA() {
        clapSound.currentTime = 0;
        clapSound.play();

    };
    function pressedS() {
        hihatSound.currentTime = 0;
        hihatSound.play();
    };
    function pressedD() {
        kickSound.currentTime = 0;
        kickSound.play();
    };
    function pressedF() {
        openhatSound.currentTime = 0;
        openhatSound.play();
    };
    function pressedG() {
        boomSound.currentTime = 0;
        boomSound.play();
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

    };
};

//End of functiona