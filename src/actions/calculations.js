

/**
  * Adding Action to add new calculation done by user to Array containing calculation History of user 
  * Passing parameters: newcalculation Object which contains newInput1, newoperation, newInput2 and result 
 */
const addNewCalculation = (newCalculation) => {
    return {
        type: 'ADD_NEW_CALCULATION',
        payload: newCalculation
    };
}

export { addNewCalculation };