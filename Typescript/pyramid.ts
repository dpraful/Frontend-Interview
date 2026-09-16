const input: string | null = prompt("Enter a number:");
const n: number = Number(input);

for (let i: number = 1; i <= n; i++) {
  let pattern: string = "";

  // Spaces
  for (let j: number = 1; j <= n - i; j++) {
    pattern += " ";
  }

  // Stars
  for (let j: number = 1; j <= 2 * i - 1; j++) {
    pattern += "*";
  }

  console.log(pattern);
}
//     *
//    ***
//   *****
//  *******
// *********