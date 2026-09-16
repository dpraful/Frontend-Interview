const input: string | null = prompt("Enter a word or number:");
const value: string = String(input);

const reversed: string = value.split("").reverse().join("");

if (value === reversed) {
  console.log(`${value} is a Palindrome`);
} else {
  console.log(`${value} is not a Palindrome`);
}