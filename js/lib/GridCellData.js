import Cell from './Cell.js'; 

export default class GridCellData extends Cell { 
    constructor(xPos, yPos, id, value, revealed = false, userGuess = null, userGuessNots = [], selected = false) { 
        super(id, value, revealed, userGuess, userGuessNots, selected);
        this.xPos = xPos; 
        this.yPos = yPos;
    }
}