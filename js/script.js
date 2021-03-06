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
};

// End of function
