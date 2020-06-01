let buttonColors = ["red", "blue", "green", "yellow", "fuchsia", "lime", "aqua", "purple"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

let categoryLevel = 5;

$("body").keypress(function () {

  if (!started) {
    started = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

function nextSequence() {

  userClickedPattern = [];

  level++;
  if (level !== 1 && (level - 1) % categoryLevel === 0 && (level - 1) % categoryLevel < 5) {
    $("#" + buttonColors[3 + (level - 1) / categoryLevel]).removeClass("hide");
    $("h1").text("Congratulations, Level " + level);
    $("body").addClass("success");

    setTimeout(function () {
      $("body").removeClass('success');
    }, 200);
  } else{
    $("h1").text("Level " + level);
  }

  let randomNumber = Math.floor(Math.random() * (4 + Math.min((level - 1) / categoryLevel, buttonColors.length - 4)));

  let randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  animatePress(randomChosenColour);

}

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else {
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass('game-over');
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();

  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  for (let i = 4; i < buttonColors.length; i++) {
    $("#" + buttonColors[i]).addClass("hide");
  }
}
