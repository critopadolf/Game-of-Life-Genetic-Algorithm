
![image](https://user-images.githubusercontent.com/77860196/118319769-3aa12e80-b4c9-11eb-912c-dadfb73d6ab3.png)

The neural networks performance is evaluated on many small stages at once. The performance is based on a fitness value which is a normalized sum of all of the pixels in each arena, excluding the red and green pixels. A certain number of frames are allowed to pass before the fitness score is assigned and the genetic selection and crossover are peformed.

In the game of life, a function takes in the value of each pixel in an image, along with all of that pixels neighbors, and uses that to compute a new value for the pixel. In this case that function is a neural network which has certain limitations place on it. Firstly, the sum of the neighboring pixels must be greater than 0.01. Secondly, the pixel type cannot be the red or green type. Other than that, the network can change a pixel value to anything from 0 to 1 (black to white). The challenge is, if the sum of the neighboring pixels for any red pixel exceeds a certain value, all of the neighboring pixels become green and can no longer be changed by the neural network and count as 0 towards the fitness of the network.

![gameoflifeAI2](https://user-images.githubusercontent.com/77860196/118321082-1d6d5f80-b4cb-11eb-91d6-3f70e12a0646.gif)

After some set number of generations tuning the networks to maximize their score by minimizing the number of green pixels created while still placing high valued pixels when it can, the top scoring network is run on a much larger field to test the results
