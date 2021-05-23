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
        highlight("challengeCode");
    
    };

    //function which add color to special words of Javascript

    function highlight(element_id) {
    if (window.location.pathname != '/index.html') {
    var scriptCon = document.getElementById(element_id);
    var words = scriptCon.textContent.split(" ");
    scriptCon.innerHTML = "";

    for (var i = 0; i < words.length; i++)
    {
        if (words[i] === "function" || words[i] === "if" || words[i] === "for" || words[i] === "var" || words[i] === "else" || words[i] === "return" || words[i] === "const" || words[i] === "new" || words[i] === "let") {
    words.splice(i, 0, "<span class='jsWord'>");
    words.splice(i + 2, 0, '</span>');
    if (words[i] === "<span class='jsWord'>" || words[i] === "</span") {
        i++;
    };
    } else if (words[i].slice(0, 6) === "window" || words[i].slice(0, 8) === "document") {
        var obj = words[i].split(".");

        obj[0] = "<span class='jsWord'>" + obj[0] + '</span>';
        if (obj[obj.length - 1].indexOf(";") > 0) {
            obj[obj.length - 1] = obj[obj.length - 1] + "<br>";
        }
        if (words[i] === "<span class='jsWord'>" || words[i] === "</span") {
            i++;
        };
        words[i] = obj.join(".");
    } else if (words[i].slice(0, 10) === "setTimeout" || words[i].slice(0, 11) === "setInterval" || words[i].slice(1, 7) === "window") {
        var obj = words[i].split("(");
        if (obj[1].slice(0, 6) === "window") {
           var temp_obj = obj[1].split(".");
            temp_obj[0] = "<span class='jsWord'>" + temp_obj[0] + '</span>';
            obj[1] = temp_obj.join(".");
        }
        if (obj[0].length) {
            obj[0] = "<span class='jsWord'>" + obj[0] + '</span>';
        }
        if (obj[1] == "function") {
            obj[1] = "<span class='jsWord'>" + obj[1] + '</span>';
        }
        if (obj[obj.length - 1].indexOf(";") > 0) {
            obj[obj.length - 1] = obj[obj.length - 1] + "<br>";
        }
        if (words[i] === "<span class='jsWord'>" || words[i] === "</span") {
            i++;
        };
        words[i] = obj.join("(");
    }
    else {
    for (var j = 0; j < words[i].length; j++)
    {   

        if (words[i][j] == ';' ) {
            var obj = words[i].split();
            obj.push("<br>");
            words[i] = obj.join(" ");
        } 
    }
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

    // Update CSS variables, challenge 3
    if (window.location.pathname == '/js3.html') {
    const blur = document.getElementById("blur");
    const spacing = document.getElementById("spacing");
    const backgroundColor = document.getElementById("backgroundColor");
    const img = document.getElementById("challenge3Img");
    function changeProperty() {
    img.style = "border:" + spacing.value + "px solid " + backgroundColor.value + ";filter: blur(" + (blur.value) / 10 + "px);";
    };
    changeProperty();
    };
    //End of function, challenge 3

// Workin with arrays, challenge 4
if (window.location.pathname == '/js4.html') {
    highlight("challengeCode2")
    const inventors = [
        { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
        { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
        { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
        { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
        { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
        { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
        { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
        { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
        { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
        { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
        { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
        { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1999 }
    ];

    const people = [
        'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
        'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
        'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
        'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
        'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
    ];

    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];

    // 1. Filter the list of inventors for those who where born in the 1500's

    function checkYear(obj, number_1, number_2) {
        const filtered_obj = obj.filter((item) => {
            if (item.year >= number_1 && item.year < number_2) {
                return true;
            }
        });
        return filtered_obj;
    }

    // 2. Give us an array of the inventor first and last names

    const full_name = [];
    inventors.forEach((item) => {
        full_name.push(item.first + ' ' + item.last);
    })

    // 3. Sort the inventors by birthdate, oldest to youngest

    const sorted = inventors.sort((first_item, second_item) =>
        first_item.year > second_item.year ? 1 : -1
    );

    // 4. How many years did all inventors live?

    var all_years = 0;
    inventors.forEach((item) => {
        all_years = all_years + (item.passed - item.year);
    })

    // 5. Sort the inventors by years lived

    const oldest_inventor = inventors.sort((first_item, second_item) => {
        return (first_item.passed - first_item.year) > (second_item.passed - second_item.year) ? -1 : 1;

    })

    // 6. Create a list of Boulevards in Paris that contain 'de' anywhere in the name
    //const category = document.querySelector('.mw-category');
    //  const items = Array.from(category.querySelectorAll('a'));
    //  items.map(link => items.textContent).filter(street => street.includes('de'));

    // 7. Sort the people alphabetically by last name
    const sorted_last_name = people.sort((first_item, second_item) => {
        return first_item.split(', ')[1] > second_item.split(', ')[1] ? 1 : -1;
    });

    // 8. Reduce Exercise
    const reduced = data.reduce((object, item) => {
        if (!object[item]) {
            object[item] = 0;
        }
        object[item]++;
        return object;
    }, {});
}

//Flex Panels Image Gallery
if (window.location.pathname == '/js5.html') {
    const img_array = document.getElementsByClassName("img_challenge5")
    function clicked_img() {
        event.target.style.minWidth = "60%";
        event.target.style.maxWidth = null;
        for (const property in img_array) {
           if (event.target.className != img_array[property].className) {
               img_array[property].style.maxWidth = "10%";
               img_array[property].style.minWidth = null;
            }
        }
    }

}

//City population
if (window.location.pathname == '/js6.html') {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = [];
    var req = new XMLHttpRequest();
    req.open('GET', endpoint, true);
    req.send();
    req.onload = function () {
        if (this.status == 200) {
            JSON.parse(this.responseText).forEach(city =>cities.push(city));
        } else {
            console.log(this.status);
        }
    }
    const challenge_6_search = document.getElementById("challenge_6_input");
    const show_more_button = document.getElementById("show_more");
    challenge_6_search.addEventListener('keyup', search);
    
    function search() {
        document.getElementById("City_research").innerHTML = '';
        show_more_button.style.display = 'none';
        cities.forEach(element => {
            if (element.city.includes(challenge_6_search.value)) {
                if (document.getElementById("City_research").childElementCount < 10) {
                    document.getElementById("City_research").innerHTML += `<li> <a href="#">
                                                                            City: ${element.city}
                                                                            </br>
                                                                            Population: ${element.population}
                                                                            </a ></li > `;
                }
                 else {
                    document.getElementById("City_research").innerHTML += `<li style="display:none" class="hidden_cities"><a href="#">
                                                                            City: ${element.city}
                                                                            </br>
                                                                            Population: ${element.population}
                                                                            </a></li>`;
                    show_more_button.style.display = 'block';
                    show_more_button.addEventListener('click', displayAllCities);
                }
                
            }
        })
    };

    function displayAllCities() {
        document.querySelectorAll('.hidden_cities').forEach(el => el.style.display = 'block');
        show_more_button.style.display = 'none';
    };

}

// Array cardio day 2
if (window.location.pathname == '/js7.html') {
    const current_year = new Date().getFullYear();
    const people = [{ name: 'Wes', year: 1988 }, { name: 'Kait', year: 1986 }, { name: 'Irv', year: 1970 }, { name: 'Lux', year: 2015 }];
    const comments = [{ text: 'Love this!', id: 523423 }, { text: 'Super good', id: 823423 }, { text: 'You are the best', id: 2039842 }, { text: 'Ramen is my fav food ever', id: 123523 }, { text: 'Nice Nice Nice!', id: 542328 }];

    // is at least one person 19 or older?;
    people.some((user_year) => {
        if (19 <= (current_year - user_year.year))
            return true
        else
            return false
    });

    // is everyone 19 or older ?;
        people.every((user_year) => {
            return (19 <= (current_year - user_year.year))
        });

    // find the comment with the ID of 823423;
    comments.find(comment => comment.id == 823423);

    // Find the comment with this ID;
    const found_index = comments.findIndex(comment => comment.id == 823423);

    // delete the comment with the ID of 823423
    comments.splice(found_index, 1);

    highlight("challengeCode2");
}

// Fun with  HTML Canvas
if (window.location.pathname == '/js8.html') {
    const canvas = document.getElementById("canvas_draw");
    const cvs = canvas.getContext("2d");
    canvas.width = document.getElementById("challengeContainer").offsetWidth - 20;
    window.addEventListener('resize', () => {
        canvas.width = document.getElementById("challengeContainer").offsetWidth - 20;
    });
    let starting_x = 0;
    let starting_y = 0;
    let mouse_pressed = false;
    let color = "#FF0000";
    let line_width = 10;
    cvs.lineCap = "round";
    cvs.lineJoin = "round";
    cvs.lineWidth = line_width;
    cvs.strokeStyle = color ;

    canvas.addEventListener("mousedown", (e) => {
        mouse_pressed = true;
        starting_x = e.offsetX;
        starting_y = e.offsetY;
    });
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", () => { mouse_pressed = false; });
    canvas.addEventListener("mouseout", () => { mouse_pressed = false; });
    canvas.addEventListener("wheel", (e) => {
        if (e.deltaY > 0) {
            line_width--;
        } else {
            line_width++;
        }
    });

    function drawing(event) {
        if (mouse_pressed) {
            color = Math.floor(360 * Math.random());
            cvs.beginPath();
            cvs.strokeStyle = `hsl(${color}, 100%, 50%)`;
            cvs.lineWidth = line_width;
            cvs.moveTo(starting_x, starting_y);
            cvs.lineTo(event.offsetX, event.offsetY);
            cvs.stroke();
            starting_x = event.offsetX;
            starting_y = event.offsetY;

        } else
            return

    };

}