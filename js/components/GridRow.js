import React, { Component } from 'react'; 
import GridCell from './GridCell'; 
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class GridRow extends Component { 
    compareCol(cell1, cell2) { 
        cell1.xPos < cell2.xPos;
    }
    
    render() {
        const row = this.props.row;
        const units = this.props.units.filter((u) => u.cells.some(cell => cell.yPos === row));
        units.sort(this.compareCol.bind(this));
        // console.log("cells? {" + row + "}{" + units + "}{" + units[0].cells + "}");
        return (
            <View style={stylesheet.container}>
                {/* <Text>Row {row}</Text> */}
                {units[0].cells.map((c) => { 
                    return (
                        <GridCell cellId={c.id} key={c.id}/>
                    );
                })}
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

export default connect((state) => { return {
    cells: state.cells.cells,
    units: state.units
}}, mapDispatchToProps)(GridRow);