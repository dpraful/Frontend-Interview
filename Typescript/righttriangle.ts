const input: string | null = prompt("Enter a number:");
const n: number = Number(input);

for (let i: number = 1; i <= n; i++) {
  let row: string = "";

  for (let j: number = 1; j <= i; j++) {
    row += "*";
  }

  console.log(row);
}
// *
// **
// ***
// ****
// *****