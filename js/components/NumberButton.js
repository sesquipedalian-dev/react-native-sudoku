import React, { Component } from 'react'; 
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class NumberButton extends Component { 
    constructor(props) { 
        super(props)
    }

    onPress() { 
        if(this.weAreTheChosenOne) {
            this.props.unGuess(this.props.num);
        } else if (this.userGuessedWeAreNotIt) { 
            this.props.unGuessNot(this.props.num);
            if(!this.thereIsAChosenOne) { 
                this.props.guess(this.props.num);
            }
        } else { 
            this.props.guessNot(this.props.num);
        }
    }

    render() { 
        this.thereIsAChosenOne = this.props.selectedCell.userGuess !== null;
        this.weAreTheChosenOne = this.props.num === this.props.selectedCell.userGuess;
        this.userGuessedWeAreNotIt = this.props.selectedCell.userGuessNots.some((num) => num === this.props.num);

        let textStyle = stylesheet.textNormal;
        if(this.weAreTheChosenOne) { 
            textStyle = stylesheet.textUserGuess;
        } else if (this.userGuessedWeAreNotIt) { 
            textStyle = stylesheet.textUserGuessNot;
        }

        return ( 
            <TouchableOpacity 
                style={stylesheet.container}
                onPress={this.onPress.bind(this)}
            >
                <Text style={textStyle}>{this.props.num}</Text>
            </TouchableOpacity>
        );
    }
}

const textSize = {
    fontSize: 15
};

const container = { 
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#aaaaaa',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '11%'
};

const stylesheet = StyleSheet.create({
    textUserGuess: Object.assign({color: '#00ff00'}, textSize),
    textNormal: Object.assign({color: '#000000'}, textSize), 
    textUserGuessNot: Object.assign({color: '#ff0000'}, textSize),
    container,
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
        selectedCell: potentialSelected
    }
}, mapDispatchToProps)(NumberButton);