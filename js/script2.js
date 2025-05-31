document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const adminId = document.getElementById('adminId').value;
      const password = document.getElementById('password').value;
      const rememberMe = document.getElementById('rememberMe').checked;
      const loadingSpinner = document.getElementById('loadingSpinner');
      const errorMessage = document.getElementById('errorMessage');
      const successMessage = document.getElementById('successMessage');
      const submitBtn = document.querySelector('.login-btn');
      
      // Clear previous messages
      errorMessage.style.display = 'none';
      successMessage.style.display = 'none';
      
      // Show loading state
      submitBtn.textContent = 'Logging in...';
      submitBtn.disabled = true;
      loadingSpinner.style.display = 'block';
      
      // Simulate login process (replace with actual login logic)
      setTimeout(() => {
        // Reset button state
        submitBtn.textContent = 'Login';
        submitBtn.disabled = false;
        loadingSpinner.style.display = 'none';
        
        // Example validation (replace with actual authentication)
        if (adminId === 'admin' && password === 'password') {
          successMessage.textContent = 'Login successful! Redirecting...';
          successMessage.style.display = 'block';
          
          // Simulate redirect after successful login
          setTimeout(() => {
            window.location.href = ('/html/complaint.html'); 
            console.log('Redirecting to dashboard...');
          }, 1500);
        } else {
          errorMessage.textContent = 'Invalid admin ID or password. Please try again.';
          errorMessage.style.display = 'block';
        }
      }, 2000);
    });

    // Forgot password functionality
    document.getElementById('forgotPassword').addEventListener('click', function(e) {
      e.preventDefault();
      alert('Forgot password functionality would be implemented here.');
    });

    // Add input validation feedback
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
          this.style.borderColor = '#e74c3c';
        } else {
          this.style.borderColor = '#27ae60';
        }
      });
      
      input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(231, 76, 60)') {
          this.style.borderColor = '#e1e1e1';
        }
      });
    });