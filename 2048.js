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
var sqr = document.querySelectorAll(".square");
var score = document.querySelector("#score_val");
var play = document.querySelector("#play_again");

addRandomTile();
addRandomTile();

$('.square').on('click',function(){
  var val = parseInt($(this).text());
  console.log(val);
  var bg = color[val];
  $(this).css("background", bg);
});

var firstSel, nextSel;
{
var val;
$('.square').on('click', function(){
  firstSel = $(this).select();
  val = parseInt($(this).text());
});
$('.square').on('click', function(){
    nextSel = $(this).select();
    if($(nextSel).text() == "")
    {
      $(nextSel).text(val);
      var bg = color[val];
      $(this).css("background", bg);
    }
    else{
      console.log("not empty can't transfer");
    }
});
}

$('#play_again').on('click', function(){
  reset();
});

function reset(){
  sqr.forEach(function(cell){
    $(cell).text("");
    $(cell).css("background",'white');
  });
  addRandomTile();
  addRandomTile();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function addRandomTile(){
  var value = Math.random() < 0.7 ? 2 : 4;     //problem : gets hanged if one more key pressed after array gets filled.
  var index = getRandomInt(16);
  while(!sqrEmpty(index)){
    index = getRandomInt(16);
  }
    $(sqr[index]).text(value);
    var bg = color[value];
    $(sqr[index]).css("background", bg);
}

// if(sqr1.value == sqr2.value){
//   scr++;
// }
$(document).keydown(function(e){
  if(e.which == 37){
    console.log("left pressed");
    addRandomTile();
    sqr.forEach(function(cell){
      matchesNotPossible(cell);
      moveTileLeft($(sqr).index(cell));
    });

  }
  if(e.which == 38){
    console.log("up pressed");
    addRandomTile();
    sqr.forEach(function(cell){
      matchesNotPossible(cell);
      moveTileUp($(sqr).index(cell));
    });
  }
  if(e.which == 39){
    console.log("right pressed");
    addRandomTile();
    sqr.forEach(function(cell){
      matchesNotPossible(cell);
      moveTileRight($(sqr).index(cell));
    });
  }
  if(e.which == 40){
    console.log("down pressed");
    addRandomTile();
    sqr.forEach(function(cell){
      matchesNotPossible(cell);
      moveTileDown($(sqr).index(cell));
    });
  }
});

function sqrEmpty(idx){
  if($(sqr[idx]).text()==""){
    return true;
  }
}

function moveTileLeft(index){
  var thisCell = sqr[index];
  var nextCell = sqr[index-1];
  if(!sqrEmpty(index)){
    if(index==0 || index==4 || index==8 || index==12){
      return false;
    }
    var value = parseInt($(thisCell).text());
    if(!sqrEmpty($(nextCell).index())){
      sumTiles(thisCell, nextCell);
    }
    if(sqrEmpty($(nextCell).index())){
      $(nextCell).text(value);
      $(nextCell).css("background", color[value]);
      $(thisCell).text("");
      $(thisCell).css("background", "white");
    }
  }
}

function moveTileRight(index){
  var thisCell = sqr[index];
  var nextCell = sqr[index+1];
  if(!sqrEmpty(index)){
    var value = parseInt($(thisCell).text());
    if(index==3 || index==7 || index==11 || index==15){
      return false;
    }
    if(!sqrEmpty($(nextCell).index())){
      sumTiles(thisCell, nextCell);
    }
    if(sqrEmpty($(nextCell).index())){
      $(nextCell).text(value);
      $(nextCell).css("background", color[value]);
      $(thisCell).text("");
      $(thisCell).css("background", "white");
    }
  }
}

function moveTileUp(index){
  // var thisIdx = index;
  var thisCell = sqr[index];
  // while(index!=0 && index!= 1 && index!=2 && index!=3){
  //   index -= 4;
  // }
  // var nextIdx = index;
  var nextCell = sqr[index-4];
  if(!sqrEmpty(index)){
    var value = parseInt($(thisCell).text());
    if(index==0 || index==1 || index==2 || index==3){
      return false;
    }
    if(!sqrEmpty($(nextCell).index())){
      sumTiles(thisCell, nextCell);
    }
    if(sqrEmpty($(nextCell).index())){
      $(nextCell).text(value);
      $(nextCell).css("background", color[value]);
      $(thisCell).text("");
      $(thisCell).css("background", "white");
    }
  }
}

function moveTileDown(index){
  var thisCell = sqr[index];
  var nextCell = sqr[index+4];
  if(!sqrEmpty(index)){
    var value = parseInt($(thisCell).text());
    if(index==12 || index==13 || index==14 || index==15){
      return false;
    }
    if(!sqrEmpty($(nextCell).index())){
      sumTiles(thisCell, nextCell);
    }
    if(sqrEmpty($(nextCell).index())){
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
  }
  else{
    console.log("not equal");
    return false;
  }
}

function matchesNotPossible(thisCell){
  var index = $(thisCell).index();
  var val = parseInt($(thisCell).text());
  var adjCells = [sqr[index-1],sqr[index+1],sqr[index-4],sqr[index+4]];
  adjCells.forEach(function(adj_cell){
    if(!sqrEmpty(adj_cell) && (parseInt($(adj_cell).text()) != val)){
      gameOver();
      return false;
    }
  });
}

function updateScore(){
  if(sumTiles(thisCell, nextCell)){
    score = score + 1;
    console.log(score);
  }
  $('#score_val').text(score);
}

function gameOver(){
  alert("GAME OVER!");
}
