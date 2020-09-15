import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { addNewCalculation } from '../actions/calculations';
// import './reset.css';
// import './SingleFieldCalculator.css';


//Function to validate input
//More advanced feature to include in future:https://stackoverflow.com/questions/2808184/restricting-input-to-textbox-allowing-only-numbers-and-decimal-point
//For now just refrenced some website to learn about regex, but did my own coding
//https://codeburst.io/javascript-learn-regular-expressions-for-beginners-bb6107015d91
//https://stackoverflow.com/questions/41980425/regex-to-allow-only-numbers-and-decimals-not-working-in-javascript
function validateInput( s )
{
    s = s.split(' ').join('');
    if(s.match(/^-?\d+(\.\d+)?(\+|-|\*|\/)-?\d+(\.\d+)?$/))
    return true;
    else
    return false;      
}
//End citation


//Function to split single expression into array of individual operands & operator
// Citation
// https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
// Although I knew split() method will help to split the string but I was not sure how to make a function for multiple separatore. This function can be used for any number and any new separators. Just need to change tokens array for different set of separators. Also manipulated it so separators become part of output array
function getIndividualInputs( inputString )
{
    let firstNumberIsNegative= false;
    let secondNumberIsNegative =false;
    let finalInput= '';
    //Remove whitespaces from the input expression
    inputString = inputString.split(' ').join('');
    
    firstNumberIsNegative = inputString.match(/^-\d+/);
    secondNumberIsNegative= inputString.match(/(\+|-|\*|\/)-\d+(\.\d+)?$/);
    
    
    if(firstNumberIsNegative && secondNumberIsNegative)
    {
        const inputString1 = inputString.replace('-', '');
        const indexLast = inputString1.lastIndexOf('-');
        const inputString2 = inputString1.replace(inputString1[indexLast], '');
        finalInput = inputString2;
    }

    else if(firstNumberIsNegative)
    {
        finalInput = inputString.replace('-', '');
        console.log("first number is negative");
    }
    else if(secondNumberIsNegative)
    {
        const indexLast = inputString.lastIndexOf('-');
        console.log(indexLast);
        finalInput = inputString.replace(inputString[indexLast], '');
        console.log(  finalInput);
    }

    else
    {
        finalInput = inputString;
    }


    //Declare all the separators for split()
    const tokens = ['+', '-', '*', '/'];    
    
    for(let i = 0; i < tokens.length; i++){
        finalInput = finalInput.split(tokens[i]).join(','+ tokens[i]+ ',');
    }

    finalInput = finalInput.split(',');
    if(firstNumberIsNegative)
    {
        finalInput[0] = -(finalInput[0]);
        console.log(finalInput);
    }    
    if(secondNumberIsNegative)
    {
        finalInput[2] = -(finalInput[2]);
        console.log(finalInput);
    }    

    return finalInput;    
     
}   
// End Citation

function mathCalculation( expression )
{   //Assigning values to 3 variables from Array in one shot
    const [operand1,op,operand2] = getIndividualInputs(expression);        
    
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);    
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

function SingleFieldCalculator(props)
{
    //update state of input expression using useState()
    const [newExpression, setNewExpression] = useState( '' );

    //update state of result variable using useState()
    const [newResult, setNewResult] = useState( '' );

    

    //Defining Function for "onSubmit" form event
    const doCalculation = ( e ) => {
        e.preventDefault();
        let result= 0;

        if(validateInput( newExpression ))
        {
            result = mathCalculation( newExpression );
            setNewResult(result);
            props.dispatch( addNewCalculation(newExpression, result));
            //Clear the input field 
            setNewExpression( '' );
            
        }
        else{
            alert("invalid operation: Format expected: operand1 operator operand2");
        }            
    }
 

    return ( 
        <>
            <h1>{props.heading}</h1>
            <form onSubmit = {doCalculation}>
                <label htmlFor='inputs'>Enter your operation: </label><br/>
                <input type='text' id='inputs' value={newExpression} onChange={e => {setNewExpression( e.target.value )} } /><br />
               
                <input type= 'submit' id='calculate'value='Calculate'/>
                <p>
                    <strong> Result: {newResult}</strong>
                </p>                
            </form>
        </>        
     );
}

export default connect( myStore => { return { calculations: myStore }}) (SingleFieldCalculator);