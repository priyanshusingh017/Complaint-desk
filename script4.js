document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('Mobile No').value;
    const password = document.getElementById('OTP').value;
    
    console.log(username.value)
    console.log(password.value)
  
    // Send login data to the server for validation (simulate for this example)
    loginUser(username, password);
  });

  
  function loginUser(username, password) {
    // Simulated backend validation (replace with actual backend logic)
    if (username === '63078100' && password === '6569') {
      window.location.assign("complaint.html");
      alert('Login successful!');
    } else {
      alert('Invalid Registraion No or password. Please try again.');
    }
  }