const input = prompt("Enter a number:");
const n = Number(input);

const digits = String(n).length;
let temp = n;
let sum = 0;

while (temp > 0) {
  const digit = temp % 10;
  sum += digit ** digits;
  temp = Math.floor(temp / 10);
}

if (sum === n) {
  console.log(`${n} is an Armstrong Number`);
} else {
  console.log(`${n} is not an Armstrong Number`);
}