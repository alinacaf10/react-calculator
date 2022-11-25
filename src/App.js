import { useReducer } from "react";
import "./style.css"
import DigitButton from "./DigitButtons";
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
    <DigitButton digit="÷" dispatch={dispatch}/>
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>*</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>+</button>
    <button>7</button>
    <button>8</button>
    <button>9</button>
    <button>-</button>
    <button>.</button>
    <button>0</button>
    <button className="span-two">=</button>
   </div>
  );
}

export default App;
