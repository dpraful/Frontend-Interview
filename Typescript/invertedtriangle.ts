const input: string | null = prompt("Enter a number:");
const n: number = Number(input);

for (let i: number = n; i >= 1; i--) {
  let pattern: string = "";

  for (let j: number = 1; j <= i; j++) {
    pattern += "*";
  }

  console.log(pattern);
}

// *****
// ****
// ***
// **
// *