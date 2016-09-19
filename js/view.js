var View = (function(){

  var _runInterval;
  var _handleInput;

  var init = function(intervalCallback, inputCallback){
    
    _runInterval = intervalCallback;
    _handleInput = inputCallback;

    buildBoard();

    //set interval
    setInterval(_runInterval, 500);

    //set keyboard events
    $(document).keyup(function(event){
      
      _handleInput(event);

    });
  }

  var render = function(blocks){
    $(".col").removeClass("block");
    drawBlocks(blocks);
  }

  var drawBlocks = function(blocks){
    //give a class of block to each coords of each block
    blocks.forEach(function(block){
      block.coords.forEach(function(coord){
        var row = coord[0];
        var col = coord[1];

        $target = $(".row[data-row=" + row + "]").find(".col[data-col=" + col + "]");

        $target.addClass("block");
      })
    })
  }

  var buildBoard = function(){
    //give data-col attr to cols
    
    //four rows with display to none
    for(var i = 0; i <= 23; i++){
      $row = $("<div class='row'></div>");
      $row.attr("data-row", i);
           

      for(var j = 0; j <= 9; j++){
        $col = $("<div class='col'></div>");
        $col.attr("data-col", j);
        $row.append($col)
      }

      $("#tetris").append($row);
    }
    //hide the first four row
    for(h = 0; h <= 3; h++){
      $(".row[data-row=" + h +"]").hide();
    }
    
  }//end buildBoard


  return {
    init: init,

    render: render
  }


})()