class Cornivore {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.index = index;
        this.directions = [];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= 0 && x >= 0 && y < matrix.length && x < matrix[0].length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    move() {
        var eaten = this.eat();
        if (eaten) {
            this.energy+=2;
            if (this.energy >= 10) {
                this.mul()
            }
        } else {
            this.energy--;
            if (this.energy === 0) {
                this.die()
                return
            }

            var newCell = random(this.chooseCell(0))
            if (newCell) {
                matrix[this.y][this.x] = 0;
                this.x = newCell[0];
                this.y = newCell[1];
                matrix[this.y][this.x] = 3;
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in cornivoreArr) {
            if (this.x == cornivoreArr[i].x && this.y == cornivoreArr[i].y) {
                cornivoreArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newcornivore = new Cornivore(newCell[0], newCell[1], 3);
            cornivoreArr.push(newcornivore);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy -= 5;
        }
    }

    eat() {
        var grEater = random(this.chooseCell(2));

        if (!grEater) {
            return false;
        }

        matrix[this.y][this.x] = 0;
        this.x = grEater[0]
        this.y = grEater[1]
        matrix[this.y][this.x] = 3;

        for (var i in grassEaterArr) {
            if (grEater[0] == grassEaterArr[i].x && grEater[1] == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }

        return true;
    }
}
