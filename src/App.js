
import './App.css';
import InputSlider from './InputSlider';

function App() {

  const optionsMinMax = {
    min: 5000,
    max: 5000000,
    steps: 3,
    getNthElement(n) {
      return this.min + n * ((this.max - this.min) / this.steps)
    }
  }

  const optionsValues = {
    values: [5000, 10000, 15000, 20000]
  }

  return (
    <div className="App">
      <p>Вот стока вы патратите на инвистирование))</p>
      <InputSlider options={optionsValues}/>
    </div>
    
  );
}

export default App;
