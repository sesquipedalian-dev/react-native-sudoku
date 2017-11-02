import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const value = createReducer(0, {
    [types.INCREMENT](state, action) { 
        return state + action.amount;
    }
});

export const value2 = createReducer(0, { 
    [types.INCREMENT](state, action) { 
        return state + (action.amount * 2);
    }
})

export const size = createReducer(9, { 
    [types.CREATE_PUZZLE](state, action) { 
        return action.size;
    },
    [types.SET_SIZE](state, action) { 
        return action.size;
    }
})

export const units = createReducer([], { 
    [types.CREATE_PUZZLE](state, action) { 
        return action.units;
    }
})

export const cells = createReducer({cells: [], solveStatus: null}, { 
    [types.CREATE_PUZZLE](state, action) { 
        return {
            cells: action.cells, 
            solveStatus: null
        };
    },
    [types.SELECT_CELL](state, action) { 
        return {
            cells: state.cells.map(cell => { 
                if(action.selectedCell !== cell.id) { 
                    return cell.unSelect();
                } else {
                    return cell.select();
                }
            }),
            solveStatus: state.solveStatus
        };
    },
    [types.GUESS](state, action) { 
        return {
            cells: state.cells.map(cell => { 
                if(cell.selected) { 
                    return cell.guess(action.num);
                } else { 
                    return cell;
                }
            }),
            solveStatus: state.solveStatus
        };
    },
    [types.UN_GUESS](state, action) { 
        return {
            cells: state.cells.map(cell => { 
                if(cell.selected) { 
                    return cell.unGuess(action.num);
                } else { 
                    return cell;
                }
            }),
            solveStatus: state.solveStatus
        };
    },
    [types.GUESS_NOT](state, action) { 
        return {
            cells: state.cells.map(cell => { 
                if(cell.selected) { 
                    return cell.guessNot(action.num);
                } else { 
                    return cell;
                }
            }),
            solveStatus: state.solveStatus
        };
    },
    [types.UN_GUESS_NOT](state, action) { 
        return {
            cells: state.cells.map(cell => { 
                if(cell.selected) { 
                    return cell.unGuessNot(action.num);
                } else { 
                    return cell;
                }
            }),
            solveStatus: state.solveStatus
        };
    },
    [types.SOLVE_PUZZLE](state, action) { 
        const canSolve = (state.cells.length > 0) && state.cells.every((cell) => { 
            return cell.revealed || (cell.userGuess !== null);
        });
        console.log("reducing SOLVE_PUZZLE {" + canSolve + "}");
        let solveStatus = null;
        if(canSolve) { 
            solveStatus = state.cells.every((cell) => cell.revealed || (cell.userGuess == cell.value));
        }
        return { 
            cells: state.cells, 
            solveStatus
        };
    }
})

export const zoom = createReducer(false, { 
    [types.ZOOM](state, action) { 
        return !state;
    }
})