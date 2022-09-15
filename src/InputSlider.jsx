import inputSliderStyles from './InputSlider.module.css'
import { useState, useRef, useEffect } from 'react'

const InputSlider = ({ options }) => {

  let { min, steps, values, getNthElement } = options

  if (values) {
    steps = values.length - 1
    getNthElement = idx => values[idx]
  } else {
    getNthElement = getNthElement.bind(options)
  }

  const inputRef = useRef(null)
  const caretPos = useRef(null)

  const [amount, setAmount] = useState(min ?? values[0])
  const [sliderValue, setSliderValue] = useState(0)
  const [hasValidated, setHasValidated] = useState(false)

  useEffect(() => {
    if (hasValidated) {
      inputRef.current.selectionStart = caretPos.current - 1
      inputRef.current.selectionEnd = caretPos.current - 1
      setHasValidated(false)
    }
  }, [hasValidated])

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
    const values = Array(steps + 1).fill().map((_, idx) => getNthElement(idx))
    const closestValue = values.reduce((prev, curr) => Math.abs(curr - amountNumeric) < Math.abs(prev - amountNumeric) ? curr : prev)
    const step = values.findIndex((value) => {
      return value === closestValue
    })
    setSliderValue(step)
    setSliderProgressBar(step)
  }

  const setSliderProgressBar = (step) => {
    const slider = document.querySelector(`.${inputSliderStyles.slider}`)
    const progress = ((step / steps) * 100)
    slider.style.setProperty("--progress", `${progress.toFixed(4)}%`)
  }

  const onSliderChange = (e) => {
    const step = Number(e.target.value)
    setSliderValue(step)
    setAmount(getNthElement(step))
    setSliderProgressBar(step)
  }
  return (
    <>
      <input ref={inputRef} value={amount + "₽"} type="text" onChange={onInputChange} onKeyDown={onKeyDown} className={inputSliderStyles.input}></input>
      <input type="range" min="0" max={steps} value={sliderValue} onChange={onSliderChange} className={inputSliderStyles.slider}></input>
    </>
  )
}

export default InputSlider