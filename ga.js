// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

function nextGeneration() {
  console.log('next generation');
    for(var f = 0; f < birds.length; f++)
    {
      birds[f].score = 0;
      for(var a  = 0; a < allAreas.length; a++)
      {
        birds[f].score += birds[f].scores[a];
      }
      birds[f].score *= birds[f].score;
    }
  calculateFitness();
  for (var i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
    birds[i].scores = []
    for(var a = 0; a < allAreas.length; a++)
    {
      birds[i].scores.push(0.0);
    }
  }
  //birds = [];
}

function pickOne() {
  var index = 0;
  var r = random(1);
  while (r > 0) {
    if(index >= birds.length)
    {
      index = (int)(random(1,birds.length+1));
      break;
    }
    r = r - birds[index].fitness;
    index++;
  }
  index--;
  var bird = birds[index];
  //console.log(index);
  var child = new Bird(birds[index].brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  var sum = 0;
  for (var bird of birds) {
    sum += bird.score;
  }
  for (var bird of birds) {
    bird.fitness = bird.score / sum;
  }
}
