class Bomb {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  boom() {
    for (var i = 0; i < this.x; i++) {
      for (var j = 0; j < this.y; j++) {
        console.log(i)
        console.log(j)
        matrix[i][j] = 0
      }
    }
  }
}
