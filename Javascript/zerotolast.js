let a = [1, 2, 0, 0, 4, 3, 5];

let index = 0;

for (let i = 0; i < a.length; i++) {
  if (a[i] !== 0) {
    [a[index], a[i]] = [a[i], a[index]];
    index++;
  }
}

console.log(a);
// [1, 2, 4, 3, 5, 0, 0]