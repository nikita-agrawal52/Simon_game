//declaring array of button colours
var buttoncolours =["green","red","yellow","blue"];
//declaring empty array to store the pattern generated by computed
var gamePattern =[];
//declaring empty array to store user clicked pattern
var userClickedPattern=[];
//started variable is used to check if game has already started or not
var started =false;
//level variable is used to store the current level of the game
var level =0;
//when key is pressed game will start
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
  
});
//keeps track of the user clicked pattern
$(".btn").click(function(){

  var userChosenColor= $(this).attr("id");
  userClickedPattern.push(userChosenColor);


  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer((userClickedPattern.length)-1);

 });
 //function to start the game

function nextSequence(){
  userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    //random colour  is chosen from the buttoncolors array
    var randomnum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttoncolours[randomnum];
    //push the random generated colour at the end of gamepattern array
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);

    playSound(randomChosenColor);
}



//function used to play specific sound 
  function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
  }
  //animates the specific button
  function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
    },100);
  }

  //check if user clicked the correct pattern
  function checkAnswer(currentLevel){
    //checks if the last entered i/p in gamepattern array is equal to userClickedPattern array
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("success");
      //begins next sequence after some time delay
      if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    //if pattern doesnt match 
    else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },500);
      $("#level-title").text("Game Over Press Any Key to Restart");
      startOver();

    }

  }
  //resets gamepattern startted and level
  function startOver(){
    level=0;
    gamePattern=[];
    started=false;
  }

















  



  






        

    
