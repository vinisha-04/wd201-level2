
let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntry = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTermsAndConditions}</td>`;

      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table border = 2px ><tr>
    <th>Name</th>
    <th>Email Address</th>
    <th>Password</th>
    <th>Dob</th>
    <th>Accepted terms?</th>
    </tr>${tableEntries} </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUser = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dobElement = document.getElementById("dob");
  const dob = dobElement.value;
  const acceptTermsAndConditions = document.getElementById("terms").checked;

  // Validate age between 18 and 55
  const today = new Date();
  const dobDate = new Date(dob);
  const age = today.getFullYear() - dobDate.getFullYear();
  const isAgeValid = age >= 18 && age <= 55;

  if (!isAgeValid) {
    alert("Please enter a valid date of birth between ages 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };

  userEntry.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntry));
  displayEntries();
};

userForm.addEventListener("submit", saveUser);
displayEntries();
