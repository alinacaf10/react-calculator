import { useReducer } from "react";
import "./style.css"
import DigitButton from "./DigitButtons";
import OperationButton from "./OperationButton";
export const ACTIONS={
  ADD_DIGIT: 'add_digit',
  CLEAR:'clear',
  CHOOSE_OPERATION:'choose-operation',
  DELETE_DIGIT:'delete_digit',
  EVALUATE: 'evaluate'
}
function reducer(state,{type,payload}){
switch (type) {
  case ACTIONS.ADD_DIGIT:
    return{
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.digit}`
    }
 
}
}
function App() {
  const [{currentOperand, previusOperand, operation},dispatch]=useReducer(reducer,{})
  return (
   <div className="calculator-grid">
    <div className="output">
      <div className="previus-output">{previusOperand} {operation}</div>
      <div className="current-output">{currentOperand}</div>
    </div>
    <button className="span-two">AC</button>
    <button>DEL</button>
    <OperationButton operation="/" dispatch={dispatch}/>
    <DigitButton digit="1" dispatch={dispatch}/>
    <DigitButton digit="2" dispatch={dispatch}/>
    <DigitButton digit="3" dispatch={dispatch}/>
    <OperationButton operation="*" dispatch={dispatch}/>

    <DigitButton digit="4" dispatch={dispatch}/>
    <DigitButton digit="5" dispatch={dispatch}/>
    <DigitButton digit="6" dispatch={dispatch}/>
    <OperationButton operation="+" dispatch={dispatch}/>

    <DigitButton digit="7" dispatch={dispatch}/>
    <DigitButton digit="8" dispatch={dispatch}/>
    <DigitButton digit="9" dispatch={dispatch}/>
    <OperationButton operation="-" dispatch={dispatch}/>

    <DigitButton digit="." dispatch={dispatch}/>
    <DigitButton digit="0" dispatch={dispatch}/>
    <button className="span-two">=</button>
   </div>
  );
}

export default App;
