import * as types from './types';

export function increment(amount) { 
    return {
        type: types.INCREMENT,
        amount: amount
    };
}

import GridCellData from '../lib/GridCellData';
import Unit from '../lib/Unit';
import Puzzle from '../lib/Puzzle';

export function createPuzzle(size) { 
    const puzzle = new Puzzle(size);
    puzzle.populate();

    let id = 0;
    const cellsHash = {};
    const cells = puzzle.squares.map(s => { 
        const result = new GridCellData(s.xPos, s.yPos, s.id, s.value, s.revealed);
        cellsHash[s.id] = result;
        return result;
    })
    let unitId = 0;
    const units = puzzle.units.map(unit => { 
        const cells = unit.map(cellId => cellsHash[cellId]);
        return new Unit(unitId++, cells);
    });

    return {
        type: types.CREATE_PUZZLE,
        cells: cells,
        units: units,
        size: 4
    };  
}

export function toggleZoom() { 
    return { type: types.ZOOM }
}

export function selectCell(currentSelected, cellId) { 
    let newTarget = cellId;
    if(currentSelected === cellId) { 
        newTarget = null;
    } else { 
        newTarget = cellId;
    }
    return { 
        type: types.SELECT_CELL,
        selectedCell: newTarget
    }
}

export function guess(num) { 
    return { 
        type: types.GUESS,
        num: num
    }
}

export function unGuess() { 
    return { 
        type: types.UN_GUESS
    }
}

export function guessNot(num) { 
    return { 
        type: types.GUESS_NOT, 
        num: num
    }
}

export function unGuessNot(num) { 
    return { 
        type: types.UN_GUESS_NOT, 
        num: num
    }
}

export function solvePuzzle() { 
    return {
        type: types.SOLVE_PUZZLE
    }
}

export function setSize(size) { 
    return { 
        type: types.SET_SIZE,
        size: size
    }
}