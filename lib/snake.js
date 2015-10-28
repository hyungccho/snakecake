var Snake = function () {
  this.positions = [[12, 12], [13, 12]];
  this.dirQueue = ["UP"];
};

Snake.prototype.isValidDir = function (dir) {
  var lastIdx = this.dirQueue.length - 1;
  if ((this.dirQueue[lastIdx] === "UP" && dir === "DOWN") ||
      (this.dirQueue[lastIdx] === "DOWN" && dir === "UP") ||
      (this.dirQueue[lastIdx] === "LEFT" && dir === "RIGHT") ||
      (this.dirQueue[lastIdx] === "RIGHT" && dir === "LEFT")) {
        return false;
  } else {
    return true;
  }
};

Snake.prototype.currentDir = function () {
  var lastIdx = this.dirQueue.length - 1;

  return this.dirQueue[lastIdx];
};

Snake.prototype.head = function () {
  return this.positions[0];
};

Snake.prototype.move = function (pos) {
  var headRow = this.head()[0];
  var headCol = this.head()[1];
  var newPos = [headRow + pos[0], headCol + pos[1]];

  this.positions.unshift(newPos);
  if (this.dirQueue.length > 1) {
    this.dirQueue.shift();
  }
};

Snake.prototype.pop = function () {
  this.positions.pop();
};

Snake.prototype.changeDir = function (dir) {
  if (this.isValidDir(dir)) {
    this.dirQueue.push(dir);
  }
};

Snake.prototype.hitWall = function () {
  var row = this.head()[0], col = this.head()[1];

  return (row < 0 || row > 24 || col < 0 || col > 24);
};

Snake.prototype.hitSelf = function () {
  var collision = this.positions.slice(1).filter(function (pos) {
    return pos[0] === this.head()[0] && pos[1] === this.head()[1];
  }.bind(this));

  return collision.length > 0;
};
