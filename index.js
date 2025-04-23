const email = document.getElementById("email"); 
const submit = document.getElementById("form");
const dob = document.getElementById("dob");
dob.addEventListener("input", ()=>dobValidate(dob));
email.addEventListener("input", ()=>emailValidate(email));    
submit.addEventListener("submit", (event) => {

    if(emailValid(email) && dobValidate(dob)){
        event.preventDefault();
    console.log("Form submission prevented!");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value
    const terms = document.getElementById("acceptTerms").checked;
    
    const Entry = {
        'name':name,
        'email':email,
        'password':password,
        'dob':dob,
        'terms':terms
    }

    userEntry.push(Entry);

    localStorage.setItem("userEntry", JSON.stringify(userEntry));

    displayData();
}
    }
);

displayData();

function emailValid(element) {
    if (element.validity.typeMismatch) {
        element.setCustomValidity("Please enter a valid email address.");
        element.reportValidity(); 
        return false;  
    }
    else {
        element.setCustomValidity("");
        return true;
    }

}

function dobValidate(element) { 
    const today = new Date(); // Current date
    const dobDate = new Date(element.value); // Date of birth from input

    const age = today.getFullYear() - dobDate.getFullYear(); // Calculate age based on year
    const monthDifference = today.getMonth() - dobDate.getMonth(); // Calculate month difference
    const dayDifference = today.getDate() - dobDate.getDate(); // Calculate day difference

    // Check if age is less than 18
    if (age < 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
        element.setCustomValidity("You must be at least 18 years old.");
        element.reportValidity();
        return false;
    }

    // Check if age is greater than 55
    if (age > 55 || (age === 55 && (monthDifference > 0 || (monthDifference === 0 && dayDifference > 0)))) {
        element.setCustomValidity("You must be younger than 55 years old.");
        element.reportValidity();
        return false;
    }
    else{
    // If valid, clear custom validity
    element.setCustomValidity("");
    return true;
}
}

let userEntry = fetchData();

const form = document.getElementById("form");


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

        const row = `<tr>${namecell} ${emailcell}   ${passwordcell} ${dobcell} ${termscell}</tr>`;

        return row;
    }).join("\n");
    

    const table = `<table><tr><th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>Accepted terms?</th></tr>${tablerow}</table>`;

    const userEntries = document.getElementById("userEntries");
    userEntries.innerHTML = table;
    
}

