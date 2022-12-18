import synthReducer from './synthReducer';

import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    synth: synthReducer
})

export default rootReducer