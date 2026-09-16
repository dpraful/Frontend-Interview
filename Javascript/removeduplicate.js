let arr = [1, 2, 2, 3, 4, 4, 5];

let result = [];

for (let i = 0; i < arr.length; i++) {
  if (!result.includes(arr[i])) {
    result.push(arr[i]);
  }
}

console.log(result);
// [1, 2, 3, 4, 5]