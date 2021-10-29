//import { create } from "browser-sync";

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
        } else if (words[i].slice(0, 6) === "window" || words[i].slice(0, 8) === "document" || words[i].slice(0, 4) === "JSON") {
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

// Hold Shift to Check Multiple Checkboxes
if (window.location.pathname == '/js10.html') {
    const elements = document.querySelectorAll('.inbox input');
    let last_check;
    let between = false;
    elements.forEach(el => el.addEventListener('click', clickedCheckBox));
    function clickedCheckBox() {
        if (event.shiftKey && this.checked && last_check) {
            elements.forEach(el => {
                if (this === last_check) {
                    between = false;
                }
                if (el === this || el === last_check) {
                    between = !between;
                } 
                if (between) {   
                    el.checked = true;
                }

            })
        }
        last_check = this;
    }    
}

// Custom HTML5 Video Player

if (window.location.pathname == '/js11.html') {
    var bar = document.getElementById("video_controls");
    var video_player = document.getElementById("player_video");
    var player = document.getElementById("player_box");
    var slider = document.getElementById("slider");
    var current_time = document.getElementById("currentTimeText");
    var duration_time = document.getElementById("durationTimeText");
    var mutebtn = document.getElementById("mute");
    var mouse_pressed = false;
    var volume_slider = document.getElementById("volume_slider");
    var fullscreen = document.getElementById("fullscreen_btn");

    window.addEventListener("resize", windowResize);
    player.addEventListener("mouseenter", MouseOnPlayer);
    player.addEventListener("mouseleave", MouseOutPlayer);
    slider.addEventListener("change", videoTime);
    video_player.addEventListener("timeupdate", slideTimeUpdate);
    mutebtn.addEventListener("click", muteVideo);
    volume_slider.addEventListener("change", changeVolume);
    fullscreen.addEventListener("click", toggleFullScreen);

    window.onload = function () {
        bar.style.width = video_player.offsetWidth + "px";
        slideTimeUpdate();
    }

    slider.onmousedown = function() {
        mouse_pressed = true;
    }
    slider.onmouseup = function () {
        mouse_pressed = false;
    }

    function toggleFullScreen() {

            video_player.requestFullscreen();
    }

    function changeVolume() {
        video_player.volume = volume_slider.value / 100;
    }

    function muteVideo() {
        if (video_player.muted) {
            video_player.muted = false;
            mutebtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volume_slider.value = 100;
            video_player.volume = volume_slider.value/100;
        } else {
            video_player.muted = true;
            mutebtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volume_slider.value = 0;
            video_player.volume = volume_slider.value;
        }

    }

    function slideTimeUpdate() {
        var current_min = Math.floor(video_player.currentTime / 60);
        var current_sec = Math.floor(video_player.currentTime - current_min * 60);
        var duration_min = Math.floor(video_player.duration / 60);
        var duration_sec = Math.floor(video_player.duration - duration_min * 60);

        if (current_sec < 10) {
            current_sec = "0" + current_sec;
        }
        if (duration_sec < 10) {
            duration_sec = "0" + duration_sec;
        }
        if (current_min < 10) {
            current_min = "0" + current_min;
        }
        if (duration_min < 10) {
            duration_min = "0" + duration_min;
        }
        current_time.innerHTML = current_min + ":" + current_sec + " / ";
        duration_time.innerHTML = duration_min + ":" + duration_sec;
        if (mouse_pressed) {
            return;
        }
        else {
            slider.value = video_player.currentTime * (100 / video_player.duration);
        }

    }

    function videoTime() {
            video_player.currentTime = video_player.duration * (slider.value / 100);
    }

    function windowResize() {
        bar.style.width = video_player.offsetWidth + "px";
    }
    function MouseOnPlayer() {
        bar.classList.add("mouseOn");
        bar.classList.remove("mouseOut");
        bar.style.opacity = "0.5";
    }
    function MouseOutPlayer() {
        bar.classList.add("mouseOut");
        bar.classList.remove("mouseOn");
        bar.style.opacity = "0";
      
    }
    function playPause(btn, video) {
        if (video_player.paused) {
            btn.innerHTML = "<i class='fas fa-play'></i>";
            video_player.play();
            
        } else {
            btn.innerHTML = '<i class="fas fa-stop"></i>';
            video_player.pause();
        }

    }
}

//Key sequence detection (KONAMI CODE)

if (window.location.pathname == '/js12.html') {

    let pattern = ['s', 'd', 'f', 'g', 'z', 'x', 'c', 'v'];
    let count = 0;
    let pattern_length = pattern.length;
    window.addEventListener('keydown', (e) => {
        if (pattern[count] === e.key) {
            count++;
            if (pattern_length === count) {
                alert('KONAMI CODE');
            }
        } else {
            count = 0;
        }
    })

}

// Slide In on Scroll

if (window.location.pathname == '/js13.html') {

    const images = document.querySelectorAll('.slide-in');
    function showImages(e) {
        images.forEach((item) => {
            const height_to_images = (window.scrollY + window.innerHeight) - item.height / 2;
            if (item.offsetTop < height_to_images) {
                item.classList.add("active");
            } else  {
               item.classList.remove("active");
            }
        });
    }
    window.addEventListener('scroll', showImages);


}

// Object and Arrays - Reference VS copy
if (window.location.pathname == '/js14.html') {



}

//LocalStorage and Event Delegation
if (window.location.pathname == '/js15.html') {

    const addItems = document.querySelector('.add-items');
    const itemsList = document.querySelector('.plates');
    const loading = document.getElementById('loadingItem');
    let items = [];
    let storage_items = localStorage.getItem('itemName');
    let new_li = document.createElement('li');
 
    function refreshItemList(AddingNewItem, item_value) {

        if (storage_items && !AddingNewItem) {
            items = JSON.parse(storage_items);
            items.forEach((element) => {
                new_li.innerHTML = '<input type="checkbox"/>' +'<label>' +element+'</label>';
                itemsList.appendChild(new_li.cloneNode(true));
            })
            loading.remove();

        } else if (AddingNewItem) {
            new_li.innerHTML = item_value;
            itemsList.appendChild(new_li.cloneNode(true));
            loading.remove();
        }
        else {
            return;
        }
    }

    function addItem(e) {
        e.preventDefault();
        let new_item = addItems.elements['addedItem'].value;
        items.push(new_item)
        localStorage.setItem('itemName', JSON.stringify(items));
        this.reset();
        refreshItemList(true, new_item)
        
    }

    function checkingItem(e) {
        let clicked_element = e.target;
        if (clicked_element.matches('label')) {
            clicked_element.previousElementSibling.checked = !clicked_element.previousElementSibling.checked;
        } else if (clicked_element.matches('li')) {
            clicked_element.children[0].checked = !clicked_element.children[0].checked;
        } else {
            return;
        }
    }

    itemsList.addEventListener('click',checkingItem)
    addItems.addEventListener('submit', addItem);
    refreshItemList(false);

}

//CSS Text Shadow Mouse Move effect

if (window.location.pathname == '/js16.html') {

    const hero_div = document.querySelector('.hero');
    const woah = hero_div.querySelector('h1');
    let width = hero_div.offsetWidth;
    let height = hero_div.offsetHeight;
    const max_shadow = 500;
    function MovingShadow(event) {
        
        width = hero_div.offsetWidth;
        height = hero_div.offsetHeight;
        let x = event.clientX;
        let y = event.clientY - woah.clientHeight / 2;
        let shadowX = Math.round(((x / width) * max_shadow) - (max_shadow));
        let shadowY = Math.round(((y / height) * max_shadow) - (max_shadow));
        woah.style.textShadow = `
        ${shadowX}px ${shadowY}px 0 rgba(255,0,255,0.5),
        ${-shadowX}px ${shadowY}px 0 rgba(249, 0, 0,0.5),
        ${shadowY}px ${-shadowX}px 0 rgba(0, 0, 249,0.5),
        ${-shadowY}px ${shadowX}px 0 rgba(0, 249, 0,0.5)
            `;
    }
    
    hero_div.addEventListener('mousemove', MovingShadow);

}

//Sorting Band Names without articles
if (window.location.pathname == '/js17.html') {

    const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
    function checkArticles(band_name) {
        return band_name.replace(/the |an |a /gi, ' ').trim();
    }

    let sorted_bands = bands.sort((a, b) => {
        if (checkArticles(a) > checkArticles(b)) {
            return 1;
        } else {
            return -1;
        }
    });
    let list = document.querySelector('#list');
    let new_li = document.createElement('li');
    sorted_bands.forEach((element) => {
        new_li.innerHTML = element;
        list.appendChild(new_li.cloneNode(true));
    })

 
}

//Tally String Times with Reduce

if (window.location.pathname == '/js18.html') {
    const list = document.querySelectorAll('.videos li');
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    list.forEach((Element) => {
        let attribute = Element.getAttribute('data-time');
        let index = attribute.indexOf(':');
        if (index === 2 || index === 1) {
            minutes = minutes + parseInt(attribute.slice(0, index));
            seconds = seconds + parseInt(attribute.slice(index+1, attribute.length));
        }
    })
    seconds = seconds + minutes * 60;
    hours = Math.floor(seconds / 3600);
    minutes = Math.floor((seconds % 3600) / 60);
    seconds = (seconds % 3600) % 60;
    console.log(hours, minutes, seconds);
    
}

//Unreal Webcam Fun
if (window.location.pathname == '/js19.html') {
    const video = document.querySelector('.player');
    const canvas = document.querySelector('.photo');
    const ctx = canvas.getContext('2d');
    const strip = document.querySelector('.strip');
    const snap = document.querySelector('.snap');
    const mediaStream = new MediaStream();

    function getVideo() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(localMediaStream => {
                video.srcObject = localMediaStream;
                video.play();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getVideo();
    function convertToCanvas() {
        const width = video.videoWidth;
        const height = video.videoHeight;
        canvas.height = height;
        canvas.width = height;
        return setInterval(() => {
            ctx.drawImage(video, 0, 0, width, height);
            let pixels = ctx.getImageData(0, 0, width, height);
            pixels = greenScreen(pixels);
            ctx.putImageData(pixels,0,0)
        }, 5);
    };
    function takePhoto() {
        snap.currentTime = 0;
        snap.play();
        const data = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = data;
        link.setAttribute('download', 'photo');
        link.innerHTML = `<img src="${data}" alt="photos"/>`;
        strip.insertBefore(link, strip.firstChild);
    }
    function redEffect(pixels) {
        for (let i = 0; i < pixels.data.length; i += 4) {
            pixels.data[i] = pixels.data[i] +100;
            pixels.data[i + 1]=pixels.data[i+1]-50;
            pixels.data[i + 2]=pixels.data[i+2] *0,5;
        }
        return pixels;
    }
    function rgbSplit(pixels) {
        for (let i = 0; i < pixels.data.length; i += 4) {
            pixels.data[i-150] = pixels.data[i];
            pixels.data[i + 100] = pixels.data[i + 1] ;
            pixels.data[i -150] = pixels.data[i + 2] ;
        }
        return pixels;
    }
    function greenScreen(pixels) {
        const levels = {};

        document.querySelectorAll('.rgb input').forEach((input) => {
            levels[input.name] = input.value;
        });

        for (i = 0; i < pixels.data.length; i = i + 4) {
            red = pixels.data[i + 0];
            green = pixels.data[i + 1];
            blue = pixels.data[i + 2];
            alpha = pixels.data[i + 3];

            if (red >= levels.rmin
                && green >= levels.gmin
                && blue >= levels.bmin
                && red <= levels.rmax
                && green <= levels.gmax
                && blue <= levels.bmax) {
                // take it out!
                pixels.data[i + 3] = 0;
            }
        }

        return pixels;
    }
    video.addEventListener('canplay', convertToCanvas);

}

//Native Speech Recognition
if (window.location.pathname == '/js20.html') {
    if ("webkitSpeechRecognition" in window) {
        var i = 0;
        let p = document.createElement('p');
        let speechRecognition = new webkitSpeechRecognition();
        let printed_words = document.querySelector(".words")
        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
        speechRecognition.lang = "pl-PL";
        speechRecognition.onstart = () => {
            printed_words.appendChild(p);
        }
        speechRecognition.onresult = (e) => {
            let spoken_words = e.results.length;
            if (e.results[spoken_words - 1].isFinal) {
                for (i; i < spoken_words; i++) {
                    p = document.createElement('p');
                    printed_words.appendChild(p);
                    printed_words.lastChild.textContent += e.results[i][0].transcript;
                }
            }
        }
        speechRecognition.start();

    } else {
        alert("Speech Recognition Not Available")
    }
}
//Geolocation based Speedometer and Compass
if (window.location.pathname == '/js21.html') {
    window.addEventListener('load', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        function showPosition(position) {
            var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 10,
                center: { lat: position.coords.latitude, lng: position.coords.longitude }
            });

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                map: map
            });

        }
    })
  
    
}