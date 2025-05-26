document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get input values
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let isValid = true;

    // Hide all error messages before validation
    document.getElementById("emailError").style.display = "none";
    document.getElementById("passwordError").style.display = "none";

    // Validate email format using Regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").style.display = "block";
      isValid = false;
    }

    // Validate password length
    if (password.length < 6) {
      document.getElementById("passwordError").style.display = "block";
      isValid = false;
    }

    // Proceed if inputs are valid
    if (isValid) {
      const user = { email };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Login successful!");
      window.location.replace("home_page.html");
    }
  });
});
