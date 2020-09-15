import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './components/Calculator';
import { createStore } from 'redux';
import calculationsReducer from './reducers/calculations';
import { addNewCalculation } from './actions/calculations';
import { Provider } from 'react-redux';



// Create store  and pass our calculationsReducer to it so it knows how to handle actions
const calculationsStore = createStore( calculationsReducer, 
//to use the Redux DevTools, add this argument as well! 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );


  // Just to test if store is getting updated
calculationsStore.subscribe( () => console.log( calculationsStore.getState() ));
/**
 * Redux Dispatch
 * This is what we use to send actions to our store's reducer.
 */
// Dispatch expects a properly formatted action...
// (otherwise your reducer won't know what to do!)
calculationsStore.dispatch( addNewCalculation( "Research Redux" ) );
calculationsStore.dispatch( addNewCalculation( "Review React" ) );


ReactDOM.render(
  <Provider store = {calculationsStore}>
    <Calculator heading="Welcome to Math Buddy"/>
  </Provider>,
  document.getElementById('root')
);

