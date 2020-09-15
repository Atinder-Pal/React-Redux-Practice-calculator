/**
 *  Redux Reducer to carry out the request to add new calculation to existing Array of Calculation History
 */
const calculationsReducer = (state = [], action ) => {

    switch ( action.type ) {

        case 'ADD_NEW_CALCULATION':
            const newCalculation = {
                calculation: action.payload,
                result: action.result
            }
        //Create copy of original state Array to get previous calculaton History in our new Array
        const newCalculationHistory = [...state];
        // Add new calculation to Calculation History
        newCalculationHistory.push( newCalculation );
        // Return the updated state 
        return newCalculationHistory;

    default:
        return state;
    }
}
export default calculationsReducer;