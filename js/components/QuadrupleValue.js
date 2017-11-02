import React, { Component } from 'react'; 
import { View, Text } from 'react-native'; 
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

class QuadrupleValue extends Component { 
    render() { 
        return (
            <View>
                <Text>QuadCount: {this.props.quadValue}</Text>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) { 
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { return {
    quadValue: state.value * 4
}}, mapDispatchToProps)(QuadrupleValue);