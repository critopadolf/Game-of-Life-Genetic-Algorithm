// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

// Part 1: https://youtu.be/c6y21FkaUqw
// Part 2: https://youtu.be/tRA6tqgJBc
// Part 3: https://youtu.be/3lvj9jvERvs
// Part 4: https://youtu.be/HrvNpbnjEG8
// Part 5: https://youtu.be/U9wiMM3BqLU

const TOTAL = 100;
var numAreas = 25;
var numGens = 100;
var xw = 10;
var yw = 10;

var birds = [];
var counter = 0;
var slider;
var species_slider;
var allAreas = [];
var nextAllAreas = [];
var allAreas0 = [];
var scl = 15;
var losses = [];
var highScore;
var generation = 0;
function keyPressed() {
  /*
  if (key === 'S') {
    var bird = birds[0];
    saveJSON(bird.brain, 'bird.json');
  }
  */
}

function setup() {
  
  
  slider = createSlider(1, 10, 1);
  species_slider = createSlider(0, TOTAL-1, 1);
  /*
  //Example of what a game area looks like
  //each pixel is a cell represented by a value and a type
  var gameArea0 = [[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
                  [[0,0],  [0,2],[0,0],[0,0],[0,0],[0,2],  [0,0]],
                  [[0,0],  [0,0],[0,0],[0,1],[0,0],[0,0],  [0,0]], 
                  [[0,0],  [0,2],[0,0],[0,2],[0,0],[0,2],  [0,0]],
                  [[0,0],  [0,0],[1,0],[0,1],[0,0],[0,0],  [0,0]],
                  [[0,0],  [0,2],[0,0],[0,0],[0,0],[0,2],  [0,0]],
                  [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]];
  */
  genMaps();
  createCanvas(scl*500, 5*scl*20);
  pixelDensity(1);
  
  for (var i = 0; i < TOTAL; i++) {
      birds[i] = new Bird();
      losses.push([]);
      birds[i].scores = [];
      for(var j = 0; j < allAreas.length; j++)
      {
        losses.push(false);
        birds[i].scores.push(0.0);
      }
  }
}
function genMaps()
{
  for(var g = 0; g < numAreas; g++)
  {
    var gameArea0 = []
    var gameAreas = []
    for(var x = 0; x < xw; x++)
    {
      gameArea0.push([]);
      for(var y = 0; y < yw; y++)
      {
        var r = random();
        var d = sqrt(x*x + y*y);
        if(r < 0.35 && d > 3)
        {
          gameArea0[x].push([0, 1]);
        }
        else if(r < 0.1 && d > 3)
        {
          gameArea0[x].push([0,2]);  
        }
        else
        {
          gameArea0[x].push([0,0]);
        }
      }
    }
    gameArea0[1][1] = [0.2,0];
    gameArea0[2][2] = [0.3,0];
    for (var i = 0; i < TOTAL; i++) {
      gameAreas.push(gameArea0);
    }
    allAreas.push(_.cloneDeep(gameAreas));
  }
  //allAreas0 = _.cloneDeep(allAreas);
  nextAllAreas = _.cloneDeep(allAreas);
}


function draw() {
  
  highScore = 0;
  var highScoreIndex = 0;
  for (let n = 0; n < slider.value(); n++) {
    counter++;
    for (let i = 0; i < birds.length; i++) {
      var score = 0;
      for(var j = 0; j < allAreas.length; j++)
      {
        if(!losses[i][j]) {
          losses[i][j] = birds[i].think(nextAllAreas[j][i],allAreas[j][i],j);
          allAreas[j][i] = _.cloneDeep(nextAllAreas[j][i]);
        }
        score += birds[i].scores[j];
      } 
      birds[i].score = score;
      if(score > highScore)
      {
        highScore = score;
        highScoreIndex = i;
      }
      
    }

    if (counter === 20) {
      //allAreas = allAreas0;
      generation++;
      console.log("gen: ",generation);
      if(generation < numGens)
      {
        counter = 0;
        console.log("highscore: ",highScore);
        allAreas = [];
        genMaps();
        nextGeneration();
      }
      if(generation === numGens)
      {
        birds = [birds[highScoreIndex]];
        numAreas = 1;
        xw = 100;
        yw = 100;
        genMaps();
      }
    }
  }
  show(highScoreIndex);
  
  //show(species_slider.value());
  //print(frameCount)
  
}
function show(i)
{
  resetMatrix();
  scale(scl);
  background(0);
  //text(highScore, 10, 10, 70, 80);
  var yx = 0;
  for(var a = 0; a < allAreas.length; a++)
  {
    translate((generation < numGens)*500/(2*scl),0);
    for(var x = 0; x < allAreas[a][i].length; x++)
    {
        for(var y = 0; y < allAreas[a][i][x].length; y++)
        {
            if(allAreas[a][i][x][y][1] == 0){
              stroke(255*allAreas[a][i][x][y][0]);
            }
            else if(allAreas[a][i][x][y][1] == 1)
            {
              stroke(255,0,0);
            }
            else
            {
              stroke(40,255,40);
            }
            rect(x,y,1,1);
        }
    }
    if((a+1)%5 == 0 && (generation < numGens))
    {
      resetMatrix();
      scale(scl);
      translate(0,yx*500/(2*scl));
      yx++;
    }
  }
}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }
