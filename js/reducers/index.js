import { combineReducers } from 'redux';
import * as recipesReducer from './recipes';
import * as types from '../actions/types';

const simpleReducers = combineReducers(Object.assign(
    recipesReducer,
));

export default simpleReducers;