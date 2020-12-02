import inputData from './input'

let validPasswords = 0;

inputData.forEach((attempt) => {
  let password = attempt[3].toString();
  let char = attempt[2].toString();
  let minChars = +attempt[0];
  let maxChars = +attempt[1];

  if (password.split("").includes(char)) {
    let numChars = password.split(char).length -1;

    if (minChars <= numChars && numChars <= maxChars) {
      console.log(attempt, numChars);
      validPasswords++;
    }
  }
});

console.log(validPasswords);