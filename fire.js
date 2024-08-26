class Fire{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 70;
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
    this.energy-10
            
        if(eaten){  
            if(this.energy>=15){
                this.mul()
                
            }
        }
       else{
           this.energy--
            if(this.energy === 0) {
                this.die()
                return
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in fireArr) {
            if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
                fireArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));

        if(newCell){
            var newFire = new Fire(newCell[0], newCell[1], 4);
            fireArr.push(newFire);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy -= 10;
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
        matrix[this.y][this.x] = 4;

        for (var i in grassArr) {
            if (grass[0] == grassArr[i].x && grass[1] == grassArr[i].y) {
                grassArr.splice(i, 1);
              
                return true
            }
            
        }
           
       
    
        
    }
    
    
    }