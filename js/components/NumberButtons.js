import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import NumberButton from './NumberButton';

class NumberButtons extends Component { 
    render() { 
        if(this.props.selectedCell === null) { 
            return null;
        }

        let numbers = [];
        for(var i = 1; i <= this.props.puzzleSize; i++) { 
            numbers.push(<NumberButton key={i} num={i}/>);
        }

        return (
            <View style={stylesheet.container}>
                {numbers}
            </View>
        );
    }
}

const stylesheet = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        width: '100%',
    }
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
    selectedCell: potentialSelected,
    puzzleSize: state.size
}}, mapDispatchToProps)(NumberButtons);