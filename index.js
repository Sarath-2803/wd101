const email = document.getElementById("email"); 
const form = document.getElementById("form");
const dob = document.getElementById("dob");

email.addEventListener("input", () => emailValid(email));

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const isEmailValid = emailValid(email);
    const isDobValid = dobValidate(dob);

    // If either validation fails, stop form submission
    if (!isEmailValid || !isDobValid) {
        return;
    }

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const terms = document.getElementById("acceptTerms").checked;

    const Entry = {
        name: name,
        email: email.value,
        password: password,
        dob: dob.value,
        terms: terms
    };

    userEntry.push(Entry);

    localStorage.setItem("userEntry", JSON.stringify(userEntry));

    displayData();
});


function emailValid(element) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (element.value.trim() === "") {
        element.setCustomValidity("Email address cannot be empty.");
        element.reportValidity();
        return false;  
    } else if (!emailRegex.test(element.value)) {
        element.setCustomValidity("Please enter a valid email address");
        element.reportValidity(); 
        return false;  
    } else {
        element.setCustomValidity("");
        return true;
    }
}

// DOB validation function
function dobValidate(element) { 
    const today = new Date(); // Current date
    const dobDate = new Date(element.value); // Date of birth from input

    let age = today.getFullYear() - dobDate.getFullYear(); // Calculate age based on year
    const monthDifference = today.getMonth() - dobDate.getMonth(); // Calculate month difference
    const dayDifference = today.getDate() - dobDate.getDate(); // Calculate day difference

    let valid = true;
    if(age <= 18 || age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0))) {
        element.setCustomValidity("You must be older than 18 years old.");
        valid = false;
    };
    if(age >= 55 || age === 55 && (monthDifference > 0 || (monthDifference === 0 && dayDifference > 0))) {
        element.setCustomValidity("You must be younger than 55 years old.");
        valid = false;
    };

    return valid;

    // const age = today.getFullYear() - dobDate.getFullYear(); // Calculate age based on year
    // const monthDifference = today.getMonth() - dobDate.getMonth(); // Calculate month difference
    // const dayDifference = today.getDate() - dobDate.getDate(); // Calculate day difference

    // Check if age is less than or equal to 18
    // if (age <= 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference <= 0)))) {
    //     element.setCustomValidity("You must be older than 18 years old.");
    //     element.reportValidity();
    //     return false;
    // }

    // // Check if age is greater than or equal to 55
    // if (age >= 55 || (age === 55 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)))) {
    //     element.setCustomValidity("You must be younger than 55 years old.");
    //     element.reportValidity();
    //     return false;
    // }

    // // If valid, clear custom validity
    // element.setCustomValidity("");
    // return true;
    // if(age <18 || age > 55) {
    //     element.setCustomValidity("You must be between 18 and 55 years old.");
    //     element.reportValidity();
    //     return false;
    // }   else {
    //     return true;
    // }
}

// Fetch data from localStorage
let userEntry = fetchData();

function fetchData(){
    let data = localStorage.getItem("userEntry");

    if (data) {
        data = JSON.parse(data);
    }
    else {
        data = [];
    }
    return data;
}

// Display data in a table
function displayData() {
    const data = fetchData();

    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    data.forEach(element => {
        const namecell = `<td>${element.name}</td>`;
        const emailcell = `<td>${element.email}</td>`;
        const passwordcell = `<td>${element.password}</td>`;
        const dobcell = `<td>${element.dob}</td>`;
        const termscell = `<td>${element.terms}</td>`;

        const row = `<tr>${namecell}${emailcell}${passwordcell}${dobcell}${termscell}</tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
    });
}

// Display data on page load
displayData();
