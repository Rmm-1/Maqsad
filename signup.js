document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Hide all error messages initially
    document.querySelectorAll('.error').forEach(el => el.style.display = 'none');

    // Get form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userRole = document.getElementById('userRole').value;

    let isValid = true;

    // Validate name
    if (name === '') {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    // Validate email using a basic regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Validate password length (minimum 6 characters)
    if (password.length < 6) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    // Validate password match
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    }

    // Validate user role selection
    if (userRole === '') {
        document.getElementById('roleError').style.display = 'block';
        isValid = false;
    }

    // Save user to localStorage if form is valid
    if (isValid) {
        const user = {
            name: name,
            email: email,
            password: password,
            role: userRole
        };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Sign-up successful! Redirecting...");
        window.location.replace("home_page.html");
    }
});
