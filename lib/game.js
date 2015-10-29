var Game = function () {
  this.gamePlaying = false;
  this.score = 0;
};

Game.prototype.gameLogic = function () {
  var rowDir = Board.DIRS[this.board.snake.dirQueue[0]][0];
  var colDir = Board.DIRS[this.board.snake.dirQueue[0]][1];

  this.board.snake.move([rowDir, colDir]);

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
};

Game.prototype.gameOver = function () {
  this.gamePlaying = false;
  clearInterval(this.step);
  $('.gameover').css("display", "block");
};

Game.prototype.render = function () {
  this.removeClasses();

  $('.score-panel').text(this.score);
  $("[data-row='" + this.board.cake.pos[0] + "'][data-col='" + this.board.cake.pos[1] + "']")
    .addClass('cake');

  this.board.snake.positions.forEach(function (pos, idx) {
    var $cell = $("[data-row='" + pos[0] + "'][data-col='" + pos[1] + "']");

    var cssDir = this.board.snake.currentDir().toLowerCase();
    var snakeLength = this.board.snake.positions.length;
    if (idx === 0) {
      $cell.addClass("head-" + cssDir);
    } else if (idx === this.board.snake.positions.length - 1) {
      var beforeTail = this.board.snake.positions[snakeLength - 2];
      var tail = this.board.snake.positions[snakeLength - 1];

      if (beforeTail[0] < tail[0]) {
        cssDir = "up";
      } else if (beforeTail[0] > tail[0]) {
        cssDir = "down";
      } else if (beforeTail[1] < tail[1]) {
        cssDir = "left";
      } else if (beforeTail[1] > tail[1]) {
        cssDir = "right";
      }

      $cell.addClass("tail-" + cssDir);
    } else {
      $cell.addClass('body');
    }
  }.bind(this));
};

Game.prototype.start = function () {
  this.gamePlaying = true;
  $(document).off();
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

  this.resetGame();

  this.step = setInterval(function () {
    this.gameLogic();
    this.render();
  }.bind(this), 60);
};

Game.prototype.resetGame = function () {
  this.board = new Board();
  $('.start-game').css("display", "none");
  $('.gameover').css("display", "none");
  this.score = 0;
};

Game.prototype.removeClasses = function () {
  var dirs = ["up", "down", "left", "right"];

  dirs.forEach(function (cssDir) {
    $(".head-" + cssDir).removeClass("head-" + cssDir);
    $(".tail-" + cssDir).removeClass("tail-" + cssDir);
  });

  $('.body').removeClass('body');
  $('.cake').removeClass('cake');
};
