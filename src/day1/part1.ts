import inputData from './input';

inputData.forEach((value1) => {
  if (inputData.includes(2020 - value1)) {
    console.log(value1, 2020 - value1, value1 * (2020 - value1));
  }
})
