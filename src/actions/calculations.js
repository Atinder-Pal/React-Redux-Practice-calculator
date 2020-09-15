

/**
  * Adding Action to add new calculation done by user to Array containing calculation History of user 
  * Passing parameters: First param: Object newInputs- containing newInput1, newOperator, newInput2 and second param: newResult
 */
const addNewCalculation = (newCalculation) => {
    return {
        type: 'ADD_NEW_CALCULATION',
        payload: newCalculation
    };
}

export default addNewCalculation;