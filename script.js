function createMatrix(matrixWidth, matrixLenght) {
    var mat = []
    for (let i = 0; i < matrixLenght; i++) {
        mat.push([])
        for (let j = 0; j < matrixWidth; j++) {
            mat[i].push(0)
        }
    }
    return mat
}

function fillMatrix(matrix, character, count, filled) {
    var cellsCount = matrix.length * matrix[0].length
    var coef = count / cellsCount
    for (let i = 0; i < matrixLenght; i++) {
        for (let j = 0; j < matrixWidth; j++) {
            if (matrix[i][j] === 0 && Math.random() < coef) {
                matrix[i][j] = character
                filled++
            }
            if (filled === count) {
                return;
            }
        }
    }
    if (filled < count) {
        fillMatrix(matrix, character, count, filled)
    }
}

var matrixLenght = 60
var matrixWidth = 60

var matrix = createMatrix(matrixWidth, matrixLenght)
fillMatrix(matrix, 1, 200, 0)
fillMatrix(matrix, 2, 30, 0)
fillMatrix(matrix, 3, 25, 0)
fillMatrix(matrix, 4, 1, 0)
var side = 10;
var grassArr = [];
var grassEaterArr = [];
var cornivoreArr = [];
var fireArr = [];
function setup() {
    frameRate(35);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j <= matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                var gr = new Grass(j, i, 1)
                grassArr.push(gr)
            } else if (matrix[i][j] === 2) {
                var grEater = new GrassEater(j, i, 2)
                grassEaterArr.push(grEater)
            } else if (matrix[i][j] === 3) {
                var cornivore = new Cornivore(j, i, 3);
                cornivoreArr.push(cornivore)
            }
            else if (matrix[i][j] === 4) {
                var fire = new Fire(j, i, 4);
                fireArr.push(fire)
            }
        }


    }
}

var isBombed = false;

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("orange");
            }

            rect(x * side, y * side, side, side);

            // fill("blue")
            // text(x + " " + y, x * side + side / 2, y * side + side / 2)
        }
    }

    for (var i in grassArr) {

        grassArr[i].mul()
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
    }
    for (var i in cornivoreArr) {
        cornivoreArr[i].move();
    }
    for (var i in fireArr) {
        fireArr[i].move();
    }

    if(isBombed === true) {
        fill('red')
        textSize(30)
        text("BOOM💥", width / 2 - 50, height / 2)
    }
}
function mousePressed() {
    let newBomb
    newBomb = new Bomb(matrixWidth, matrixLenght)
    newBomb.boom()
    isBombed = true;
    console.log("BOOM")
    noLoop();

}
