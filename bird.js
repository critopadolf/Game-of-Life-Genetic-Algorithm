
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird


class Bird {
  constructor(brain) {
    this.score = 0;
    this.scores = [];
    this.fitness = 0;
    this.loss = false;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(16, 8, 8, 1);
    }
  }


  up() {
  }

  mutate() {
    this.brain.mutate(0.2);
  }

  think(NextGameArea,GameArea,k) {
    // Find the closest pipe
    let maxX = 0; 
    let loss = false;
    var sc = 0.0;
    for(var x = 1; x < GameArea.length - 1; x++)
    {
      for(var y = 1; y < GameArea[x].length - 1; y++) 
      {
        let inputs = [];
        inputs[0] = Number(GameArea[x-1][y-1][0]);
        inputs[1] = Number(GameArea[x  ][y-1][0]);
        inputs[2] = Number(GameArea[x+1][y-1][0]);
        inputs[3] = Number(GameArea[x+1][y  ][0]);
        inputs[4] = Number(GameArea[x+1][y+1][0]);
        inputs[5] = Number(GameArea[x  ][y+1][0]);
        inputs[6] = Number(GameArea[x-1][y+1][0]);
        inputs[7] = Number(GameArea[x-1][y  ][0]);
        
        inputs[8] =  Number(GameArea[x-1][y-1][1]) == 0 || Number(GameArea[x-1][y-1][1]) == 2;
        inputs[9] =  Number(GameArea[x  ][y-1][1]) == 0 || Number(GameArea[x  ][y-1][1]) == 2;
        inputs[10] = Number(GameArea[x+1][y-1][1]) == 0 || Number(GameArea[x+1][y-1][1]) == 2;
        inputs[11] = Number(GameArea[x+1][y  ][1]) == 0 || Number(GameArea[x+1][y  ][1]) == 2;
        inputs[12] = Number(GameArea[x+1][y+1][1]) == 0 || Number(GameArea[x+1][y+1][1]) == 2;
        inputs[13] = Number(GameArea[x  ][y+1][1]) == 0 || Number(GameArea[x  ][y+1][1]) == 2;
        inputs[14] = Number(GameArea[x-1][y+1][1]) == 0 || Number(GameArea[x-1][y+1][1]) == 2;
        inputs[15] = Number(GameArea[x-1][y  ][1]) == 0 || Number(GameArea[x-1][y  ][1]) == 2;
        
        var tot = Number(inputs[0]) + Number(inputs[1]) + Number(inputs[2]) + Number(inputs[3]) + Number(inputs[4]) + Number(inputs[5]) + Number(inputs[6]) + Number(inputs[7]);
        if(Number(GameArea[x][y][1]) == 0)
        {
          //if this pixel is mutable
          if(Number(tot) > 0.01)
          {
            //new cells must grow from strong old ones
            NextGameArea[x][y][0] = Number(this.brain.predict(inputs));
          }
          else
          {
            NextGameArea[x][y][0] = Number(GameArea[x][y][0]);
          }
          
          NextGameArea[x][y][1] = 0;
        }
        else if(Number(GameArea[x][y][1]) == 1)
        {
          //on a kill block, if too many neighbors this bird loses
          //did we just lose the game?
          if(tot > 2)
          //if((inputs[0] > 0) + (inputs[1] > 0) + (inputs[2] > 0) + (inputs[3] > 0) + (inputs[4] > 0) + (inputs[5] > 0) + (inputs[6] > 0) + (inputs[7] > 0) > 2) 
          {
            //lose
            //loss = true;
            
            NextGameArea[x-1][y-1][0] = 0;
            NextGameArea[x  ][y-1][0] = 0;
            NextGameArea[x+1][y-1][0] = 0;
            NextGameArea[x+1][y  ][0] = 0;
            NextGameArea[x+1][y+1][0] = 0;
            NextGameArea[x  ][y+1][0] = 0;
            NextGameArea[x-1][y+1][0] = 0;
            NextGameArea[x-1][y  ][0] = 0;

            NextGameArea[x-1][y-1][1] = 2;
            NextGameArea[x  ][y-1][1] = 2;
            NextGameArea[x+1][y-1][1] = 2;
            NextGameArea[x+1][y  ][1] = 2;
            NextGameArea[x+1][y+1][1] = 2;
            NextGameArea[x  ][y+1][1] = 2;
            NextGameArea[x-1][y+1][1] = 2;
            NextGameArea[x-1][y  ][1] = 2;
            
            GameArea[x-1][y-1][0] = 0;
            GameArea[x  ][y-1][0] = 0;
            GameArea[x+1][y-1][0] = 0;
            GameArea[x+1][y  ][0] = 0;
            GameArea[x+1][y+1][0] = 0;
            GameArea[x  ][y+1][0] = 0;
            GameArea[x-1][y+1][0] = 0;
            GameArea[x-1][y  ][0] = 0;

            GameArea[x-1][y-1][1] = 2;
            GameArea[x  ][y-1][1] = 2;
            GameArea[x+1][y-1][1] = 2;
            GameArea[x+1][y  ][1] = 2;
            GameArea[x+1][y+1][1] = 2;
            GameArea[x  ][y+1][1] = 2;
            GameArea[x-1][y+1][1] = 2;
            GameArea[x-1][y  ][1] = 2;
            
          }
          NextGameArea[x][y][0] = Number(GameArea[x][y][0]);
          NextGameArea[x][y][1] = 1;

        }
        else
        {
          //Wall hit
          NextGameArea[x][y][0] = Number(GameArea[x][y][0]);
          NextGameArea[x][y][1] = 2;
        }
        /*
        ideas
        blocks that turn cells into stone
        Inverse of red block: blue block that if a cell lower than x is placed near it, it will create walls
        OR, if tot > x, turns self [and all neighbors?] to [1,0] -> can cause chain reaction, maybe change to [0,0] 
        add more inputs to give cells foresight to avoid obstacles
        */
        sc = Number(sc) + Number(NextGameArea[x][y][0]);
        if(loss)
        {
          break;
        }
      }
      if(loss)
      {
        break;
      }
    }
    //GameArea = NextGameArea;
    this.scores[k] = sc;
    return loss;
  }

  offScreen() {
    return this.y > height || this.y < 0;
  }
}
