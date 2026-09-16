// 1. യൂസറിൽ നിന്ന് നമ്പർ വാങ്ങുന്നു
let input = prompt("ഒരു നമ്പർ നൽകുക:");
let num = parseInt(input);

function checkPrime(number) {
    // 1-ലും താഴെയുള്ള സംഖ്യകൾ പ്രൈം അല്ല
    if (number <= 1) {
        console.log(number + " പ്രൈം നമ്പർ അല്ല.");
        return;
    }

    // 2 മുതൽ നമ്പറിന് തൊട്ടുതാഴെ വരെയുള്ള സംഖ്യകൾ പരിശോധിക്കുന്നു
    for (let i = 2; i < number; i++) {
        // ഏതെങ്കിലും സംഖ്യ കൊണ്ട് പൂർണ്ണമായി ഹരിക്കാൻ കഴിഞ്ഞാൽ
        if (number % i === 0) {
            console.log(number + " പ്രൈം നമ്പർ അല്ല.");
            return; // ഫംഗ്ഷൻ ഇവിടെ വെച്ച് നിർത്തുന്നു
        }
    }

    // ലൂപ്പിലെ ഒരക്കം കൊണ്ടും ഹരിക്കാൻ കഴിഞ്ഞില്ലെങ്കിൽ അതൊരു പ്രൈം നമ്പറാണ്!
    console.log(number + " ഒരു പ്രൈം നമ്പർ ആണ്!");
}

if (!isNaN(num)) {
    checkPrime(num);
}
