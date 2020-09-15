

/**
  * Adding Action to add new calculation done by user to Array containing calculation History of user 
  * Passing parameters: newcalculation Object which contains newInput1, newoperation, newInput2 and result 
 */
const addNewCalculation = (newInputs, result) => {
    return {
        type: 'ADD_NEW_CALCULATION',
        result: result,
        payload: newInputs
    };
}

export { addNewCalculation };