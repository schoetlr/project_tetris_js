var Controller = (function(Block, Board, View){
  
  var init = function(){
    View.init(runInterval, handleInput);
  }

  var runInterval = function(){
    //if the last generated piece has stopped moving generate a new piece 
    //or if the board is empty
    if(Board.empty() || Board.noneMoving()){
      Block.spawnBlock();
    } else {
      Board.moveBlockDown();
    }
    //handles full rows
    Board.handleScoring();
    View.render(Board.blocks, Board.score());
  }

  var handleInput = function(event){
    //move piece left/right

    if(event.which === 37){
      Board.moveLeft();
    } else if(event.which === 39){
      Board.moveRight();
    }
  }

  return {
    init: init
  }

})(Block, Board, View)




$(document).ready(function(){
  Controller.init()
})