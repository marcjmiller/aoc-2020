import inputData from './input'

let validPasswords = 0;

inputData.forEach((attempt) => {
  let password = attempt[3].toString();
  let char = attempt[2].toString();
  let position1 = +attempt[0] - 1;
  let position2 = +attempt[1] - 1;

  if (
    (password[position1] === char && password[position2] !== char) ||
    (password[position1] !== char && password[position2] === char)
  ) {
    validPasswords++;
  }
});

console.log(validPasswords);