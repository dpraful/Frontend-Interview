const input = prompt("Enter a word or number:");
const value = String(input);

const reversed = value.split("").reverse().join("");

if (value === reversed) {
  console.log(`${value} is a Palindrome`);
} else {
  console.log(`${value} is not a Palindrome`);
}