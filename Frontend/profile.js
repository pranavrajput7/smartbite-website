// Profile page functionality
let isEditing = false;
let originalValues = {};

document.addEventListener('DOMContentLoaded', function() {
    // Load user data (in a real app, this would come from your backend)
    loadUserData();
    updateAvatar();
});

// Back button functionality
function goBackToHomepage() {
    if (isEditing) {
        if (confirm('You have unsaved changes. Are you sure you want to go back?')) {
            window.location.href = 'homepage.html';
        }
    } else {
        window.location.href = 'homepage.html';
    }
}

// Load user data (simulate API call)
function loadUserData() {
    // In a real application, you would fetch this from your backend
    const userData = {
        firstName: 'John',
        lastName: 'Doe', 
        username: 'johndoe123',
        password: 'mypassword123'
    };
    
    // Populate fields
    document.getElementById('firstName').value = userData.firstName;
    document.getElementById('lastName').value = userData.lastName;
    document.getElementById('username').value = userData.username;
    document.getElementById('password').value = userData.password;
}

// Update avatar with first letter of first name
function updateAvatar() {
    const firstName = document.getElementById('firstName').value;
    const avatarText = document.getElementById('avatarText');
    avatarText.textContent = firstName ? firstName.charAt(0).toUpperCase() : 'U';
}

// Toggle password visibility with custom icons
function togglePassword() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.src = 'eye-off.png'; // Change to closed eye icon
        eyeIcon.alt = 'Hide Password';
    } else {
        passwordField.type = 'password';
        eyeIcon.src = 'eye.png'; // Change back to open eye icon
        eyeIcon.alt = 'Show Password';
    }
}


// Edit field functionality
function editField(fieldId) {
    if (!isEditing) {
        // Store original values
        originalValues = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        
        isEditing = true;
        
        // Make all fields editable
        const fields = ['firstName', 'lastName', 'username', 'password'];
        fields.forEach(id => {
            const field = document.getElementById(id);
            field.removeAttribute('readonly');
            field.style.backgroundColor = '#ffffff';
        });
        
        // Show action buttons
        document.getElementById('actionButtons').style.display = 'flex';
        
        // Focus on the clicked field
        document.getElementById(fieldId).focus();
    }
}

// Save changes
function saveChanges() {
    // Get current values
    const userData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value
    };
    
    // Validate fields
    if (!userData.firstName || !userData.lastName || !userData.username || !userData.password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (userData.username.length < 3) {
        alert('Username must be at least 3 characters long');
        return;
    }
    
    if (userData.password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Here you would send the data to your backend
    console.log('Saving user data:', userData);
    
    // Simulate API call
    setTimeout(() => {
        alert('Profile updated successfully!');
        
        // Update avatar
        updateAvatar();
        
        // Exit edit mode
        exitEditMode();
    }, 500);
}

// Cancel edit
function cancelEdit() {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
        // Restore original values
        document.getElementById('firstName').value = originalValues.firstName;
        document.getElementById('lastName').value = originalValues.lastName;
        document.getElementById('username').value = originalValues.username;
        document.getElementById('password').value = originalValues.password;
        
        exitEditMode();
    }
}

// Exit edit mode
function exitEditMode() {
    isEditing = false;
    
    // Make fields readonly again
    const fields = ['firstName', 'lastName', 'username', 'password'];
    fields.forEach(id => {
        const field = document.getElementById(id);
        field.setAttribute('readonly', true);
        field.style.backgroundColor = '#f8f8f8';
    });
    
    // Hide action buttons
    document.getElementById('actionButtons').style.display = 'none';
    
    // Reset password field type
    document.getElementById('password').type = 'password';
    document.getElementById('eyeBtn').textContent = '👁️';
}
