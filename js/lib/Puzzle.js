export default class Puzzle { 
    validate() { 
        for(var squareI in this.squares) { 
            const square = this.squares[squareI];
            const thisSquareUnits = this.unitsHash[square.xPos][square.yPos];
            for(var unit in thisSquareUnits) { 
                console.log("the unit {" + JSON.stringify(unit) + "}");
                for(var checkSquare in unit) { 
                    console.log("thing1 {" + checkSquare + "}{" + checkSquare.xPos + "}");
                    if((checkSquare.xPos === square.xPos) && (checkSquare.yPos === square.yPos) ){

                    } else { 
                        console.log("validating...");
                        console.log("found a problem here ?{" + checkSquare + "}{" + checkSquare.value + "}{" + square + "}{" + square.value + "}");
                        if(checkSquare.value !== null && checkSquare.value === square.value) {
                            console.log("found a problem here {" + checkSquare + "}{" + checkSquare.value + "}{" + square + "}{" + square.value + "}");
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    populate() { 
        let done = false;
        let remainingUniqueInts = Array(this.size).fill().map((x, i) => i + 1);
        let cellCount = 0;

        while(remainingUniqueInts.length > 1 || cellCount < (this.size * this.size / 4)) { 
            let randomIndex = 0;
            do { 
                randomIndex = Math.floor(Math.random() * (this.size * this.size));
                console.log("getting random index {" + randomIndex + "}");
                console.log("{" + this.squares + "}");
                console.log("{" + this.squares[randomIndex] + "}");
            } while(this.squares[randomIndex].value !== null) 

            const randomInt = Math.floor(Math.random() * this.size) + 1;
            this.squares[randomIndex].value = randomInt;
            const valid = this.validate(); 
            if(!valid) { 
                // if we hit a contradiction, reset everything and try again
                console.log("not valid!");
                for(var squareI in this.squares) { 
                    const square = this.squares[squareI];
                    square.value = null;
                }
                this.populate();
                return;
            }

            remainingUniqueInts = remainingUniqueInts.filter((i) => i != randomInt);
            cellCount++;
            console.log("remaining to do {" + remainingUniqueInts + "}{" + cellCount + "}");
        }
    }

    shuffle(array) {
        var i = 0
          , j = 0
          , temp = null
      
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
      

    constructor(size) { 
        this.size = size;

        // get all the indices in x and y that we'll use 
        const rows = Array(size).fill().map((e, i) => i + 1);
        const cols = Array(size).fill().map((e, i) => i + 1);

        // populate the squares in the puzzle
        this.squares = [];
        this.squaresHash = {};
        var idVar = 0;
        for(var row in rows) { 
            console.log("row {" + row + "}");
            for(var col in cols) { 
                const newSquare = {xPos: row, yPos: col, id: idVar++, value: null, revealed: true};
                this.squares.push(newSquare);
                if(typeof this.squaresHash.xPos === 'undefined') { 
                    this.squaresHash[row] = {};
                }
                console.log("setting squares hash {" + row + "}{" + col + "}{" + newSquare + "}");
                this.squaresHash[row][col] = newSquare;
                console.log("ba ba bah {" + this.squaresHash[row][col].value + "}");
            }
        }
        console.log("rows / cols {" + this.squares.length + "}{" + this.squares.map((obj) => obj.xPos + '/' + obj.yPos));

        this.units = [];
        this.unitsHash = {};
        // populate the peer units in rows
        for(var row in rows) { 
            const thisUnitSquares = this.squares.filter(square => square.yPos === row);
            this.units.push(thisUnitSquares.map(s => s.id));
            thisUnitSquares.forEach(square => { 
                if(typeof this.unitsHash[square.xPos] === 'undefined') { 
                    this.unitsHash[square.xPos] = {};
                }
                this.unitsHash[square.xPos][square.yPos] = [thisUnitSquares.map(s => s.id)];
            })
        }

        // populate the peer units in columns
        for(var col in cols) { 
            const thisUnitSquares = this.squares.filter(square => square.xPos == col)
            this.units.push(thisUnitSquares.map(s => s.id));
            thisUnitSquares.forEach(square => { 
                if(typeof this.unitsHash[square.xPos] === 'undefined') { 
                    this.unitsHash[square.xPos] = {};
                }
                if(typeof this.unitsHash[square.xPos][square.yPos] === 'undefined') { 
                    this.unitsHash[square.xPos][square.yPos] = [thisUnitSquares.map(s => s.id)];
                } else { 
                    this.unitsHash[square.xPos][square.yPos].push(thisUnitSquares.map(s => s.id));
                }
            })
        }

        // populate the peer units in boxes, if the puzzle is a square number size
        const sqrt = Math.sqrt(size);
        const roundSqrt = Math.floor(sqrt);
        if(sqrt === roundSqrt) { 
            for(var i = 0; i < sqrt; i++) { 
                for(var j = 0; j < sqrt; j++) { 
                    const validSquares = [];
                    for(var squareI in this.squares) { 
                        const square = this.squares[squareI];
                        const isInX = Math.floor(square.xPos / sqrt) == i;
                        const isInY = Math.floor(square.yPos / sqrt) == j;
                        console.log("checking square in group {" + square + "}{" + square.xPos + "/" + square.yPos + "}{" + isInX + "}{" + isInX + "}");
                        if(isInX && isInY) { 
                            validSquares.push(square);
                        }
                    }
                    console.log("creating square groups {" + i + "}{" + j + "}{" + validSquares + "}");
                    this.units.push(validSquares.map(s => s.id));
                    validSquares.forEach(square => { 
                        if(typeof this.unitsHash[square.xPos] === 'undefined') { 
                            this.unitsHash[square.xPos] = {};
                        }
                        if(typeof this.unitsHash[square.xPos][square.yPos] === 'undefined') { 
                            this.unitsHash[square.xPos][square.yPos] = [validSquares.map(s => s.id)];
                        } else { 
                            this.unitsHash[square.xPos][square.yPos].push(validSquares.map(s => s.id));
                        }
                    })
                }
            }
        }

        console.log("done initial population of puzzle! {" + this.units + "}{" + this.unitsHash + "}{" + this.squares + "}{" + this.squaresHash + "}");
    }
}