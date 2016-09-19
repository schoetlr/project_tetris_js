var Board = (function(){

  var score = 0;
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

    var leftSide = [];
    var farthestLeft = oneOver[0][0];
    oneOver.forEach(function(coord){
      if(coord[0] < farthestLeft){
        leftSide.push(coord);
      }
    })

    var clear = true;
    leftSide.forEach(function(oneOverCoord){
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
    var rightSide = [];
    var farthestRight = oneOver[0][1];
    oneOver.forEach(function(coord){
      if(coord[1] > farthestRight){
        rightSide.push(coord);
      }
    })

    var clear = true;
    rightSide.forEach(function(oneOverCoord){
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

  var wipeFullRows = function(){

    var fullRows = [];
    var xRows = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    blocks.forEach(function(block){
      block.coords.forEach(function(coord){
        var rowIndex = coord[0];
        // console.log(rows);
        // rows[rowIndex].push(coord);
        xRows[rowIndex] += 1;
      })
    })
    
    // rows.forEach(function(row, index){
    //   if(row.length === 10){
    //     fullRows.push(index);
    //   }
    // })
    xRows.forEach(function(count, index){
      if(count === 10){
        fullRows.push(index);
      }
    })


    fullRows.sort();
    //SORT FULL ROWS FROM SMALLEST TO LARGEST

    //indexes of rows to wipe
    //get rid of coords that match row of full row
    fullRows.forEach(function(fullIndex){
      score += 1;
      blocks.forEach(function(block){
        removeIndices = [];
        
        block.coords.forEach(function(coord, removeIndex){
          if(fullIndex === coord[0]){
            removeIndices.push(removeIndex);
          }
        })

        //sort the removeIndices from biggest to smallest so as to not change 
        //any index while splicing
        removeIndices = removeIndices.sort(function(a,b){return b - a;});

        //remove the coords in remove Index from block
        removeIndices.forEach(function(index){
          block.coords.splice(index,1);
        })
      })

      //go through each coords and if its row is less than the fullIndex
      //and add 1 to the row
      blocks.forEach(function(block){
        block.coords.forEach(function(coord){
          if(coord[0] < fullIndex){
            //add one to its row
            var newRow = coord[0] + 1;
            coord[0] = newRow;
          }
        })
      })


    })//end fullRows iteration

  }//end wipeFullRows

  var slideDown = function(){
    //if the coordinate directly before it does not exist then slide down

    //collect the coordinates with a freespace below, and then shift allthose 
    //coords down by one

    //use a do while maybe to set a flag for whether or not you just slide any 
    //elements
    
  }

  var handleScoring = function(){
    wipeFullRows();
    slideDown();
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
    moveRight: moveRight,

    handleScoring: handleScoring,
    score: score


  }


})()