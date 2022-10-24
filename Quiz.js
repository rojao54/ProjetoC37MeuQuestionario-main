class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
  
    question.hide()
    background("purple")
    textSize(31);
    fill("black");
    text("RESULTADO DO QUIZ:",30,50)
    Contestant.getPlayerInfo()

    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      var RespostasY = 300
      text("Jogador que respondeu a resposta correta é destacado na cor verde",130,230)
      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer)
          fill("green");
        else
          fill("red");
        RespostasY = RespostasY+30
        textSize(20)
        text(allContestants[plr].name+":"+allContestants[plr].answer,60,RespostasY)
      }
  }

    
  }

}
