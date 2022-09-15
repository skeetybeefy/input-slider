# InputSlider

InputSlider is a component which combines numerical input with an input of type range (slider).

Slider has a finite amount of possible values. You can set them 2 ways:

## #1. Values array

```javascript
<InputSlider options={
  values: [50, 100, 150, 200]
}>
```

## #2. Min, max, steps and a function to get Nth element

```javascript
<InputSlider options={
  min: 50,
  max: 200,
  steps: 3,
  getNthElement(n) {
    return this.min + n * ((this.max - this.min) / this.steps)
  }
}>
```

