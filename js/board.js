var Board = (function(){

  var blocks = [];
  //unshift blocks onto the board so can be easily indexed for the moving piece

  var width = 10;

  var height = 24;
  //top four rows are hidden for spawning blocks

  var empty = function(){
    return blocks.length === 0;
  }

  var noneMoving = function(){
    return !blocks[0].moving;
  }

  var moveBlockDown = function(){
    var block = blocks[0];
    checkStatus(block);
    if(block.moving === true){
      
      block.coords.forEach(function(coord){
        var row = coord[0];
        var newRow = row + 1;
        coord[0] = newRow;
      })
    }
        
  }

  var leftClear = function(block){
    //check that no blocks intersect with the coords of the passed block -1 to 
    //the the col
    var oneOver = [];
    block.coords.forEach(function(coord){
      var col = coord[1] - 1;
      oneOver.push([coord[0], col]);
    })

    var clear = true;
    oneOver.forEach(function(oneOverCoord){
      blocks.forEach(function(boardBlock){
        boardBlock.coords.forEach(function(coord){
          if(oneOverCoord[0] === coord[0] && oneOverCoord[1] === coord[1]){
            clear = false;
          }
        })
      })

    })

    return clear;
      
  }//end left clear

  var rightClear = function(block){
    var oneOver = [];
    block.coords.forEach(function(coord){
      var col = coord[1] + 1;
      oneOver.push([coord[0], col]);
    })

    var clear = true;
    oneOver.forEach(function(oneOverCoord){
      blocks.forEach(function(boardBlock){
        boardBlock.coords.forEach(function(coord){
          if(oneOverCoord[0] === coord[0] && oneOverCoord[1] === coord[1]){
            clear = false;
          }
        })
      })

    })

    return clear;


  }//end right clear


  var moveRight = function(){
    var block = blocks[0];
    
    if(block.right() < 9 && rightClear(block)){
      
      block.coords.forEach(function(coord){
        var newCol = coord[1] + 1;
        coord[1] = newCol;
      })

    }
  }

  var moveLeft = function(){
    var block = blocks[0];
    
    if(block.left() > 0 && leftClear(block)){
      
      block.coords.forEach(function(coord){
        var newCol = coord[1] - 1;
        coord[1] = newCol;
      })

    }
  }

  var checkStatus = function(block){

    block.coords.forEach(function(coord){
      if(coord[0] === 23){
        block.moving = false;
        return;
      }
    })
    //then check if the next coord is occupied for each coord 
    //if it is then set moving to false

    //if still moving
    if(block.moving === true){
      var oneDown = [];
      lastRow = block.lastRowCoords();
      lastRow.forEach(function(coord){

        var row = coord[0] + 1;
        var col = coord[1];
        //maybe only get the oneDown of the last row
        oneDown.push([row, col]);
      })

      //check if any oneDown coords match any existing blocks
      oneDown.forEach(function(oneDownCoord){
        blocks.forEach(function(boardBlock){
          boardBlock.coords.forEach(function(blockCoord){
            //always one down coord at block coord bc blocks are multiple 
            //coords
            if(oneDownCoord[0] === blockCoord[0] && oneDownCoord[1] === blockCoord[1]){
              block.moving = false;
              
              return;
            }
          })
          
        })
      })
    }
    

  }//end check status

  return {
    blocks: blocks,

    empty: empty,

    noneMoving: noneMoving,

    moveBlockDown: moveBlockDown,

    moveLeft: moveLeft,
    moveRight: moveRight


  }


})()