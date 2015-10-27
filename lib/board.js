var Board = function () {
  this.grid = this.makeGrid();
  this.cake = new Cake();
  this.snake = new Snake();
};

Board.DIRS = {
  "UP": [-1, 0],
  "DOWN": [1, 0],
  "LEFT": [0, -1],
  "RIGHT": [0, 1]
};

Board.SIZE = 25;

Board.prototype.makeGrid = function () {
  var grid = new Array(25);

  for (var i = 0; i < 25; i++) {
    grid[i] = new Array(25);
  }

  return grid;
};

Board.prototype.snakeHitWall = function () {
  var row = this.snake.head()[0], col = this.snake.head()[1];

  return (row < 0 || row > 24 || col < 0 || col > 24);
};

Board.prototype.cakeEaten = function () {
  return (this.cake.pos[0] === this.snake.head()[0] &&
          this.cake.pos[1] === this.snake.head()[1]);
};
