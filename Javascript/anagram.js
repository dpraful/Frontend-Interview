const str1 = prompt("Enter first string:");
const str2 = prompt("Enter second string:");

const a = str1.toLowerCase().split("").sort().join("");
const b = str2.toLowerCase().split("").sort().join("");

if (a === b) {
  console.log("Anagram");
} else {
  console.log("Not Anagram");
}