import { testData, liveData } from './input';

enum ExitCode {
  'EOF' = 0,
  'LOOP' = 1,
  'ERROR' = 2,
}

type Result = {
  operations: number[];
  accumulator: number;
  exitCode: ExitCode;
};

function parseBootCodeToInstructions(bootCode: string) {
  return bootCode.split('\n');
}

function runBootCode(code: string[]): Result {
  let instruction = 0;
  let accumulator = 0;
  let operations: number[] = [];
  let exitCode: ExitCode;

  while (true) {
    if (operations.includes(instruction)) {
      exitCode = ExitCode.LOOP;
      break;
    } else if (instruction >= code.length) {
      exitCode = ExitCode.EOF;
      break;
    }

    const command = code[instruction].slice(0, 3);
    const argument = +code[instruction].slice(4);

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

  let result: Result = { operations, accumulator, exitCode };
  return result;
}

function logResult(result: Result, desc: string, testCond?: number, testExitCode?: ExitCode) {
  console.log(`Completed ${result.operations.length} operations.`);

  if (testCond) {
    console.log(
      `  Accumulator Value should be ${testCond}: ${result.accumulator === testCond ? '\u2713 PASS' : '\u2716 FAIL'}`
    );
  } else {
    console.log(`${desc} accumulator value: ${result.accumulator}`);
  }

  if (testExitCode) {
    console.log(
      `  Exit Code should be ${testExitCode}: ${result.exitCode === testExitCode ? '\u2713 PASS' : '\u2716 FAIL'}`
    );
  } else {
    console.log(`${desc} exit code: ${result.exitCode}`);
  }
  console.log('\n');
}

function swapInstruction(instruction: string) {
  if (instruction.includes('nop')) {
    return instruction.replace('nop', 'jmp');
  } else {
    return instruction.replace('jmp', 'nop');
  }
}

function fixBootCode(code: string[]): Result {
  const possibleChanges: [number, string][] = [];

  code.map((line, index) => {
    (line.includes('nop') || line.includes('jmp')) && possibleChanges.push([index, line]);
  });

  let result = runBootCode(code);
  for (let change of possibleChanges) {
    let newCode = Array.from(code);

    newCode[change[0]] = swapInstruction(newCode[change[0]])

    result = runBootCode(newCode);
    if (result.exitCode === ExitCode.EOF) {
      break;
    }
  }

  return result;
}

function main(bootCode: string, part2?: boolean) {
  const bootInstructions = parseBootCodeToInstructions(bootCode);
  const result = part2 ? fixBootCode(bootInstructions) : runBootCode(bootInstructions);

  return result;
}

logResult(main(testData), 'testData part 1', 5, ExitCode.LOOP);

logResult(main(liveData), 'liveData part 1', undefined, ExitCode.LOOP);

logResult(main(testData, true), 'testData part 2', 8, ExitCode.EOF);

logResult(main(liveData, true), 'liveData part 2', undefined, ExitCode.EOF)
