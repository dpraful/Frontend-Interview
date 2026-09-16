let arr: number[] = [5, 2, 8, 1, 3];

arr.sort((a: number, b: number) => a - b);

console.log(arr);
// [1, 2, 3, 5, 8]

let arr: number[] = [5, 2, 8, 1, 3];

arr.sort((a, b) => b - a);

console.log(arr);
// [8, 5, 3, 2, 1]