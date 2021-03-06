import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addNewCalculation } from '../actions/calculations';
// import './reset.css';


function mathCalculation( num1,num2, op )
{
    
    let num3 =0.0;    
    switch ( op )
{
        case '+':
            num3 = num1 + num2;           
        break;

        case '-':         
            num3 = num1 - num2;        
        break;

        case '*':         
            num3 = num1 * num2;       
        break;

        case '/':
            num3 = num1 / num2;
        break;

        default:         
            num3 = 0;     
        break;
    }
    
    return num3;
    
}

function Calculator( props )
{
    //Set up for state of inputs
    const [newInputs, setNewInputs] = useState( {newInput1: '',newInput2:'', newOperation:'+'});
    const updateInput1 = e =>{
        setNewInputs({newInput1: parseFloat(e.target.value),newInput2: newInputs.newInput2, newOperation: newInputs.newOperation});
    }
    const updateInput2 = e =>{
        setNewInputs({newInput1: newInputs.newInput1,newInput2: parseFloat(e.target.value), newOperation: newInputs.newOperation});
    }
    const updateOperation = e =>{
        setNewInputs({newInput1: newInputs.newInput1,newInput2: newInputs.newInput2, newOperation: e.target.value});
    }
    
    const [result, setNewResult] = useState( 0 );    
    let newResult = 0;
    // useEffect( () =>{
    //     setNewResult(mathCalculation(newInputs.newInput1, newInputs.newInput2, newInputs.newOperation));
    // }, [newInputs]
    //  )
      
    //Defining Function for "onSubmit" form event
    const doCalculation = ( e ) => {
        e.preventDefault();        
        newResult = (mathCalculation(newInputs.newInput1, newInputs.newInput2, newInputs.newOperation));
        setNewResult( newResult );
        //adding action to add calculation performed to our store
        props.dispatch( addNewCalculation( newInputs, newResult) );
                
        //Clear the input fields
        setNewInputs(  {newInput1: '',newInput2: '', newOperation: newInputs.newOperation} );        
    }
    
    

    return(
        <>
            <h1>{props.heading}</h1>
            <form onSubmit={doCalculation}>
                <div>
                <label htmlFor='input1'>Input 1 </label><br />
                <input type='number' id='input1' value={newInputs.newInput1} placeholder= 'Operand 1' onChange= {updateInput1} /><br />
                                
                <label htmlFor="operation"> Operator </label> <br />
                    <select  id="operation" onChange= {updateOperation}>
                        <option value="+"> &nbsp;&nbsp; + </option>
                        <option value="-">&nbsp;&nbsp;&nbsp; - </option>
                        <option value="*">&nbsp;&nbsp;&nbsp; * </option>
                        <option value="/">&nbsp;&nbsp;&nbsp; / </option>
                    </select>
                <br />
            
                <label htmlFor='input2'>Input 2 </label><br />
                <input type='number' id='input2' value={newInputs.newInput2} placeholder= 'Operand 2' onChange= {updateInput2}/> 
                </div>
                                   
                <br /><br />

                <input type= 'submit' id='calculate'value='Result'/>
                <p >
                    <strong> Result: {result} </strong>
                </p>
                
            </form>
        </>
    );
    
}

export default connect( myStore => { return { calculations: myStore }}) ( Calculator );