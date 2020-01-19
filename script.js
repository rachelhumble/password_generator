var generate = document.querySelector("#generateBtn");
var copyPassword = document.querySelector("#copyButton");
var resultEl = document.querySelector("#exampleFormControlTextarea1");

var randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  numbers: getRandomNumber,
  symbol: getRandomSymbol
};

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  var symbols = "~!@#$%^&*()+=[]{}?<>";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

generate.addEventListener("click", function(e) {
    e.preventDefault();
    console.log("Begin password generate");
    
    var charLength = prompt("Please enter desired length.");
    if(charLength < 8) {
            alert("Please enter number of characters between 8 and 128");
            var charLength = prompt("Please enter desired length");
        } else if(charLength > 128) {
            alert("Please enter number of characters between 8 and 128");
            var charLength = prompt("Please enter desired length");
        }
    alert("Desired password length: " + charLength);
    console.log("# of Characters: " + charLength);

    var symbol = confirm("Would you like to include special characters?");
      console.log("symbols? " + symbol);
      var hasSymbol = symbol;
    var upper = confirm("Would you like to include uppercase letters?");
      console.log("uppercase letters? " + upper);
      var hasUpper = upper;
    var lower = confirm("Would you like to include lowercase letters?");
      console.log("lowercase letters? " + lower);
      var hasLower = lower;
    var numbers = confirm("Would you like to include numbers?");
      console.log("numbers? " + numbers);
      var hasNumbers = numbers;

    
    
    resultEl.textContent = generatePassword(
      hasLower,
      hasUpper,
      hasNumbers,
      hasSymbol,
      charLength
    )
    

      function generatePassword(lower, upper, numbers, symbol, charLength) {
        let generatedPassword = "";
        const selections = [{ lower }, { upper }, { symbol }, { numbers }].filter
          (
            item => Object.values(item)[0]
          );
        console.log("Selections: ", selections);

        for(i = 0; i < charLength; i++) {
          selections.forEach(type => {
            var funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();  
          })
        }

        console.log("Password: " + generatedPassword.slice(0, charLength));
        var result = generatedPassword.slice(0, charLength);
        return result;
      }
  })



copyPassword.addEventListener("click", function(e) {
  e.preventDefault();
  resultEl.select();
  document.execCommand("Copy");
  alert("Password copied to clipboard!");
})
