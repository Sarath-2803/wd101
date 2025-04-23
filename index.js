const email = document.getElementById("email"); 
const form = document.getElementById("form");
const dob = document.getElementById("dob");

dob.addEventListener("input", () => dobValidate(dob));
email.addEventListener("input", () => emailValid(email));

form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    
    const isEmailValid = emailValid(email);
    const isDobValid = dobValidate(dob);

    if (!isEmailValid || !isDobValid) {
        return;
    }

    const name = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dobValue = document.getElementById("dob").value;
    const terms = document.getElementById("acceptTerms").checked;

    const Entry = {
        name: name,
        email: emailValue,
        password: password,
        dob: dobValue,
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
        element.setCustomValidity("Please enter a valid email address (e.g., user@domain.com).");
        element.reportValidity(); 
        return false;  
    } else {
        element.setCustomValidity("");
        return true;
    }
}

function dobValidate(element) { 
    const today = new Date(); 
    const dobDate = new Date(element.value); 

    const age = today.getFullYear() - dobDate.getFullYear(); 
    const monthDifference = today.getMonth() - dobDate.getMonth(); 
    const dayDifference = today.getDate() - dobDate.getDate(); 

    if (age < 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
        element.setCustomValidity("You must be at least 18 years old.");
        element.reportValidity();
        return false;
    }

    if (age > 55 || (age === 55 && (monthDifference > 0 || (monthDifference === 0 && dayDifference > 0)))) {
        element.setCustomValidity("You must be younger than 55 years old.");
        element.reportValidity();
        return false;
    } else {
        element.setCustomValidity("");
        return true;
    }
}

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

function displayData() {
    const data = fetchData();

    const tablerow = data.map(element => {
        const namecell= `<td>${element.name}</td>`;
        const emailcell= `<td>${element.email}</td>`;
        const passwordcell= `<td>${element.password}</td>`;
        const dobcell= `<td>${element.dob}</td>`;
        const termscell= `<td>${element.terms}</td>`;

        const row = `<tr>${namecell} ${emailcell} ${passwordcell} ${dobcell} ${termscell}</tr>`;

        return row;
    }).join("\n");

    const table = `<table><tr><th>Name</th><th>Email</th><th>Password</th><th>DOB</th><th>Accepted Terms?</th></tr>${tablerow}</table>`;

    const userEntries = document.getElementById("userEntries");
    userEntries.innerHTML = table;
}

displayData();

