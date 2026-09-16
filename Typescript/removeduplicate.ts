let arr: number[] = [1, 2, 2, 3, 4, 4, 5];

let result: number[] = [];

for (let i: number = 0; i < arr.length; i++) {
  if (!result.includes(arr[i])) {
    result.push(arr[i]);
  }
}

console.log(result);
// [1, 2, 3, 4, 5]