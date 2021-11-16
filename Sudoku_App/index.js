/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { DataLayer } from "./reducers/datalayer";
import reducer, {initialState} from "./reducers/reducer"
// import * as serviceWorker from './serviceWorker';


  
const App_run = () => {
    return (

    <DataLayer initialState={initialState} reducer={reducer}>
    <App />
    </DataLayer>
  
);
}

AppRegistry.registerComponent(appName, () => App_run);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();