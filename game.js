var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function()
{
    nextSequence();

    $("#level-title").html("Level " + level);
});



$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);


  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");

      if (userClickedPattern.length === gamePattern.length)
      {
      setTimeout(function ()
      {
        nextSequence();
        userClickedPattern = [];

      }, 1000);
    }
}

    else
    {
        console.log("fail");
        var gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();

        $(document).addClass("game-over");
        setTimeout(function ()
        {
          $(document).removeClass("pressed");
        }, 200);

      $("#level-title").html("Game Over, Press Any Key to Restart");
      level = 0;

    }


}

function nextSequence() {

  level++;
  $("#level-title").html("Level " + level);

  var randomNumber = Math.floor((Math.random() * 3) + 1);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

  }

  function playSound(name)
  {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
  }

  function animatePress(currentColour)
  {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }
