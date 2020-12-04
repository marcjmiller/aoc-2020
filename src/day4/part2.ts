import inputData from './input';

let validPassports = 0;

const byrRegex = /byr:([0-9]{4})/i;
const iyrRegex = /iyr:([0-9]{4})/i;
const eyrRegex = /eyr:([0-9]{4})/i;
const hgtRegex = /hgt:([0-9]{2,3}(?:cm|in))/i;
const hclRegex = /hcl:(#[0-9a-f]{6})/i;
const eclRegex = /ecl:(amb|blu|brn|gry|grn|hzl|oth)/i;
const pidRegex = /pid:([0-9]{9})\b/i;

function validByr(byr: number) {
  return 1920 <= byr && byr <= 2002;
}

function validIyr(iyr: number) {
  return 2010 <= iyr && iyr <= 2020;
}

function validEyr(eyr: number) {
  return 2020 <= eyr && eyr <= 2030;
}

function validEcl(ecl: string) {
  return !!ecl;
}

function validHcl(hcl: string) {
  return !!hcl;
}

function validPid(pid: string) {
  return !!pid;
}

function validHgt(hgt: string) {
  if (hgt?.slice(-2) === 'cm') {
    return 150 <= +hgt.substring(0, hgt.length - 2) && +hgt.substring(0, hgt.length - 2) <= 193;
  } else if (hgt?.slice(-2) === 'in') {
    return 59 <= +hgt.substring(0, hgt.length - 2) && +hgt.substring(0, hgt.length - 2) <= 76;
  }
  return false;
}

function grokPassport(passport: string) {
  const byr = +byrRegex.exec(passport)!?.[1];
  const iyr = +iyrRegex.exec(passport)!?.[1];
  const eyr = +eyrRegex.exec(passport)!?.[1];
  const hgt = hgtRegex.exec(passport)!?.[1];
  const hcl = hclRegex.exec(passport)!?.[1];
  const ecl = eclRegex.exec(passport)!?.[1];
  const pid = pidRegex.exec(passport)!?.[1];

  return { byr, iyr, eyr, hgt, hcl, ecl, pid };
}

function checkValid(passport: string) {
  let isValid = true;
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = grokPassport(passport);

  if (!byr || !validByr(byr)) {
    isValid = false;
  }

  if (!iyr || !validIyr(iyr)) {
    isValid = false;
  }

  if (!eyr || !validEyr(eyr)) {
    isValid = false;
  }

  if (!hgt || !validHgt(hgt)) {
    isValid = false;
  }

  if (!hcl || !validHcl(hcl)) {
    isValid = false;
  }

  if (!ecl || !validEcl(ecl)) {
    isValid = false;
  }

  if (!pid || !validPid(pid)) {
    isValid = false;
  }

  return isValid;
}

inputData.forEach((passport) => {
  const passportLength = passport.split(' ').length;
  if (passportLength >= 7) {
    if (checkValid(passport)) {
      validPassports++;
    }
  }
});

console.log(validPassports);
