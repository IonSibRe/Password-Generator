// DOM Elements
const result = document.querySelector(".result");
const length = document.querySelector("#length_input");
const form = document.querySelector("form");
const checkboxes = document.querySelectorAll(".input[type=checkbox]");

// Generator functions
// lowercase chars
const lowercaseFunc = (len) => {
    let lowerCharsStr = "";
    for (let i = 0; i < len; i++) {
        lowerCharsStr += String.fromCharCode(
            Math.floor(Math.random() * (122 - 97) + 97)
        );
    }
    return lowerCharsStr;
};

// Uppercase chars
const uppercaseFunc = (len) => {
    let upperCharsStr = "";
    for (let i = 0; i < len; i++) {
        upperCharsStr += String.fromCharCode(
            Math.floor(Math.random() * (90 - 65) + 65)
        );
    }
    return upperCharsStr;
};

// Numbers
const numFunc = (len) => {
    let numStr = "";
    for (let i = 0; i < len; i++) {
        numStr += Math.floor(Math.random() * 10).toString();
    }
    return numStr;
};

// Symbols
const symbolFunc = (len) => {
    const special_chars = "!#$%&*+-/=?^_{}~";
    let specialCharsStr = "";
    for (let i = 0; i < len; i++) {
        specialCharsStr +=
            special_chars[Math.floor(Math.random() * special_chars.length)];
    }
    return specialCharsStr;
};

// Function object
const objectFunc = {
    lowercase: lowercaseFunc,
    uppercase: uppercaseFunc,
    numbers: numFunc,
    symbols: symbolFunc,
};

// Generate Password
form.addEventListener("submit", (e) => {
    // Prevent default submit
    e.preventDefault();

    // Check for length input type
    if (isNaN(length.value)) {
        alert("Please enter a number");
        return;
    }

    // Check for limit values
    if (length.value < 1) {
        length.value = 1;
    } else if (length.value > 16) {
        length.value = 16;
    }

    // Get all checked checkboxes
    const checked = [];
    checkboxes.forEach((box) => {
        if (box.checked) {
            checked.push(box.id.substr(0, box.id.indexOf("_")));
        }
    });

    // Check for all checkboxes unchecked
    if (checked.length === 0) {
        alert("Please select at least one checkbox");
    }

    let finalPassword = "";

    // For each checked box add return value of the specific function to finalPassword
    checked.forEach((element) => {
        const keys = Object.keys(objectFunc);
        keys.forEach((key) => {
            if (element === key) {
                finalPassword += objectFunc[element](length.value);
            }
        });
    });

    // Shuffle and slice the final password
    finalPassword = finalPassword
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("")
        .slice(0, length.value);

    // Add finalPassword to DOM
    result.textContent = finalPassword;
});

// Copy to Clipboard
const copyButton = document.querySelector(".copy-button");
copyButton.addEventListener("click", () => {
    const copyText = document.querySelector(".result");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
});
