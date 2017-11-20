import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(logger, thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter hashType="noslash">
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();