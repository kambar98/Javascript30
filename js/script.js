window.onload = function() {
  //Basics variables
  var current_page = 0;
  var all_challenges = document.querySelectorAll(".challenges");
  var numberOfPages = all_challenges.length;
  var previous_page;
  var left_arrow = document.querySelector("#left-arrow-container");
  var right_arrow = document.querySelector("#right-arrow-container");
  var challenge_body = document.querySelector(".challenge-body");
  var load_spinner = document.querySelector(".lds-spinner");

  //Check if current page is saved in session
  if (sessionStorage.current_page != undefined) {
    current_page = parseInt(sessionStorage.current_page);
  }

  challenge_body.style.display = "none";
  load_spinner.style.display = "block";
  // function that adds pages to dropdown
  var j = 0;

  document.getElementById("dropdown-row").innerHTML +=
    "<div class='col-xs-4' id='colRow" + j + "'" + "></div>";
  for (var i = 1; i < numberOfPages; i++) {
    if (i % 10 === 0 && i < numberOfPages - 1) {
      document.getElementById("dropdown-row").innerHTML +=
        "<div class='col-xs-4' id='colRow" + i / 10 + "'" + "></div>";
      document.getElementById("colRow" + j).innerHTML +=
        "<a class='dropdown-item'id='CH" + i + "'>Challenge " + i + "</a >";
      j++;
    } else {
      document.getElementById("colRow" + j).innerHTML +=
        "<a class='dropdown-item'id='CH" + i + "'>Challenge " + i + "</a >";
    }
  }
  document.querySelectorAll(".dropdown-item").forEach(el => {
    el.addEventListener("click", chooseChallenge);
  });
  document.querySelectorAll(".main-arrows").forEach(el => {
    el.addEventListener("click", switchChallenge);
  });

  document.querySelector(".navbar-brand").addEventListener("click", () => {
    current_page = 0;
    showProperChallenge(current_page, true);
  });
  showProperChallenge(current_page, false);
  highlight("challengeCode");

  //Checks if html is loaded
  if (document.readyState) {
    challenge_body.style.display = "block";
    load_spinner.style.display = "none";
  }
  window.addEventListener("keydown", event => {
    //Pressed right arrow
    if (event.keyCode == 39) {
      switchChallenge(event);
    }
    //Pressed left arrow
    else if (event.keyCode == 37) {
      switchChallenge(event);
    }
  });

  //function which add color to special words of Javascript
  function highlight() {
    var logic_array = [
      "await",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "enum",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "function",
      "if",
      "implements",
      "import",
      "in",
      "instanceof",
      "interface",
      "let",
      "new",
      "null",
      "package",
      "private",
      "protected",
      "public",
      "return",
      "super",
      "switch",
      "static",
      "this",
      "throw",
      "try",
      "True",
      "typeof",
      "var",
      "void",
      "while",
      "with",
      "yield",
      "function",
      "if",
      "JSON",
      "window"
    ];
    $.getScript("js/script.js", function(event) {
      let challenge_code = document.querySelector("#challengeCode");
      if (current_page == 0) {
        document.querySelector("#challengeCode_container").style.display =
          "none";
      } else {
        let javascript_code = event;
        //Create pattern for regex
        let pattern = String.raw`(\(current_page == ${current_page}\)(\s)?(\{)[^]+(?=\}))`;
        let regex = new RegExp(pattern, "gm");
        let result = javascript_code.match(regex);
        let regex_match_index = result[0].indexOf("{");
        let sliced_result = result[0].slice(regex_match_index);
        let selected_challenge_code;
        //Get index of { } from string in array
        let right_bracket = Array.from(sliced_result.matchAll(/\}/g)).map(
          match => match.index
        );
        let left_bracket = Array.from(sliced_result.matchAll(/\{/g)).map(
          match => match.index
        );
        //Check when number of { is equal to }
        for (var i = 0; i < left_bracket.length; i++) {
          if (
            left_bracket[i + 1] > right_bracket[i] ||
            left_bracket[i + 1] == undefined
          ) {
            selected_challenge_code = sliced_result.substring(
              1,
              right_bracket[i]
            );
            break;
          }
        }
        if (selected_challenge_code) {
          //Adding jsWord class to special words and </br> tag for new line
          let array_challenge_code = selected_challenge_code
            .split(" ")
            .filter(a => a);
          let map_challenge = array_challenge_code.map(item => {
            if (logic_array.includes(item)) {
              item = '<span class="jsWord">' + item + "</span>";
            }
            if (item.indexOf("\r\n") != -1) {
              item = item + "</br>";
              return item;
            } else {
              return item;
            }
          });
          challenge_code.innerHTML = map_challenge.join(" ");
        }
      }
    });
  }
  highlight();
  //Change challenge by key arrows or pressing arrows on page
  function switchChallenge(event) {
    if (
      event.target.id == "right-arrow" ||
      event.target.childNodes[0].id == "right-arrow" ||
      event.keyCode == 39
    ) {
      current_page += 1;
    } else {
      current_page -= 1;
    }
    if (current_page < 0) {
      current_page = 0;
    } else if (current_page > numberOfPages) {
      current_page = numberOfPages;
    } else {
      showProperChallenge(parseInt(current_page), true);
    }
  }

  //Change challenge to selected by navbar
  function chooseChallenge(event) {
    let pattern = /\d+/i;
    current_page = event.target.id.match(pattern);
    showProperChallenge(current_page, true);
  }

  //Changing displayed challenge based on current page
  function showProperChallenge(id, reload) {
    if (reload) {
      location.reload();
    } else {
      if (previous_page != undefined) {
        all_challenges[previous_page].style.display = "none";
      }
      all_challenges[id].style.display = "block";
      previous_page = id;
      if (current_page == 0) {
        left_arrow.style.visibility = "hidden";
        right_arrow.style.visibility = "visible";
      } else if (current_page == numberOfPages - 1) {
        right_arrow.style.visibility = "hidden";
        left_arrow.style.visibility = "visible";
      } else {
        left_arrow.style.visibility = "visible";
        right_arrow.style.visibility = "visible";
      }
    }
    sessionStorage.setItem("current_page", current_page);
  }

  //drum sound functions, challegne 1
  if (current_page == 1) {
    var clapSound = document.getElementById("clap");
    var hihatSound = document.getElementById("hihat");
    var kickSound = document.getElementById("kick");
    var openhatSound = document.getElementById("openhat");
    var boomSound = document.getElementById("boom");
    var A_drum = document.querySelector("#A");
    var S_drum = document.querySelector("#S");
    var D_drum = document.querySelector("#D");
    var F_drum = document.querySelector("#F");
    var G_drum = document.querySelector("#G");
    function pressedA() {
      clapSound.currentTime = 0;
      clapSound.play();
      A_drum.style.background = "#595959";
      setTimeout(() => {
        A_drum.style.background = "#262626";
      }, 100);
    }
    function pressedS() {
      hihatSound.currentTime = 0;
      hihatSound.play();
      S_drum.style.background = "#595959";
      setTimeout(() => {
        S_drum.style.background = "#262626";
      }, 100);
    }
    function pressedD() {
      kickSound.currentTime = 0;
      kickSound.play();
      D_drum.style.background = "#595959";
      setTimeout(() => {
        D_drum.style.background = "#262626";
      }, 100);
    }
    function pressedF() {
      openhatSound.currentTime = 0;
      openhatSound.play();
      F_drum.style.background = "#595959";
      setTimeout(() => {
        F_drum.style.background = "#262626";
      }, 100);
    }
    function pressedG() {
      boomSound.currentTime = 0;
      boomSound.play();
      G_drum.style.background = "#595959";
      setTimeout(() => {
        G_drum.style.background = "#262626";
      }, 100);
    }

    window.addEventListener("keypress", drumFunction);
    A_drum.addEventListener("click", pressedA);
    S_drum.addEventListener("click", pressedS);
    D_drum.addEventListener("click", pressedD);
    F_drum.addEventListener("click", pressedF);
    G_drum.addEventListener("click", pressedG);
    function drumFunction(evt) {
      if (evt.keyCode === 97) {
        pressedA();
      } else if (evt.keyCode === 115) {
        pressedS();
      } else if (evt.keyCode === 100) {
        pressedD();
      } else if (evt.keyCode === 102) {
        pressedF();
      } else if (evt.keyCode === 103) {
        pressedG();
      } else return;
    }
  }

  //Clock, challenge 2
  if (current_page == 2) {
    setInterval(setClock, 1000);
    const hourHand = document.getElementById("hour");
    const minuteHand = document.getElementById("minute");
    const secondHand = document.getElementById("second");
    function setClock() {
      const currentDate = new Date();
      const currentSecond = currentDate.getSeconds();
      const currentMinutes = currentSecond / 60 + currentDate.getMinutes();
      const currentHour = currentMinutes / 60 + currentDate.getHours();
      secondHand.style.transform = "rotate(calc(" + currentSecond + "* 6deg))";
      minuteHand.style.transform = "rotate(calc(" + currentMinutes + "* 6deg))";
      hourHand.style.transform = "rotate(calc(" + currentHour + "* 30deg))";
    }
    setClock();
  }

  // Update CSS variables, challenge 3
  if (current_page == 3) {
    const blur = document.getElementById("blur");
    const spacing = document.getElementById("spacing");
    const backgroundColor = document.getElementById("backgroundColor");
    const img = document.getElementById("challenge3Img");
    function changeProperty() {
      img.style =
        "border:" +
        spacing.value +
        "px solid " +
        backgroundColor.value +
        ";filter: blur(" +
        blur.value / 10 +
        "px);";
    }
    changeProperty();
    blur.addEventListener("change", changeProperty);
    spacing.addEventListener("change", changeProperty);
    backgroundColor.addEventListener("change", changeProperty);
  }

  // Workin with arrays, challenge 4
  if (current_page == 4) {
    const inventors = [
      { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
      { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
      { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
      { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
      { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
      { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
      { first: "Max", last: "Planck", year: 1858, passed: 1947 },
      { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
      { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
      { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
      { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
      { first: "Hanna", last: "Hammarstr�m", year: 1829, passed: 1999 }
    ];

    const people = [
      "Bernhard, Sandra",
      "Bethea, Erin",
      "Becker, Carl",
      "Bentsen, Lloyd",
      "Beckett, Samuel",
      "Blake, William",
      "Berger, Ric",
      "Beddoes, Mick",
      "Beethoven, Ludwig",
      "Belloc, Hilaire",
      "Begin, Menachem",
      "Bellow, Saul",
      "Benchley, Robert",
      "Blair, Robert",
      "Benenson, Peter",
      "Benjamin, Walter",
      "Berlin, Irving",
      "Benn, Tony",
      "Benson, Leana",
      "Bent, Silas",
      "Berle, Milton",
      "Berry, Halle",
      "Biko, Steve",
      "Beck, Glenn",
      "Bergman, Ingmar",
      "Black, Elk",
      "Berio, Luciano",
      "Berne, Eric",
      "Berra, Yogi",
      "Berry, Wendell",
      "Bevan, Aneurin",
      "Ben-Gurion, David",
      "Bevel, Ken",
      "Biden, Joseph",
      "Bennington, Chester",
      "Bierce, Ambrose",
      "Billings, Josh",
      "Birrell, Augustine",
      "Blair, Tony",
      "Beecher, Henry",
      "Biondo, Frank"
    ];

    const data = [
      "car",
      "car",
      "truck",
      "truck",
      "bike",
      "walk",
      "car",
      "van",
      "bike",
      "walk",
      "car",
      "van",
      "car",
      "truck"
    ];

    // 1. Filter the list of inventors for those who where born in the 1500's

    function checkYear(obj, number_1, number_2) {
      const filtered_obj = obj.filter(item => {
        if (item.year >= number_1 && item.year < number_2) {
          return true;
        }
      });
      return filtered_obj;
    }

    // 2. Give us an array of the inventor first and last names

    const full_name = [];
    inventors.forEach(item => {
      full_name.push(item.first + " " + item.last);
    });

    // 3. Sort the inventors by birthdate, oldest to youngest

    const sorted = inventors.sort(
      (first_item, second_item) => (first_item.year > second_item.year ? 1 : -1)
    );

    // 4. How many years did all inventors live?

    var all_years = 0;
    inventors.forEach(item => {
      all_years = all_years + (item.passed - item.year);
    });

    // 5. Sort the inventors by years lived

    const oldest_inventor = inventors.sort((first_item, second_item) => {
      return first_item.passed - first_item.year >
        second_item.passed - second_item.year
        ? -1
        : 1;
    });

    // 6. Create a list of Boulevards in Paris that contain 'de' anywhere in the name
    //const category = document.querySelector('.mw-category');
    //  const items = Array.from(category.querySelectorAll('a'));
    //  items.map(link => items.textContent).filter(street => street.includes('de'));

    // 7. Sort the people alphabetically by last name
    const sorted_last_name = people.sort((first_item, second_item) => {
      return first_item.split(", ")[1] > second_item.split(", ")[1] ? 1 : -1;
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
  if (current_page == 5) {
    const img_array = document.querySelectorAll(".img_challenge5");
    function clicked_img() {
      event.target.style.minWidth = "60%";
      event.target.style.maxWidth = null;
      for (var i = 0; i < img_array.length; i++) {
        if (event.target.className != img_array[i].className) {
          img_array[i].style.maxWidth = "10%";
          img_array[i].style.minWidth = null;
        }
      }
    }
    for (var i = 0; i < img_array.length; i++) {
      img_array[i].addEventListener("click", clicked_img);
    }
  }

  //City population
  if (current_page == 6) {
    const endpoint =
      "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
    const cities = [];
    var req = new XMLHttpRequest();
    req.open("GET", endpoint, true);
    req.send();
    req.onload = function() {
      if (this.status == 200) {
        JSON.parse(this.responseText).forEach(city => cities.push(city));
      } else {
        console.log(this.status);
      }
    };
    const challenge_6_search = document.getElementById("challenge_6_input");
    const show_more_button = document.getElementById("show_more");
    challenge_6_search.addEventListener("keyup", search);

    function search() {
      document.getElementById("City_research").innerHTML = "";
      show_more_button.style.display = "none";
      cities.forEach(element => {
        if (element.city.includes(challenge_6_search.value)) {
          if (document.getElementById("City_research").childElementCount < 10) {
            document.getElementById(
              "City_research"
            ).innerHTML += `<li> <a href="#">
                                                                            City: ${
                                                                              element.city
                                                                            }
                                                                            </br>
                                                                            Population: ${
                                                                              element.population
                                                                            }
                                                                            </a ></li > `;
          } else {
            document.getElementById(
              "City_research"
            ).innerHTML += `<li style="display:none" class="hidden_cities"><a href="#">
                                                                            City: ${
                                                                              element.city
                                                                            }
                                                                            </br>
                                                                            Population: ${
                                                                              element.population
                                                                            }
                                                                            </a></li>`;
            show_more_button.style.display = "block";
            show_more_button.addEventListener("click", displayAllCities);
          }
        }
      });
    }

    function displayAllCities() {
      document
        .querySelectorAll(".hidden_cities")
        .forEach(el => (el.style.display = "block"));
      show_more_button.style.display = "none";
    }
  }

  // Array cardio day 2
  if (current_page == 7) {
    const current_year = new Date().getFullYear();
    const people = [
      { name: "Wes", year: 1988 },
      { name: "Kait", year: 1986 },
      { name: "Irv", year: 1970 },
      { name: "Lux", year: 2015 }
    ];
    const comments = [
      { text: "Love this!", id: 523423 },
      { text: "Super good", id: 823423 },
      { text: "You are the best", id: 2039842 },
      { text: "Ramen is my fav food ever", id: 123523 },
      { text: "Nice Nice Nice!", id: 542328 }
    ];

    // is at least one person 19 or older?;
    people.some(user_year => {
      if (19 <= current_year - user_year.year) return true;
      else return false;
    });

    // is everyone 19 or older ?;
    people.every(user_year => {
      return 19 <= current_year - user_year.year;
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
  if (current_page == 8) {
    const canvas = document.querySelector("#canvas_draw");
    const cvs = canvas.getContext("2d");
    canvas.width = document.querySelector("#challenge_8").offsetWidth - 20;
    window.addEventListener("resize", () => {
      canvas.width = document.querySelector("#challenge_8").offsetWidth - 20;
    });
    let starting_x = 0;
    let starting_y = 0;
    let mouse_pressed = false;
    let color = "#FF0000";
    let line_width = 10;
    cvs.lineCap = "round";
    cvs.lineJoin = "round";
    cvs.lineWidth = line_width;
    cvs.strokeStyle = color;

    canvas.addEventListener("mousedown", e => {
      mouse_pressed = true;
      starting_x = e.offsetX;
      starting_y = e.offsetY;
    });
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", () => {
      mouse_pressed = false;
    });
    canvas.addEventListener("mouseout", () => {
      mouse_pressed = false;
    });
    canvas.addEventListener("wheel", e => {
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
      } else return;
    }
  }

  //14 Must know dev tools tricks
  if (current_page == 9) {
  }

  // Hold Shift to Check Multiple Checkboxes
  if (current_page == 10) {
    const elements = document.querySelectorAll(".inbox input");
    let last_check;
    let between = false;
    elements.forEach(el => el.addEventListener("click", clickedCheckBox));
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
        });
      }
      last_check = this;
    }
  }

  // Custom HTML5 Video Player
  if (current_page == 11) {
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
    var play_button = document.querySelector("#playPausebtn");

    window.addEventListener("resize", windowResize);
    play_button.addEventListener("click", playPause);
    player.addEventListener("mouseenter", MouseOnPlayer);
    player.addEventListener("mouseleave", MouseOutPlayer);
    slider.addEventListener("change", videoTime);
    video_player.addEventListener("timeupdate", slideTimeUpdate);
    mutebtn.addEventListener("click", muteVideo);
    volume_slider.addEventListener("change", changeVolume);
    fullscreen.addEventListener("click", toggleFullScreen);

    slider.onmousedown = function() {
      mouse_pressed = true;
    };
    slider.onmouseup = function() {
      mouse_pressed = false;
    };

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
        video_player.volume = volume_slider.value / 100;
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
      } else {
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
    function playPause() {
      if (video_player.paused) {
        this.innerHTML = "<i class='fas fa-play'></i>";
        video_player.play();
      } else {
        this.innerHTML = '<i class="fas fa-stop"></i>';
        video_player.pause();
      }
    }

    bar.style.width = video_player.offsetWidth + "px";
    slideTimeUpdate();
  }

  //Key sequence detection (KONAMI CODE)
  if (current_page == 12) {
    let pattern = ["s", "d", "f", "g", "z", "x", "c", "v"];
    let count = 0;
    let pattern_length = pattern.length;
    window.addEventListener("keydown", e => {
      if (pattern[count] === e.key) {
        count++;
        if (pattern_length === count) {
          alert("KONAMI CODE");
        }
      } else {
        count = 0;
      }
    });
  }

  // Slide In on Scroll
  if (current_page == 13) {
    const images = document.querySelectorAll(".slide-in");
    function showImages(e) {
      images.forEach(item => {
        const height_to_images =
          window.scrollY + window.innerHeight - item.height / 2;
        if (item.offsetTop < height_to_images) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
    window.addEventListener("scroll", showImages);
  }

  // Object and Arrays - Reference VS copy
  if (current_page == 14) {
  }

  //LocalStorage and Event Delegation
  if (current_page == 15) {
    const addItems = document.querySelector(".add-items");
    const itemsList = document.querySelector(".plates");
    const loading = document.querySelector("#loadingItem");
    let items = [];
    let storage_items = localStorage.getItem("itemName");
    let new_li = document.createElement("li");
    let clicked_once = true;
    new_li.classList.add("li_local");
    function refreshItemList(AddingNewItem, item_value) {
      if (storage_items && !AddingNewItem) {
        items = JSON.parse(storage_items);
        if (document.querySelectorAll(".li_local").length == items.length) {
          return;
        } else {
          items.forEach(element => {
            new_li.innerHTML =
              '<input type="checkbox"/>' + "<label>" + element + "</label>";
            itemsList.appendChild(new_li.cloneNode(true));
          });
          loading.style.display = "none";
        }
      } else if (AddingNewItem) {
        new_li.innerHTML =
          '<input type="checkbox"/>' + "<label>" + item_value + "</label>";
        itemsList.appendChild(new_li.cloneNode(true));
        loading.style.display = "none";
      } else {
        return;
      }
    }

    function addItem(e) {
      e.preventDefault();
      let new_item = addItems.elements["addedItem"].value;
      if (new_item.length == 0) {
        return;
      } else {
        items.push(new_item);
        localStorage.setItem("itemName", JSON.stringify(items));
        this.reset();
        refreshItemList(true, new_item);
      }
    }

    addItems.addEventListener("submit", addItem);
    refreshItemList(false);
  }

  //CSS Text Shadow Mouse Move effect
  if (current_page == 16) {
    const hero_div = document.querySelector(".hero");
    const woah = hero_div.querySelector("h1");
    let width = hero_div.offsetWidth;
    let height = hero_div.offsetHeight;
    const max_shadow = 500;
    function MovingShadow(event) {
      width = hero_div.offsetWidth;
      height = hero_div.offsetHeight;
      let x = event.clientX;
      let y = event.clientY - woah.clientHeight / 2;
      let shadowX = Math.round(x / width * max_shadow - max_shadow);
      let shadowY = Math.round(y / height * max_shadow - max_shadow);
      woah.style.textShadow = `
        ${shadowX}px ${shadowY}px 0 rgba(255,0,255,0.5),
        ${-shadowX}px ${shadowY}px 0 rgba(249, 0, 0,0.5),
        ${shadowY}px ${-shadowX}px 0 rgba(0, 0, 249,0.5),
        ${-shadowY}px ${shadowX}px 0 rgba(0, 249, 0,0.5)
            `;
    }

    hero_div.addEventListener("mousemove", MovingShadow);
  }

  //Sorting Band Names without articles
  if (current_page == 17) {
    const bands = [
      "The Plot in You",
      "The Devil Wears Prada",
      "Pierce the Veil",
      "Norma Jean",
      "The Bled",
      "Say Anything",
      "The Midway State",
      "We Came as Romans",
      "Counterparts",
      "Oh, Sleeper",
      "A Skylit Drive",
      "Anywhere But Here",
      "An Old Dog"
    ];
    function checkArticles(band_name) {
      return band_name.replace(/the |an |a /gi, " ").trim();
    }

    let sorted_bands = bands.sort((a, b) => {
      if (checkArticles(a) > checkArticles(b)) {
        return 1;
      } else {
        return -1;
      }
    });
    let list = document.querySelector("#list");
    let new_li = document.createElement("li");
    sorted_bands.forEach(element => {
      new_li.innerHTML = element;
      list.appendChild(new_li.cloneNode(true));
    });
  }

  //Tally String Times with Reduce
  if (current_page == 18) {
    const list = document.querySelectorAll(".videos li");
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    list.forEach(Element => {
      let attribute = Element.getAttribute("data-time");
      let index = attribute.indexOf(":");
      if (index === 2 || index === 1) {
        minutes = minutes + parseInt(attribute.slice(0, index));
        seconds =
          seconds + parseInt(attribute.slice(index + 1, attribute.length));
      }
    });
    seconds = seconds + minutes * 60;
    hours = Math.floor(seconds / 3600);
    minutes = Math.floor((seconds % 3600) / 60);
    seconds = (seconds % 3600) % 60;
    console.log(hours, minutes, seconds);
  }

  //Unreal Webcam Fun
  if (current_page == 19) {
    const video = document.querySelector(".player_challenge_19");
    const canvas = document.querySelector(".photo");
    const ctx = canvas.getContext("2d");
    const strip = document.querySelector(".strip");
    const snap = document.querySelector(".snap");
    const mediaStream = new MediaStream();
    const photo_btn = document.querySelector("#take_photo_btn");

    function getVideo() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
          video.srcObject = localMediaStream;
          video.play();
        })
        .catch(err => {
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
        ctx.putImageData(pixels, 0, 0);
      }, 5);
    }
    function takePhoto() {
      snap.currentTime = 0;
      snap.play();
      const data = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = data;
      link.setAttribute("download", "photo");
      link.innerHTML = `<img src="${data}" alt="photos"/>`;
      strip.insertBefore(link, strip.firstChild);
    }
    function redEffect(pixels) {
      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 100;
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        (pixels.data[i + 2] = pixels.data[i + 2] * 0), 5;
      }
      return pixels;
    }
    function rgbSplit(pixels) {
      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i];
        pixels.data[i + 100] = pixels.data[i + 1];
        pixels.data[i - 150] = pixels.data[i + 2];
      }
      return pixels;
    }
    function greenScreen(pixels) {
      const levels = {};

      document.querySelectorAll(".rgb input").forEach(input => {
        levels[input.name] = input.value;
      });

      for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (
          red >= levels.rmin &&
          green >= levels.gmin &&
          blue >= levels.bmin &&
          red <= levels.rmax &&
          green <= levels.gmax &&
          blue <= levels.bmax
        ) {
          // take it out!
          pixels.data[i + 3] = 0;
        }
      }

      return pixels;
    }
    video.addEventListener("canplay", convertToCanvas);
    photo_btn.addEventListener("click", takePhoto);
  }

  //Native Speech Recognition
  if (current_page == 20) {
    if ("webkitSpeechRecognition" in window) {
      var i = 0;
      let p = document.createElement("p");
      let speechRecognition = new webkitSpeechRecognition();
      let printed_words = document.querySelector(".words");
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = "pl-PL";
      speechRecognition.onstart = () => {
        printed_words.appendChild(p);
      };
      speechRecognition.onresult = e => {
        let spoken_words = e.results.length;
        if (e.results[spoken_words - 1].isFinal) {
          for (i; i < spoken_words; i++) {
            p = document.createElement("p");
            printed_words.appendChild(p);
            printed_words.lastChild.textContent += e.results[i][0].transcript;
          }
        }
      };
      speechRecognition.start();
    } else {
      alert("Speech Recognition Not Available");
    }
  }
  //Geolocation based Speedometer and Compass
  if (current_page == 21) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        ),
        map: map
      });
    }
  }
  // Follow Along Links
  if (current_page == 22) {
    const href_elements = document.querySelectorAll('a[href=""]');
    const hightlight_span = document.createElement("span");
    hightlight_span.classList.add("highlight");
    document.body.appendChild(hightlight_span);
    href_elements.forEach(el => {
      el.addEventListener("mouseenter", hightlight);
    });
    function hightlight() {
      let position = this.getBoundingClientRect();
      hightlight_span.style.width = position.width + "px";
      hightlight_span.style.height = position.height + "px";
      hightlight_span.style.left = position.left + window.scrollX + "px";
      hightlight_span.style.top = position.top + window.scrollY + "px";
    }
  }

  //Speech Synthesis
  if (current_page == 23) {
    window.speechSynthesis.onvoiceschanged = function() {
      let voices_list = document.querySelector("#voices");
      let synth = window.speechSynthesis;
      let voices = synth.getVoices();
      let option = document.createElement("option");
      document.querySelector("#stop").addEventListener("click", stopLector);
      document.querySelector("#speak").addEventListener("click", startLector);

      for (var i = 0; i < voices.length; i++) {
        option = document.createElement("option");
        option.innerText = voices[i].name;
        option.value = i;
        voices_list.appendChild(option);
      }

      function stopLector() {
        synth.cancel();
      }

      function startLector() {
        let synth_text = document.querySelector('[name="text"]');
        let rate = document.querySelector('[name="rate"]');
        let pitch = document.querySelector('[name="pitch"]');
        let value = voices_list.options[voices_list.selectedIndex].value;
        let utterance = new SpeechSynthesisUtterance(synth_text.value);
        utterance.voice = voices[value];
        utterance.pitch = pitch.value;
        utterance.rate = rate.value;
        synth.speak(utterance);
      }
    };
  }
  /*Sticky Nav*/
  if (current_page == 24) {
    const nav = document.querySelector("#main");
    const main_nav = document.querySelector(".navbar");
    const offsetNav = nav.offsetTop;
    const logo = document.querySelector(".logo");
    function moveNav() {
      if (window.scrollY + main_nav.offsetHeight > offsetNav) {
        nav.style.top = window.scrollY - offsetNav + "px";
        logo.style.maxWidth = "300px";
      } else {
        logo.style.maxWidth = "0px";
      }
    }
    window.addEventListener("scroll", moveNav);
  }

  if (current_page == 25) {
  }
  /*Stripe Follow Along Dropdown Navigation*/
  if (current_page == 26) {
    const nav_li = document.querySelectorAll(".cool > li");
    const background = document.querySelector(".dropdownBackground");
    const nav = document.querySelector(".top");
    nav_li.forEach(el => {
      el.addEventListener("mouseenter", enterMouse);
      el.addEventListener("mouseleave", leaveMouse);
    });

    function leaveMouse() {
      this.classList.remove("trigger-enter", "trigger-enter-active");
      background.classList.remove("open");
    }

    function enterMouse() {
      this.classList.add("trigger-enter");
      background.classList.add("open");
      setTimeout(() => {
        if (this.classList.contains("trigger-enter")) {
          this.classList.add("trigger-enter-active");
        }
      }, 150);

      const dropdown = this.querySelector(".dropdown");
      background.style.width = dropdown.offsetWidth + "px";
      background.style.height = dropdown.offsetHeight + "px";
      background.style.top =
        dropdown.getBoundingClientRect().top -
        nav.getBoundingClientRect().top +
        "px";
      background.style.left =
        dropdown.getBoundingClientRect().left -
        nav.getBoundingClientRect().left +
        "px";
    }
  }

  /*Click and Drag to Scroll*/
  if (current_page == 27) {
    const slider = document.querySelector(".items");
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", event => {
      isDown = true;
      slider.classList.add("active");
      startX = event.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", event => {
      if (!isDown) return;
      event.preventDefault();
      let x = event.pageX - slider.offsetLeft;
      slider.scrollLeft = scrollLeft - (x - startX);
    });
  }

  /*Video Speed Controller UI*/
  if (current_page == 28) {
    const speed_controller = document.querySelector(".speed");
    const speed_bar = document.querySelector(".speed-bar");
    const video = document.querySelector(".flex");
    let isDown = false;
    speed_controller.addEventListener("mousedown", () => {
      isDown = true;
    });
    speed_controller.addEventListener("mouseup", () => {
      isDown = false;
    });
    speed_controller.addEventListener("mouseleave", () => {
      isDown = false;
    });
    speed_controller.addEventListener("mousemove", function(event) {
      if (!isDown) return;
      event.preventDefault();
      let y = event.pageY - this.offsetTop;
      let multiplier = parseFloat(
        y / speed_controller.offsetHeight * 4
      ).toFixed(2);
      speed_bar.innerText = multiplier + "x";
      speed_bar.style.height = multiplier / 4 * 100 + "%";
      video.playbackRate = multiplier;
    });
  }
  /*Countdown Clock*/
  if (current_page == 29) {
    const buttons = document.querySelectorAll(".timer__button");
    const remaining_time = document.querySelector(".display__time-left");
    const input_time = document.querySelector("#custom");
    const end_time = document.querySelector(".display__end-time");
    var chosen_timer;
    var started = false;

    input_time.addEventListener("submit", startTimer);
    buttons.forEach(el => {
      el.addEventListener("click", startTimer);
    });

    function startTimer(event) {
      event.preventDefault();
      let current_time = new Date().getTime();
      if (this.getAttribute("name") == "customForm") {
        chosen_timer = this.children[0].value * 60 * 1000;
      } else {
        chosen_timer = this.getAttribute("data-time") * 1000;
      }
      let future_time = new Date(current_time + chosen_timer);

      if (future_time.getMinutes() < 10) {
        end_time.innerText =
          "Be back at " +
          future_time.getHours() +
          ":0" +
          future_time.getMinutes();
      } else {
        end_time.innerText =
          "Be back at " +
          future_time.getHours() +
          ":" +
          future_time.getMinutes();
      }
      if (!started) {
        count = setInterval(Timer, 1000);
        started = true;
      } else {
        clearInterval(count);
        count = setInterval(Timer, 1000);
      }
    }
    function Timer() {
      chosen_timer = chosen_timer - 1000;
      let minutes = new Date(chosen_timer).getMinutes();
      let seconds = new Date(chosen_timer).getSeconds();
      if (minutes < 10) {
        remaining_time.innerText = "0" + minutes + ":" + seconds;
        if (seconds < 10) {
          remaining_time.innerText = "0" + minutes + ":0" + seconds;
        } else {
          remaining_time.innerText = "0" + minutes + ":" + seconds;
        }
      } else {
        remaining_time.innerText = minutes + ":" + seconds;
        if (seconds < 10) {
          remaining_time.innerText = minutes + ":0" + seconds;
        } else {
          remaining_time.innerText = minutes + ":" + seconds;
        }
      }
    }
  }
  /*Whack A Mole Game*/
  if (current_page == 30) {
    const holes = document.querySelectorAll(".hole");
    const score = document.querySelector(".score");
    const moles = document.querySelectorAll(".mole");
    const startBtn = document.querySelector("#startGame");
    let last_hole;
    let timeEnd;
    let mole_score = 0;
    let previous_mole;

    startBtn.addEventListener("click", playGame);
    moles.forEach(el => el.addEventListener("click", clickedMole));
    function randomTime(min, max) {
      return Math.round(Math.random() * (max - min));
    }
    function randomHole() {
      const id = Math.floor(Math.random() * holes.length);
      const hole = holes[id];
      if (last_hole == hole) {
        return randomHole();
      } else {
        last_hole = hole;
      }
      return hole;
    }
    function moleJump() {
      const time = randomTime(300, 1000);
      const hole = randomHole();
      hole.classList.add("up");
      setTimeout(() => {
        hole.classList.remove("up");
        if (!timeEnd) {
          moleJump();
        }
      }, time);
    }
    function playGame() {
      score.innerText = 0;
      if (!timeEnd) {
        moleJump();
        timeout = window.setTimeout(() => {
          timeEnd = true;
          mole_score = 0;
        }, 10000);
      } else {
        timeEnd = false;
        window.clearTimeout(timeout);
        playGame();
        mole_score = 0;
      }
    }
    function clickedMole() {
      if (previous_mole == this) {
        return;
      } else {
        previous_mole = this;
        mole_score++;
        score.innerText = mole_score;
      }
    }
  }
};
