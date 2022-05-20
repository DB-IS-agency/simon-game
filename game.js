const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keydown(function() {
  if(!started) {
    $("#level-title").text(`Level ${level}`);

    // delay the first color when game starts
    setTimeout(function() {
      nextSequence();
    }, 1500);

    started = true;
  }
});

$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  // reset the userClickedPattern for the next level
  userClickedPattern = [];

  level++;
  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // jQuery to select button with same id as randomChosenColor
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100); // animate a flash to the button
  playSound(randomChosenColor);
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`)
    audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");

  // remove pressed class after 1 second
  setTimeout(function() {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // call the next color in pattern after a short delay
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)

    $("h1").text("Game Over!, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}