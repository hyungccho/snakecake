var Cake = function () {
  this.pos = null;
  this.resetCake();
  this.cakeCount = 0;
};

Cake.prototype.resetCake = function () {
  var row = Math.floor(Math.random() * 23);
  var col = Math.floor(Math.random() * 23);

  this.pos = [row, col];
};
