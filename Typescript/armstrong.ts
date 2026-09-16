const input: string | null = prompt("Enter a number:");
const n: number = Number(input);

const digits: number = String(n).length;
let temp: number = n;
let sum: number = 0;

while (temp > 0) {
  const digit: number = temp % 10;

  sum += digit ** digits;

  temp = Math.floor(temp / 10);
}

if (sum === n) {
  console.log(`${n} is an Armstrong Number`);
} else {
  console.log(`${n} is not an Armstrong Number`);
}