function isAnagram(str1: string, str2: string): boolean {
  const a: string = str1.toLowerCase().split("").sort().join("");
  const b: string = str2.toLowerCase().split("").sort().join("");

  return a === b;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));    // false