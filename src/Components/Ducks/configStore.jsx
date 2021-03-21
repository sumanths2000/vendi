import user from './userReducer';
import {createStore,combineReducers} from 'redux'

const reducer=combineReducers({
    user:user
})

const store=createStore(reducer);

export default store;