import inputData from './input';

inputData.forEach((value1) => {
  for (let value2 of inputData) {
    if (value1 + value2 < 2020) {
      if (inputData.includes(2020 - (value1 + value2))) {
        console.log(value1, value2, 2020 - (value1 + value2), value1 * value2 * (2020 - (value1 + value2)))
      }
    }
  }
})