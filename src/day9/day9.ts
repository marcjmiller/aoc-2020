import { inputData, testData } from './input';

function grokInput(data: string) {
  const input = data.split('\n');
  const xmasData = input.map(num => +num);

  return xmasData;
}

function findInvalidData(data: number[], preambleLen: number): number {
  let invalidFound = false;
  let currIndex = preambleLen;
  let validValues: number[] = [];

  while (!invalidFound && currIndex < data.length) {
    let preamble = data.slice(currIndex - preambleLen, currIndex);
    let testValue = data[currIndex];

    for (let pre of preamble) {
      if (preamble.includes(testValue - pre)) {
        validValues.push(testValue)
        // console.log(`found match ${testValue - pre} in ${preamble} for ${testValue}`)
        break;
      }
    }

    if (!validValues.includes(testValue)) {
      invalidFound = true;
      return testValue
    }
    currIndex++
  }

  return -1
}

function main(data: string, preambleLen: number) {
  const xmasData = grokInput(data);
  const result = findInvalidData(xmasData, preambleLen);
  
  return result;
}

// for test data, 127 is the expected result
const testDataResult = main(testData, 5);
console.log(`TestData  returns -> ${testDataResult} -- ${testDataResult === 127 ? '\u2713 PASS' : '\u2716 FAIL'}`);

const inputDataResult = main(inputData, 25);
console.log(`LiveData returns ${inputDataResult}`)