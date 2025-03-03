function showSignup() {
  document.getElementById("signup-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}

function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("signup-form").style.display = "none";
}

function validatePassword() {
  const password = document.getElementById("signup-password").value;

  const minLength = /^(?=.{8,})/;
  const number = /\d/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const letters = /[a-zA-Z]/;

  const lengthRule = document.getElementById("length-rule");
  const numberRule = document.getElementById("number-rule");
  const specialCharRule = document.getElementById("special-char-rule");
  const letterRule = document.getElementById("letter-rule");

  const isLengthValid = minLength.test(password);
  const isNumberValid = number.test(password);
  const isSpecialCharValid = specialChar.test(password);
  const isLetterValid = letters.test(password);

  if (isLengthValid) {
    lengthRule.classList.add("valid");
  } else {
    lengthRule.classList.remove("valid");
  }

  if (isNumberValid) {
    numberRule.classList.add("valid");
  } else {
    numberRule.classList.remove("valid");
  }

  if (isSpecialCharValid) {
    specialCharRule.classList.add("valid");
  } else {
    specialCharRule.classList.remove("valid");
  }

  if (isLetterValid) {
    letterRule.classList.add("valid");
  } else {
    letterRule.classList.remove("valid");
  }

  const signupButton = document.getElementById("signup-button");
  if (isLengthValid && isNumberValid && isSpecialCharValid && isLetterValid) {
    signupButton.disabled = false;
  } else {
    signupButton.disabled = true;
  }
}

function signup(event) {
  event.preventDefault();

  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((user) => user.username === username)) {
    alert("Username already exists!");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Please login.");
  showLogin();
}

function login(event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    alert("Login successful!");

    window.location.href = "index.html";
  } else {
    alert("Invalid username or password.");
  }
}

showSignup();

document
  .getElementById("signup-password")
  .addEventListener("input", validatePassword);
