import React, { Component } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import GuessNotCell from './GuessNotCell';

// meant to be found within a flow layout
// cellId - the ID of the cell
// cells - the collection of Cell data 
class GridCell extends Component { 
    selectCell() { 
        const id = this.props.cellId;
        const cell = this.props.cells.find((el) => el.id == id);

        if(!cell.revealed) { 
            const selectedId = this.props.selectedCell === null ? null : this.props.selectedCell.id
            this.props.selectCell(selectedId, this.props.cellId);
        }
    }

    render() { 
        const thisIsSelectedCell = (this.props.selectedCell !== null) && (this.props.selectedCell.id === this.props.cellId)
        let containerStyle = this.props.zoom ? 
            (thisIsSelectedCell ? stylesheets.containerSelectedZoom    : stylesheets.containerZoom   ) :
            (thisIsSelectedCell ? stylesheets.containerSelectedNonZoom : stylesheets.containerNonZoom) ;
        const id = this.props.cellId;
        const cell = this.props.cells.find((el) => el.id == id);
        if(cell !== undefined) { 
            let textStyle = stylesheets.textNone;
            let text = ' ';

            if(cell.revealed) { 
                textStyle = this.props.zoom ? stylesheets.textRevealedZoom : stylesheets.textRevealedNonZoom;
                text = cell.value;
            } else if (cell.userGuess !== undefined) { 
                textStyle = this.props.zoom ? stylesheets.textUserZoom : stylesheets.textUserZoom;
                text = cell.userGuess; 
            } 

            const guesses = [];
            for(let i = 1; i <= this.props.puzzleSize; i++) { 
                const guessed = cell.userGuessNots.some((guess) => guess == i);
                if(i != text) {
                    guesses.push(<GuessNotCell key={i} num={i} guessed={guessed}/>);
                }
            }

            return (
                <TouchableOpacity style={containerStyle} onPress={this.selectCell.bind(this)}>
                    <View style={stylesheets.guessesContainer}>
                        {guesses}
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={textStyle}>{text}</Text>
                    </View>
                </TouchableOpacity>
            );
        } else { 
            return (
                <View style={containerStyle}>
                    <Text>?</Text>
                </View>
            );
        }
    }
}

const container = { 
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#aaaaaa',
    aspectRatio: 1,
    flexDirection: 'column'
};

const zoom = { 
    width: '20%'
};

const notZoom = { 
    width: '10%'
};

const textRevealed = { 
    color: '#000000',
    width: '100%'
};

const textUser = { 
    color: '#00ff00',
    width: '100%'
};

const selectedContainer = { 
    // backgroundColor: '#00ff00'
    borderColor: '#00ff00'
};

const guessesContainer = { 
    flexDirection: 'row',
}

const stylesheets = StyleSheet.create({
    containerZoom: Object.assign({}, container, zoom), 
    containerNonZoom: Object.assign({}, container, notZoom),
    containerSelectedZoom: Object.assign({}, container, zoom, selectedContainer), 
    containerSelectedNonZoom: Object.assign({}, container, notZoom, selectedContainer),
    textRevealedZoom: Object.assign({fontSize: 30}, textRevealed),
    textRevealedNonZoom: Object.assign({fontSize: 15}, textRevealed),
    textUserZoom: Object.assign({fontSize: 30}, textUser),
    textUserNonZoom: Object.assign({fontSize: 15}, textUser), 
    textNone: { 
    },
    guessesContainer: guessesContainer
});

function mapDispatchToProps(dispatch) { 
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    let potentialSelected = state.cells.cells.filter((cell) => cell.selected)[0];
    if(potentialSelected === undefined) { 
        potentialSelected = null;
    }

    return {
    cells: state.cells.cells,
    zoom: state.zoom,
    selectedCell: potentialSelected,
    puzzleSize: state.size
}}, mapDispatchToProps)(GridCell);