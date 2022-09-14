import { useState, useRef, useEffect } from 'react'
import './App.css';
import Slider from './Slider';

function App() {

  const min = 5000
  const max = 5000000
  const steps = 3

  const inputRef = useRef(null)
  const caretPos = useRef(null)

  const [amount, setAmount] = useState(min)
  const [sliderValue, setSliderValue] = useState(0)
  const [hasValidated, setHasValidated] = useState(false)

  useEffect(() => {
    if (hasValidated) {
      inputRef.current.selectionStart = caretPos.current - 1
      inputRef.current.selectionEnd = caretPos.current - 1
      setHasValidated(false)
    }
  }, [hasValidated])

  const getNthElementLinear = (index) => {
    return min + index * ((max - min) / steps)
  }

  const onKeyDown = (e) => {
    if (e.key === "Backspace") {
      if (e.target.selectionStart === e.target.value.length) {
        e.target.selectionStart = e.target.selectionStart - 1
        e.target.selectionEnd = e.target.selectionEnd - 1 
      }
    } 
  }

  const validateInput = (event) => {
    caretPos.current = event.target.selectionStart
    let validatedInput = event.target.value.replace(/\D/g, '')
    validatedInput = validatedInput.replace(/\b0+/g, '')
    if (validatedInput.length === event.target.value.length - 2) {
      setHasValidated(true)
    }
    return validatedInput
  }

  const onInputChange = (e) => {
    let amount = validateInput(e)
    setAmount(+amount || 0)

    let amountNumeric = Number(amount)
    const values = Array(steps + 1).fill().map((_, idx) => getNthElementLinear(idx))
    const closestValue = values.reduce((prev, curr) => Math.abs(curr - amountNumeric) < Math.abs(prev - amountNumeric) ? curr : prev)
    setSliderValue(values.findIndex((value) => {
      return value === closestValue
    }))
  }



  return (
    <div className="App">
      <p>Вот стока вы патратите на инвистирование))</p>
      <input ref={inputRef} value={amount + "₽"} type="text" onChange={onInputChange} onKeyDown={onKeyDown}></input>
      <Slider steps={steps} setAmount={setAmount} sliderValue={sliderValue} setSliderValue={setSliderValue} func={getNthElementLinear}></Slider>
    </div>
    
  );
}

export default App;
