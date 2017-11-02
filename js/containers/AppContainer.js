import  React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import QuadrupleValue from '../components/QuadrupleValue';
import GridRow from '../components/GridRow';
import NumberButtons from '../components/NumberButtons';

class AppContainer extends Component { 
    incrementClick(amount) { 
        this.props.increment(amount);
    }

    createPuzzle(amount) { 
        this.props.createPuzzle(this.props.size);
    }

    toggleZoom() { 
        this.props.toggleZoom();
    }

    solvePuzzle() { 
        this.props.solvePuzzle();
    }

    setSize(amt) { 
        console.log("setting size amt? {" + amt + "}");
        this.props.setSize(parseInt(amt, 10));
    }

    render() { 
        const rows = this.props.cells.map((cell) => cell.yPos).filter((i) => i !== undefined)
        const uniqRows = rows.filter((v, i, a) => a.indexOf(v) === i);

        let canSolve = (this.props.cells.length > 0) && this.props.cells.every((cell) => { 
            return cell.revealed || (cell.userGuess !== null);
        });

        let solutionPart;
        if(this.props.solveStatus === true) { 
            solutionPart = <Text style={stylesheets.solveStyleCorrect}>You did it bae!</Text>;
        } else if(this.props.solveStatus === false){ 
            solutionPart = <Text style={stylesheets.solveStyleWrong}>Try again pardner!</Text>;
        }

        return (
            <View>
                <TextInput
                    value={this.props.size.toString()}
                    onChangeText={this.setSize.bind(this)}
                />
                <Button 
                    onPress={this.createPuzzle.bind(this)}
                    title='Make Puzzle'
                />
                <Button
                    onPress={this.toggleZoom.bind(this)}
                    title='Toggle Zoom'
                />
                {uniqRows.map((rowNum) => { 
                    return <GridRow style={{width: '100%'}} row={rowNum} key={rowNum}/>;
                })}
                <NumberButtons/>
                <Button 
                    disabled={!canSolve}
                    onPress={this.solvePuzzle.bind(this)}
                    title='Check solution!'
                />
                {solutionPart}
            </View>
        );
    }
}

const stylesheets = StyleSheet.create({
    solveStyleCorrect: {
        color: '#00ff00'
    },
    solveStyleWrong: {
        color: '#ff0000'
    }
});

function mapDispatchToProps(dispatch) { 
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
    cells: state.cells.cells,
    solveStatus: state.cells.solveStatus,
    size: state.size
}}, mapDispatchToProps)(AppContainer);