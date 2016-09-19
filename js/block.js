var Block = (function(Board){

  var createSquare = function(){
    return new block([[0,4],[0,5],[1,4],[1,5]]);
  }

  var createBar = function(){
    return new block([[0,4],[1,4],[2,4],[3,4]]);
  }

  var createLShape = function(){
    var random = Math.ceil(Math.random * 2);
    if(random === 1){
      return new block([[0,4],[1,4],[2,4],[2,5]]);
    } else {
      return new block([[0,5],[1,5],[2,5],[2,4]]);
    }

  }

  var createSShape = function(){
    var random = Math.ceil(Math.random * 2);
    if(random === 1){
      return new block([[0,4],[0,5],[1,4],[2,4],[3,4],[3,3]]);
    } else {
      return new block([[0,4],[0,3],[1,4],[2,4],[3,4],[3,5]]);
    }
  }

  var spawnBlock = function(){
    var random = Math.ceil(Math.random() * 4);
    var block;
    if(random === 1){
      block = createSquare();
    } else if(random === 2){
      block = createBar();
    } else if(random === 3){
      block = createLShape();
    } else {
      block = createSShape();
    }

    Board.blocks.unshift(block);
  }

  function block(coords) {
    this.coords = coords;

    this.moving = true;

    this.lastRowCoords = function(){
      var maxRow = 0;
      this.coords.forEach(function(coord){
        if(coord[0] > maxRow){
          maxRow = coord[0];
        }
      })
      
      var last = [];

      this.coords.forEach(function(coord){
        if(coord[0] === maxRow){
          last.push(coord);
        }
      })

      return last;
    }//end lastRowCoords

    this.left = function(){
      var left = this.coords[0][1];
      this.coords.forEach(function(coord){
        if(coord[1] < left){
          left = coord[1];
        }
      })
      return left;
    }

    this.right = function(){
      var right = this.coords[0][1];
      this.coords.forEach(function(coord){
        if(coord[1] > right){
          right = coord[1];
        }
      })

      return right;
    }
    
  }


  return {
    
    spawnBlock: spawnBlock

  }

})(Board)