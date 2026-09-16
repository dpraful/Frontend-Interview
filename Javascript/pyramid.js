const n = Number(prompt("Enter a number:"));

for (let i = 1; i <= n; i++) {
  let pattern = "";

  // Spaces
  for (let j = 1; j <= n - i; j++) {
    pattern += " ";
  }

  // Stars
  for (let j = 1; j <= 2 * i - 1; j++) {
    pattern += "*";
  }

  console.log(pattern);
}

//     *
//    ***
//   *****
//  *******
// *********