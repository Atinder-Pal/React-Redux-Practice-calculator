import React from 'react';
import { connect } from 'react-redux';


function CalculationsHistory ( props )
{
  return (
    <>
      <h2>Calculations History</h2>
      <ul>
        {props.calculations.map( ( calculation, index ) => {
          return (
            <li key={index}>
              {/* {calculation.inputs.newInput1 + " "+ calculation.inputs.newOperation + " " + calculation.inputs.newInput2 + "  = " + calculation.result } */}
             {calculation.inputs.split("").join(" ")+ "  = " + calculation.result}
            </li>
          );}
        )}
      </ul>
    </>
  );
}

// Use connect to make our "To-Do list" available via props.toDos.
export default connect( myStore => ( { calculations: myStore } ) )( CalculationsHistory );