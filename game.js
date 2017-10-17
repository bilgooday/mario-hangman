let theWord;
let guess = [];
let placeholder = [];
let winCounter = 0;
let counter = 8;
let usedGuesses = [];
let canvas = $("#stickman")[0];
let ctx = canvas.getContext("2d");
let pic = new Array();


pic[0] = new Image();
pic[0].src = pic.src = "images/mario_1.png";
pic[1] = new Image();
pic[1].src = "images/mario_2.png";
pic[2] = new Image();
pic[2].src = "images/mario_3.png";
pic[3] = new Image();
pic[3].src = "images/mario_4.png";
pic[4] = new Image();
pic[4].src = "images/mario_5.png";
pic[5] = new Image();
pic[5].src = "images/mario_6.png";
pic[6] = new Image();
pic[6].src = "images/mario_7.png";
pic[7] = new Image();
pic[7].src = "images/mario_8.png";


$("#enter").click(displayWord)
$("#start-button").click(switchPage);
$("#instructions").click(instructions);

window.onload = function() {
  $("#game-page").hide();
  createButtons();
  $("#ready").hide();
}

function instructions() {
  alert("Player 1 chooses a word and Player 2 must select a letter from the alphabet by clicking on a letter box. To win, guess the right letters before Mario dissapears!");
}

function musicToggle() {
  let myAudio = $("audio");
  return myAudio.pause();
}

function fill_canvas(pic) {
  let canvas = $("#stickman")[0];
  let ctx = canvas.getContext("2d");
  var wRatio = canvas.width / pic.width;
  let hRatio = canvas.height / pic.height;
  let ratio  = Math.min ( hRatio, wRatio );
  canvas.width = canvas.width;
  ctx.drawImage(pic, 0, 0, pic.width, pic.height, 0, 0, pic.width*ratio, pic.height*ratio);
}

function switchPage() {
  if (theWord === undefined) {
    alert("Not so fast! You need to enter a word before starting.")
  }
  else {
  $("#game-page").show();
  $("#start-page").hide();
  }
}

function createButtons() {
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'];
      $("#keypad").append("<ul id='alphabet'></ul>");
    for (i = 0; i < alphabet.length; i++) {
      $("#keypad ul").append(`<li id="letter${i}">` + alphabet[i] + "</li>");
    }
    $("ul li").click(verifyGuess);
  }

function displayWord () {
  theWord = $("#the-bird").val().split("");
  for (i = 0; i < theWord.length; i++) {
    placeholder.push("__ ")
    $("#placeholder").append(`<span id=letter${i}> __ </span>`);
  }
  $("#the-bird").hide();
  $("#ready").show();
  $("#enter").hide();
}

function verifyGuess() {
  let guess = this.innerHTML;
  let indexMatch = theWord.indexOf(guess)
  this.className = "active";
    for (i = 0; i < theWord.length; i++) {
      if (theWord[i] === guess)  {
        $("#placeholder span").eq(i).text(guess)
        winCounter++;
       }
    }
      if (indexMatch == -1)  {
       counter--;
    $("#wrong-guess").append("<li id='wrong-letter'>" + guess + "</li>")
    usedGuesses.push(guess);
    animateMario();
       }

      if (winCounter === theWord.length) {
        alert("Congrats! You've won!")
        setTimeout(location.reload.bind(location), 1500);
        //make gold coin and sound effect pop up
      }

      if (counter === 0) {
        fill_canvas(pic[7]);
        alert("You lost! Better luck next time.");
        setTimeout(location.reload.bind(location), 1500);
      }
}

function animateMario() {
  let Lives = counter;
  for (i = 0; i < Lives; i++) {
    if (Lives === 7) {
      fill_canvas(pic[0]);
    }
    else if (Lives === 6) {
      fill_canvas(pic[1]);
    }
    else if (Lives === 5) {
      fill_canvas(pic[2]);
    }
    else if (Lives === 4) {
      fill_canvas(pic[3]);
    }
    else if (Lives === 3) {
      fill_canvas(pic[4]);
    }
    else if (Lives === 2) {
      fill_canvas(pic[5]);
    }
    else if (Lives === 1) {
      fill_canvas(pic[6]);
    }
  }
}
