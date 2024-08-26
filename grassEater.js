class GrassEater {
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
        if(eaten) {
            this.energy++;
            if(this.energy === 10) {
                this.mul()
            }
        } else{
            this.energy--;
            if(this.energy === 0) {
                this.die()
                return
            }

            var newCell = random(this.chooseCell(0))
            if(newCell) {
                matrix[this.y][this.x] = 0;
                this.x = newCell[0];
                this.y = newCell[1];
                matrix[this.y][this.x] = 2;
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));

        if(newCell){
            var newGrEater = new GrassEater(newCell[0], newCell[1], 2);
            grassEaterArr.push(newGrEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy -= 5;
        }
    }

    eat() {
        var grass = random(this.chooseCell(1));

        if(!grass) {
            return false;
        }

        matrix[this.y][this.x] = 0;
        this.x = grass[0]
        this.y = grass[1]
        matrix[this.y][this.x] = 2;

        for (var i in grassArr) {
            if (grass[0] == grassArr[i].x && grass[1] == grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }

        return true;
    }
}
