import { testData, liveData } from './input';

function parseBootCodeToInstructions(bootCode: string) {
  return bootCode.split('\n');
}

function runBootCode(code: string[]) {
  let instruction = 0;
  let accumulator = 0;
  let operations: number[] = [];

  while (true) {
    const command = code[instruction].slice(0, 3);
    const argument = +code[instruction].slice(4);

    if (operations.includes(instruction)) {
      break;
    }

    // console.log(`performing ${command} with arg ${argument}`);
    operations.push(instruction);

    switch (command) {
      case 'acc':
        accumulator += argument;
        instruction++;
        break;
      case 'jmp':
        instruction += argument;
        break;
      default:
        instruction++;
    }
  }

  const result: [number[], number] = [operations, accumulator];
  return result;
}

function logResult(result: number, desc: string, testCond?: number) {
  console.log(`${desc} accumulator value: ${result}`);

  if (testCond) {
    console.log(`  ${result === testCond ? '\u2713 PASS' : '\u2716 FAIL'}`);
  }
  console.log('\n');
}

function main(bootCode: string) {
  const bootInstructions = parseBootCodeToInstructions(bootCode);
  const result = runBootCode(bootInstructions);

  return result[1];
}

logResult(main(testData), 'testData', 5);

logResult(main(liveData), 'liveData');
