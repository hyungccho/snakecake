var Snake = function () {
  this.positions = [[12, 12]];
  this.currentDir = "UP";
};

Snake.prototype.isValidDir = function (dir) {
  if ((this.currentDir === "UP" && dir === "DOWN") ||
      (this.currentDir === "DOWN" && dir === "UP") ||
      (this.currentDir === "LEFT" && dir === "RIGHT") ||
      (this.currentDir === "RIGHT" && dir === "LEFT")) {
        return false;
  } else {
    return true;
  }
};

Snake.prototype.head = function () {
  return this.positions[0];
};

Snake.prototype.move = function (pos) {
  var headRow = this.head()[0];
  var headCol = this.head()[1];
  var newPos = [headRow + pos[0], headCol + pos[1]];

  this.positions.unshift(newPos);
};

Snake.prototype.pop = function () {
  this.positions.pop();
};

Snake.prototype.changeDir = function (dir) {
  if (this.isValidDir(dir)) {
    this.currentDir = dir;
  }
};
