document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const age = document.getElementById('age').value;
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    if (name.length < 2) {
        showError('nameError');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError');
        isValid = false;
    }

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('passwordError');
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError('confirmError');
        isValid = false;
    }

    if (age < 1 || age > 120 || isNaN(age)) {
        showError('ageError');
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
    }
});

function showError(errorId) {
    document.getElementById(errorId).style.display = 'block';
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(function (error) {
        error.style.display = 'none';
    });
}
