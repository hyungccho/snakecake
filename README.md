#SnakeCake

A quirky spin off of the traditional game of Snake fully playable through the keyboard.
[Live version!](www.hyungccho.com/snakecake)

![Snakecake](/screenshot.png)

##Snake

The snake holds an array of positions, and a queue of directions. When a user hits a directional key, it checks to see if this direction is valid, and adds it to the queue if there are two or less elements in the queue.

````javascript
Snake.prototype.changeDir = function (dir) {
  if (this.isValidDir(dir)) {
    this.dirQueue.push(dir);
  }
};
````

##Game

The `Game` class determines before each render what state the game is currently in. Has the snake eaten a cake? Has the snake hit itself? Has the snake hit a wall? It determines what state it's in and calls the appropriate methods and renders accordingly.

````javascript
if (this.board.cakeEaten()) {
  var unique = false;

  while (!unique) {
    this.board.cake.resetCake();
    unique = true;

    var invalidPos = this.board.snake.positions.concat(this.board.bombs);
    invalidPos.forEach(function (pos) {
      if (pos[0] === this.board.cake.pos[0] && pos[1] === this.board.cake.pos[1]) {
        unique = false;
      }
    }.bind(this));
  }

  this.score += 10;
} else if (this.board.snake.hitWall() || this.board.snake.hitSelf()) {
  this.gameOver();
} else {
  this.board.snake.pop();
}
````
