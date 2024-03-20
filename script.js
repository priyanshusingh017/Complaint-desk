document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('Registraion No').value;
    const password = document.getElementById('password').value;
    
    console.log(username.value)
    console.log(password.value)
  
    // Send login data to the server for validation (simulate for this example)
    loginUser(username, password);
  });

  
  function loginUser(username, password) {
    // Simulated backend validation (replace with actual backend logic)
    if (username === '22BCE10097' && password === 'Ps531!@') {
      window.location.assign("complaint.html");
      alert('Login successful!');
    } else {
      alert('Invalid Registraion No or password. Please try again.');
    }
  }