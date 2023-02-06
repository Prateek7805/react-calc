import { useReducer } from "react"
import Button from "./components/button";

export const ACTIONS = {
  ADD_NUM: 'add_num',
  ADD_OP: 'add_op',
  DEL_NUM: 'del_num',
  CLEAR: 'clear',
  EVALUATE: 'evaluate'
}

const INT_FORMATTER = Intl.NumberFormat("en-in", {
  maximumFractionDigits : 0,
});

function formatNumber(num){
  if(num == null) return;
  const [i, d] = num.split('.');
  if(d == null){
    return INT_FORMATTER.format(i);
  }
  return `${INT_FORMATTER.format(i)}.${d}`;
}
function evaluate({result, equation, operation}){
  const curr = parseFloat(result);
  const prev = parseFloat(equation);
  const op = operation;

  if(isNaN(curr) || isNaN(prev)){
    return "";
  }
  
  var output = "";
  switch(op){
    case '+':
      output = prev + curr;
      break; 
    case '-':
      output = prev - curr;
      break;
    case '*':
      output = prev * curr;
      break;
    case '÷':
      output = prev / curr;
      break;
  }
  if(isNaN(output)){
    return "";
  }
  return output.toString();
}
function reducer(state, { type, payload }) {
  var result = state.result || "";
  var equation = state.equation || "";
  switch (type) {
    case ACTIONS.ADD_NUM: {
      if(state.computed){
        result = "";
      }
      if ((result === "0") && payload.digit === "0") {
        return state;
      }
      if (payload.digit === "." && result.includes(".")) {
        return state;
      }
      
      if(payload.digit === "." && (result === "" || result === "0")){
        result = "0.";
      }else if(result === "0" || result === ""){
        result = payload.digit;
      }else{
        result = result + payload.digit;
      }
      return {
        ...state,
        result: result,
        computed : false
      }
    }
    case ACTIONS.CLEAR: {
      return {}
    }
    case ACTIONS.DEL_NUM: {
      if(state.computed){
        return {
          ...state,
          computed : false,
          result : null
        }
      }
      if(result === ""){
        return state;
      }
      return {
        ...state,
        result: state.result.slice(0,-1)
      }
    }
    case ACTIONS.ADD_OP:{
      if(result === "" && equation === ""){
        return state;
      }
      if(equation === ""){
        return {
          ...state,
          result : null,
          equation : result,
          operation : payload.digit
        }
      }
      if(result === ""){
        return {
          ...state,
          operation : payload.digit
        }
      }
      return {
        ...state,
        result : null,
        equation : evaluate(state),
        operation : payload.digit
      }
    }
    case ACTIONS.EVALUATE:{
      if(result !== "" && equation !== ""){
        
        return {
          ...state,
          result : evaluate(state),
          equation : null,
          operation : null,
          computed : true
        }
      }
      if(result === ""){
        return {
          ...state,
          result : equation,
          equation : null,
          operation : null,
          computed : true
        }
      }
      return {
        ...state,
        operation : null,
        computed : true
      }
    }
    default:
      return state;
  }
}
function App() {
  var buttonArr = [
    {
      value: 'AC',
      className: 'btn-AC',
      action: ACTIONS.CLEAR
    },
    {
      value: 'DEL',
      className: 'btn-DEL',
      action: ACTIONS.DEL_NUM
    },
    {
      value: '÷',
      className: 'btn-op',
      action: ACTIONS.ADD_OP
    },
    {
      value: '*',
      className: 'btn-op',
      action: ACTIONS.ADD_OP
    },
    {
      value: '7',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },
    {
      value: '8',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },
    {
      value: '9',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },
    {
      value: '-',
      className: 'btn-op',
      action: ACTIONS.ADD_OP
    },
    {
      value: '4',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },
    {
      value: '5',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },
    {
      value: '6',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },
    {
      value: '+',
      className: 'btn-op btn-rs2',
      action: ACTIONS.ADD_OP
    },
    {
      value: '1',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },
    {
      value: '2',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },
    {
      value: '3',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },

    {
      value: '0',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },
    {
      value: '.',
      className: 'btn-num',
      action: ACTIONS.ADD_NUM
    },
    {
      value: '=',
      className: 'btn-res btn-cs2',
      action: ACTIONS.EVALUATE
    },
  ]

  const [{ result, equation, operation }, dispatch] = useReducer(reducer, {});
  return (
    <>
    <div className="calc-grid">
      <div className="result-screen">
        <div className="equation">{formatNumber(equation)}&nbsp;{operation}</div>
        <div className="result">{formatNumber(result)}</div>
      </div>
      {
        buttonArr.map(btn => (
          <Button className={btn.className} dispatch={dispatch} action={btn.action} value={btn.value} />
        )
        )
      }
    </div>
    <div className="footer">
      <p>Made with ❣️ by prateek7805</p>
    </div>
    </>
  );
}

export default App;