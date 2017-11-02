import React, { Component } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class GuessNotCell extends Component { 
    render() { 
        const on = this.props.guessed;
        const text = on ? this.props.num : '';
        const textStyle = this.props.zoom ? stylesheets.textZoom : stylesheets.textNotZoom;
        return (
            <Text style={textStyle}>{text}</Text>
        );
    }
}

const textStyle = { 
    width: '10%', 
    color: '#ff0000'
};

const zoom = {
    fontSize: 12
};

const notZoom = { 
    fontSize: 6
};

const stylesheets = StyleSheet.create({
    textZoom: Object.assign({}, textStyle, zoom),
    textNotZoom: Object.assign({}, textStyle, notZoom)
});

function mapDispatchToProps(dispatch) { 
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return { 
      zoom: state.zoom
    }
}, mapDispatchToProps)(GuessNotCell);