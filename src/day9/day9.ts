import { inputData, testData } from './input';

function grokInput(data: string) {
  const input = data.split('\n');
  const xmasData = input.map((num) => +num);

  return xmasData;
}

function findInvalidValue(data: number[], preambleLen: number): number {
  let invalidFound = false;
  let currIndex = preambleLen;
  let validValues: number[] = [];

  while (!invalidFound && currIndex < data.length) {
    let preamble = data.slice(currIndex - preambleLen, currIndex);
    let testValue = data[currIndex];

    for (let pre of preamble) {
      if (preamble.includes(testValue - pre)) {
        validValues.push(testValue);
        break;
      }
    }

    if (!validValues.includes(testValue)) {
      invalidFound = true;
      return testValue;
    }
    currIndex++;
  }

  return -1;
}

function findValuesSumToTarget(data: number[], target: number) {
  let weaknessFound = false;
  let currIndex = 0;
  let endIndex = 0;
  let valuesSumToTarget: number[] = [];

  while (!weaknessFound && currIndex < data.length) {
    let valueSum = data[currIndex];
    endIndex = currIndex + 1;
    valuesSumToTarget = [data[currIndex]];

    while (valueSum <= target) {
      if (valueSum === target && valuesSumToTarget.length > 1) {
        weaknessFound = true;
        break;
      }
      valueSum += data[endIndex];
      valuesSumToTarget.push(data[endIndex]);
      endIndex++;
    }
    currIndex++;
  }

  return valuesSumToTarget;
}

function main(data: string, preambleLen: number, part2?: boolean) {
  const xmasData = grokInput(data);
  const invalidValue = findInvalidValue(xmasData, preambleLen);

  if (!part2) {
    return invalidValue;
  } else {
    const values = findValuesSumToTarget(xmasData, invalidValue);
    const encryptionWeakness = Math.max(...values) + Math.min(...values);
    return encryptionWeakness;
  }
}

function logResult(desc: string, data: string, preambleLen: number, part2?: boolean, testValue?: number) {
  const result = main(data, preambleLen, part2);
  if (testValue) {
    return console.log(`${desc} returns -> ${result} -- ${result === testValue ? '\u2713 PASS' : '\u2716 FAIL'} (assertion: ${result} === ${testValue}) \n`);
  } else {
    return console.log(`${desc} solution -> ${result}\n`);
  }
}

logResult('testData', testData, 5, false, 127)
logResult('liveData', inputData, 25)
logResult('testData', testData, 5, true, 62)
logResult('liveData', inputData, 25, true)
