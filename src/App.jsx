/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './App.css'
import Display from './components/Display';
import Key from './components/Key';

const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const operators = ["AC", "/", "x", "+", "-", ".", "="];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorPattern = /[+\-*/]/;

const Keypad = ({handleInput}) => {
  return(
    <div className="keypad">
      {calcData.map((key) => (
        <Key key={key.id} keyData={key} handleInput={handleInput} />
      ))}
    </div>
  )
}

function App() {
  const [input, setInput] = useState('0')
  const [output, setOutput] = useState('')
  const [calculatorData, setCalculatorData] = useState('')

  const handleSubmit = () => {
    console.log({ calculatorData })
    const total = eval(calculatorData);
    setInput(total)
    setOutput(`${total}`)
    setCalculatorData(`${total}`)
  }

  const handleClear = () => {
    setInput('0')
    setCalculatorData('')
  }

  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`)
      setCalculatorData(`${value}`)
    } else if(value === 0 && (calculatorData === "0" || input === '0')){
      setCalculatorData(`${calculatorData}`)
    } else {
      setInput(`${calculatorData}${value}`)
      setCalculatorData(`${calculatorData}${value}`)
    }
  }

  const handleDecimal = () => {
    
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } if (calculatorData.length) {
      const parts = calculatorData.split(operatorPattern);
      if (parts[parts.length - 1].includes(".")) {
        return
      }
      setInput(`${calculatorData}`)
      setCalculatorData(`${calculatorData}.`)
    }
  }

  const handleOperators = (value) => {
    const validOp = value === "x" ? "*" : value;
    
    if (calculatorData.length) {
      setInput(`${value}`)

      if (value !== "-" && operatorPattern.test(value)) {
        const lastChar = calculatorData[calculatorData.length - 1] || "";
        const secondLastChar = calculatorData[calculatorData.length - 2] || "";
        if (operatorPattern.test(lastChar)) {
          if (lastChar === "-" && operatorPattern.test(secondLastChar)) {
            setCalculatorData(`${calculatorData.slice(0, -2)}${value}`)
          }
          setCalculatorData(`${calculatorData.slice(0, -1)}${value}`)
        }
      }
      setCalculatorData(`${calculatorData}${value}`)
      
      if (validOp) {
        setInput(`${input}${validOp}`)
        setCalculatorData(`${input}${validOp}`)
      }
    }
  }

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit()
        break;
      case "AC":
        handleClear()
        break;
      case number:
        handleNumbers(value)
        break;
      case ".":
        handleDecimal()
        break;
      case operator:
        handleOperators(value)
        break;
      default:
        break;
    }
  } 

  const handleOutput = () => {
    setOutput(calculatorData)
  }

  useEffect(() => {
    handleOutput()
  },[calculatorData])

  return (
    <>
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keypad handleInput={handleInput} />
      </div>
    </div>
    </>
  )
}

export default App
