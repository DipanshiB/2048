var color = {
  2 : '#b6a2eb',
  4 : '#bd7efc',
  8 : '#681db3',
  16 : '#5a298a',
  32 : '#745b8c',
  64 : '#8e7bed',
  128 : '#d0c9f0',
  256 : '#5e5391',
  625 : '#c595f5',
  1024 : '#592d85',
  2048 : '#e7daf5'
};

var grid = document.getElementById("tbl");
var scr = document.querySelector("#score_val");
var score = parseInt(scr);
var play = document.querySelector("#play_again");

reset();

function addRandomTile(){
  var value = Math.random() < 0.7 ? 2 : 4;     //problem : gets hanged if one more key pressed after array gets filled.
  var cell_idx = getRandomInt(4);
  var row_idx = getRandomInt(4);
  var cell = grid.rows[row_idx].cells[cell_idx];
  while(!sqrEmpty(cell_idx ,row_idx)){
    cell_idx = getRandomInt(4);
    row_idx = getRandomInt(4);
  }
    $(grid.rows[row_idx].cells[cell_idx]).text(value);
    var bg = color[value];
    $(grid.rows[row_idx].cells[cell_idx]).css("background", bg);
}

function sqrEmpty(cell_idx, row_idx){
  if($(grid.rows[row_idx].cells[cell_idx]).text()==""){
    return true;
  }
}

function reset(){
  for(var r=0; r<4; r++){
    for(var c=0; c<4; c++){
      $(grid.rows[r].cells[c]).text("");
      $(grid.rows[r].cells[c]).css("background",'white');
    }
  }
  addRandomTile();
  addRandomTile();
  score = 0;
  $('#score_val').text(score);
}

$(document).keydown(function(e){
  if(e.which == 37){
    console.log("left pressed");
    for(var r=0; r<4; r++){
      for(var c=0; c<4; c++){
        // matchesNotPossible(c,r);
        moveTileLeft(c,r);
      }
    }
    addRandomTile();
  }
  if(e.which == 38){
    console.log("up pressed");
    for(var r1=0; r1<4; r1++){
      for(var c1=0; c1<4; c1++){
        // matchesNotPossible(c1, r1);
        moveTileUp(c1,r1);
      }
    }
    addRandomTile();
  }
  if(e.which == 39){
    console.log("right pressed");
    for(var r2=0; r2<4; r2++){
      for(var c2=0; c2<4; c2++){
        // matchesNotPossible(c2, r2);
        moveTileRight(c2,r2);
      }
    }
    addRandomTile();
  }
  if(e.which == 40){
    console.log("down pressed");
    for(var r3=0; r3<4; r3++){
      for(var c3=0; c3<4; c3++){
        // matchesNotPossible(c3, r3);
        moveTileDown(c3,r3);
      }
    }
    addRandomTile();
  }
});

function moveTileLeft(cell_idx, row_idx){
  if(cell_idx == 0){
    return false;
  }
  var thisCell = grid.rows[row_idx].cells[cell_idx];
  var nextCell = grid.rows[row_idx].cells[cell_idx-1];
  // while(sqrEmpty(nextCell)){
  //   nextCell = grid.rows[row_idx].cells[cell_idx-1];
  // }
  if(!sqrEmpty(cell_idx, row_idx)){
    var value = parseInt($(thisCell).text());
    if(!sqrEmpty(cell_idx-1, row_idx)){
      sumTiles(thisCell, nextCell);
    }
    if(sqrEmpty(cell_idx-1, row_idx)){
      $(nextCell).text(value);
      $(nextCell).css("background", color[value]);
      $(thisCell).text("");
      $(thisCell).css("background", "white");
    }
  }
}

function moveTileRight(cell_idx, row_idx){
  if(cell_idx == 3){
    return false;
  }
  var thisCell = grid.rows[row_idx].cells[cell_idx];
  var nextCell = grid.rows[row_idx].cells[cell_idx+1];
  // while(sqrEmpty(nextCell)){
  //   nextCell = grid.rows[row_idx].cells[cell_idx+1];
  // }
  if(!sqrEmpty(cell_idx, row_idx)){
    var value = parseInt($(thisCell).text());
    if(!sqrEmpty(cell_idx+1, row_idx)){
      sumTiles(thisCell, nextCell);
    }
    if(sqrEmpty(cell_idx+1, row_idx)){
      $(nextCell).text(value);
      $(nextCell).css("background", color[value]);
      $(thisCell).text("");
      $(thisCell).css("background", "white");
    }
  }
}

function moveTileUp(cell_idx, row_idx){
  if(row_idx == 0){
    return false;
  }
  var thisCell = grid.rows[row_idx].cells[cell_idx];
  var nextCell = grid.rows[row_idx-1].cells[cell_idx];
  // while(sqrEmpty(nextCell)){
  //   nextCell = grid.rows[row_idx-1].cells[cell_idx];
  // }
  if(!sqrEmpty(cell_idx, row_idx)){
    var value = parseInt($(thisCell).text());
    if(!sqrEmpty(cell_idx, row_idx-1)){
      sumTiles(thisCell, nextCell);
    }
    if(sqrEmpty(cell_idx, row_idx-1)){
      $(nextCell).text(value);
      $(nextCell).css("background", color[value]);
      $(thisCell).text("");
      $(thisCell).css("background", "white");
    }
  }
}

function moveTileDown(cell_idx, row_idx){
  if(row_idx == 3){
    return false;
  }
  var thisCell = grid.rows[row_idx].cells[cell_idx];
  var nextCell = grid.rows[row_idx + 1].cells[cell_idx];
  // while(sqrEmpty(nextCell)){
  //   nextCell = grid.rows[row_idx + 1].cells[cell_idx];
  // }
  if(!sqrEmpty(cell_idx, row_idx)){
    var value = parseInt($(thisCell).text());

    if(!sqrEmpty(cell_idx, row_idx+1)){
      sumTiles(thisCell, nextCell);
    }
    if(sqrEmpty(cell_idx, row_idx+1)){
      $(nextCell).text(value);
      $(nextCell).css("background", color[value]);
      $(thisCell).text("");
      $(thisCell).css("background", "white");
    }
  }
}

function sumTiles(thisCell, nextCell){
  var thisVal = parseInt($(thisCell).text());
  var nextVal = parseInt($(nextCell).text());
  if(thisVal === nextVal){
    var valuenew = thisVal + nextVal;
    $(nextCell).text(valuenew);
    $(nextCell).css("background", color[valuenew]);
    $(thisCell).text("");
    $(thisCell).css("background", "white");
    console.log("added");
    updateScore(valuenew);
  }
  else{
    console.log("not equal");
    return false;
  }
}

function matchesNotPossible(cell_idx, row_idx){

  var val = parseInt($(grid.rows[row_idx].cells[cell_idx]).text());
  var adjCells = [];
  if(row_idx!=(0||3) && cell_idx!=(0||3)){
    adjCells = [grid.rows[row_idx-1].cells[cell_idx],
                grid.rows[row_idx+1].cells[cell_idx],
                grid.rows[row_idx].cells[cell_idx+1],
                grid.rows[row_idx].cells[cell_idx-1] ];
  }
  else if(row_idx==0 && cell_idx==0){
      adjCells = [grid.rows[1].cells[0],
                  grid.rows[0].cells[1]];
    }
  else if(row_idx==3 && cell_idx==3){
      adjCells = [grid.rows[3].cells[2],
                  grid.rows[2].cells[3]];
    }
  else if(row_idx==0 && cell_idx==3){
          adjCells = [grid.rows[1].cells[0],
                      grid.rows[0].cells[1]];
    }
  else {
    if(row_idx==0){
      adjCells = [grid.rows[1].cells[cell_idx],
                  grid.rows[0].cells[cell_idx+1],
                  grid.rows[0].cells[cell_idx-1] ];
    }
    if(row_idx==3){
      adjCells = [grid.rows[2].cells[cell_idx],
                  grid.rows[3].cells[cell_idx+1],
                  grid.rows[3].cells[cell_idx-1] ];
    }
    if(cell_idx==0){
      adjCells = [grid.rows[row_idx+1].cells[0],
                  grid.rows[row_idx-1].cells[0],
                  grid.rows[row_idx].cells[1] ];
    }
    if(cell_idx==3){
      adjCells = [grid.rows[row_idx+1].cells[3],
                  grid.rows[row_idx-1].cells[3],
                  grid.rows[row_idx].cells[2] ];
    }
  }

    adjCells.forEach(function(adj_cell){
      if(!sqrEmpty(adj_cell.cellIndex, adj_cell.rowIndex) && (parseInt($(adj_cell).text()) != val)){
        alert("game over");
        reset();
        return false;
      }
    });
}

function updateScore(val){
  score = score + val;
  $('#score_val').text(score);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
