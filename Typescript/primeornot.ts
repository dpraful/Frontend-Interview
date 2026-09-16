const input: string | null = prompt("Enter a number:");
const n: number = Number(input);

let isPrime: boolean = true;

if (n < 2) {
  isPrime = false;
} else {
  for (let i: number = 2; i < n; i++) {
    if (n % i === 0) {
      isPrime = false;
      break;
    }
  }
}

if (isPrime) {
  console.log(`${n} is a Prime Number`);
} else {
  console.log(`${n} is not a Prime Number`);
}