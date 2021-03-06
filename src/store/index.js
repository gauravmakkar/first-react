/**
 * Created by gaurav.m on 3/31/17.
 */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './../reducers';
import socketMiddleware from './../middleware/socket';
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            socketMiddleware
        )
    )
}