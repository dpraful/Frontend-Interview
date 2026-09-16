const n = Number(prompt("Enter a number:"));

let factorial = 1;

for (let i = 1; i <= n; i++) {
  factorial *= i;
}

console.log(`Factorial of ${n} is ${factorial}`);