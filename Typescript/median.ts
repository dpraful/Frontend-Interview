const arr: number[] = [4, 2, 7, 1, 5];

arr.sort((a: number, b: number) => a - b);

const middle: number = Math.floor(arr.length / 2);

let median: number;

if (arr.length % 2 === 0) {
  median = (arr[middle - 1] + arr[middle]) / 2;
} else {
  median = arr[middle];
}

console.log("Sorted Array:", arr);
console.log("Median:", median);