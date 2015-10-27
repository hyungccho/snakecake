var Game = function () {
  this.board = new Board();
};

Game.prototype.gameLogic = function () {
  var rowDir = Board.DIRS[this.board.snake.currentDir][0];
  var colDir = Board.DIRS[this.board.snake.currentDir][1];

  this.board.snake.move([rowDir, colDir]);

  if (this.board.cakeEaten()) {
    this.board.cake.resetCake();
  } else if (this.board.snakeHitWall()) {
    this.gameOver();
  } else {
    this.board.snake.pop();
  }
};

Game.prototype.gameOver = function () {
  console.log("Game over!");
};

Game.prototype.render = function () {
  this.removeClasses();

  $("[data-row='" + this.board.cake.pos[0] + "'][data-col='" + this.board.cake.pos[1] + "']")
    .addClass('cake');

  this.board.snake.positions.forEach(function (pos) {
    $("[data-row='" + pos[0] + "'][data-col='" + pos[1] + "']")
      .addClass('snake');
  }.bind(this));
};

Game.prototype.start = function () {
  $(document).on("keydown", function (e) {
    switch (e.which) {
      case 37:
        this.board.snake.changeDir("LEFT");
        break;
      case 38:
        this.board.snake.changeDir("UP");
        break;
      case 39:
        this.board.snake.changeDir("RIGHT");
        break;
      case 40:
        this.board.snake.changeDir("DOWN");
        break;
    }
  }.bind(this));

  setInterval(function () {
    this.gameLogic();
    this.render();
  }.bind(this), 100);
};

Game.prototype.removeClasses = function () {
  $('.snake').removeClass('snake');
  $('.cake').removeClass('cake');
};
