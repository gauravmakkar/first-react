import React, {Component} from 'react';
import Routes from './routes'
import './App.css';
import configureStore from './store';
import { Provider } from 'react-redux';
/**
 * Creating a store and passing it to provider
 */
const initState = {};
const store = configureStore(initState);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

export default App;
