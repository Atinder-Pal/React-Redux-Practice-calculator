import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './components/Calculator';
import { createStore } from 'redux';
import calculationsReducer from './reducers/calculations';
import { Provider } from 'react-redux';
import CalculationsHistory from './components/CalculationsHistory';
import SingleFieldCalculator from './components/SingleFieldCalculator';


// Create store  and pass our calculationsReducer to it so it knows how to handle actions
const calculationsStore = createStore( calculationsReducer, 
//to use the Redux DevTools, add this argument as well! 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );


  // Just to test if store is getting updated
calculationsStore.subscribe( () => console.log( calculationsStore.getState() ));



ReactDOM.render(
   <Provider store = {calculationsStore}>
      {/* <Calculator heading="Welcome to Math Buddy"/>
      <CalculationsHistory /> */}
      <SingleFieldCalculator heading="Welcome to Math Buddy"/>
      <CalculationsHistory />
   </Provider>,  
  document.getElementById('root')
);

