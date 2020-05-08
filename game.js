var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$("body").keypress(function() {

  if (!started) {
    started = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

function nextSequence() {

  userClickedPattern = [];

  level++;
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  animatePress(randomChosenColour);

  $("h1").text("Level " + level);

}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {

  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass('game-over');
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();

  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
