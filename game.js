const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keydown(function() {
  if(!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
});

function nextSequence() {
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