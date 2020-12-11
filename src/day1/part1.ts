import inputData from './input';

for (let value1 of inputData) {
  if (inputData.includes(2020 - value1)) {
    console.log(value1 * (2020 - value1));
    break;
  }
}
