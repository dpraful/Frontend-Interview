const arr = [4, 2, 7, 1, 5];

arr.sort((a, b) => a - b);

const middle = Math.floor(arr.length / 2);

let median;

if (arr.length % 2 === 0) {
  median = (arr[middle - 1] + arr[middle]) / 2;
} else {
  median = arr[middle];
}

console.log("Sorted Array:", arr);
console.log("Median:", median);