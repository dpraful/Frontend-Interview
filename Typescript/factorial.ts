const input = prompt("Enter a number:");
const n: number = Number(input);

let factorial: number = 1;

for (let i: number = 1; i <= n; i++) {
  factorial *= i;
}

console.log(`Factorial of ${n} is ${factorial}`);