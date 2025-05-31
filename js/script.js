document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get input values (using corrected ID from the HTML)
  const registrationNo = document.getElementById('registrationNo').value;
  const password = document.getElementById('password').value;
  
  // Basic client-side validation
  if (!registrationNo || !password) {
    showError('Please fill in all fields');
    return;
  }

  // Send login data to the server for validation
  loginUser(registrationNo, password);
});

function loginUser(registrationNo, password) {
  // In a real application, you would make an API call here
  // This is a simulation with hardcoded credentials
  const validCredentials = {
    'user': 'Password',
    // Add more test credentials if needed
  };

  // Check if credentials match
  if (validCredentials[registrationNo] && validCredentials[registrationNo] === password) {
    // Successful login - redirect to complaint page
    window.location.href = ("/html/complaint.html");
  } else {
    showError('Invalid Registration No or password. Please try again.');
  }
}

function showError(message) {
  // Create or update error message display
  let errorElement = document.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    document.getElementById('loginForm').prepend(errorElement);
  }
  
  errorElement.textContent = message;
  errorElement.style.color = '#ef4444';
  errorElement.style.marginBottom = '1rem';
  errorElement.style.textAlign = 'center';
  errorElement.style.fontSize = '0.9rem';
}