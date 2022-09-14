import './Slider.css'

const Slider = ({ steps, setAmount, sliderValue, setSliderValue, func }) => {
  const onSliderChange = (e) => {
    setSliderValue(e.target.value)
    setAmount(func(Number(e.target.value)))
  }
  return (
    <input type="range" min="0" max={steps} value={sliderValue} onChange={onSliderChange}></input>
  )
}

export default Slider