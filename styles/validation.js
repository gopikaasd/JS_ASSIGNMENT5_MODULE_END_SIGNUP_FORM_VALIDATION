// Get form elements
const form = document.getElementById('signupForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const passwordStrength = document.getElementById('passwordStrength');

// Toggle password visibility for main password field
togglePassword.addEventListener('click', function () {
    togglePasswordField(password, this);
});

// Toggle password visibility for confirm password field
toggleConfirmPassword.addEventListener('click', function () {
    togglePasswordField(confirmPassword, this);
});

// Password Toggle field visibility
 
function togglePasswordField(field, icon) {
    if (field.type === 'password') {
        // Show password
        field.type = 'text';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    } else {
        // Hide password
        field.type = 'password';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    }
}


//  Validate full name - only letters and spaces
 
fullName.addEventListener('input', function () {
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(this.value) && this.value !== '') {
        this.setCustomValidity('Name can only contain letters and spaces');
    } else {
        this.setCustomValidity('');
    }
});


//   Validate email format in real-time
 
email.addEventListener('input', function () {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(this.value) && this.value !== '') {
        this.setCustomValidity('Please enter a valid email address');
    } else {
        this.setCustomValidity('');
    }
});


//   Check password strength and indicator
 
password.addEventListener('input', function () {
    const value = this.value;
    let strength = 0;

    // Check password criteria
    if (value.length >= 8) strength++;
    if (value.match(/[a-z]/)) strength++;
    if (value.match(/[A-Z]/)) strength++;
    if (value.match(/[0-9]/)) strength++;
    if (value.match(/[^a-zA-Z0-9]/)) strength++;

    // Update strength indicator
    passwordStrength.className = 'password-strength';
    if (strength <= 2) {
        passwordStrength.classList.add('strength-weak');
    } else if (strength <= 4) {
        passwordStrength.classList.add('strength-medium');
    } else {
        passwordStrength.classList.add('strength-strong');
    }

    // Hide indicator if field is empty
    if (value === '') {
        passwordStrength.className = 'password-strength';
    }

    // Validate password pattern
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!passwordPattern.test(value) && value !== '') {
        this.setCustomValidity('Password must contain uppercase, lowercase, and number');
    } else {
        this.setCustomValidity('');
    }

    // check confirm password match when password changes
    if (confirmPassword.value !== '') {
        checkPasswordMatch();
    }
});


confirmPassword.addEventListener('input', function () {
    checkPasswordMatch();
});


//   Validate that password and confirm password match
 
function checkPasswordMatch() {
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords do not match');
    } else {
        confirmPassword.setCustomValidity('');
    }
}


//    form submission
 
form.addEventListener('submit', function (event) {
    
    event.preventDefault();

    // Check if passwords match before submission
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords do not match');
    } else {
        confirmPassword.setCustomValidity('');
    }

    // Validate form and show errors if invalid
    if (form.checkValidity()) {
        // Form is valid - show success message
        alert('Form submitted successfully!');

        // Reset form fields
        form.reset();

        // Reset password toggle icons to default stage
        togglePassword.classList.remove('bi-eye');
        togglePassword.classList.add('bi-eye-slash');
        toggleConfirmPassword.classList.remove('bi-eye');
        toggleConfirmPassword.classList.add('bi-eye-slash');

        // Reset password strength indicator
        passwordStrength.className = 'password-strength';

        // Remove validation styling
        form.classList.remove('was-validated');
    } else {
        // Show validation errors
        form.classList.add('was-validated');
    }

    document.getElementById("form").reset();
});