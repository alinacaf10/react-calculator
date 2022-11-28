import { useReducer } from "react";
import "./style.css";
import DigitButton from "./DigitButtons";
import OperationButton from "./OperationButton";
export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  DELETE_DIGIT: "delete_digit",
  EVALUATE: "evaluate",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
      return{
        ...state,
        currentOperand:payload.digit,
        overwrite:false
      }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previusOperand == null) {
        return state;
      }
      if (state.currentOperand==null) {
        return{
        ...state,
        operation: payload.operation,
      }}
      if (state.previusOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previusOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previusOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
      case ACTIONS.DELETE_DIGIT:
      if(state.currentOperand== null){
        return state
      }
      if(state.currentOperand.length===1){
        return{
          ...state,
          currentOperand:null
        }
      }
      return{
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
      
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.EVALUATE:
      if(state.operation==null||state.currentOperand==null||state.previusOperand==null){
        return state
      }
      return{
        ...state,
        overwrite:true,
        previusOperand:null,
        operation:null,
        currentOperand:evaluate(state)
      }
  }
}
function evaluate({ currentOperand, previusOperand, operation }) {
  const prev = parseFloat(previusOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString()
}
function App() {
  const [{ currentOperand, previusOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previus-output">
          {previusOperand} {operation}
        </div>
        <div className="current-output">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />

      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two"  onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
