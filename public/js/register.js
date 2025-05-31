    document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('registrationForm');
      const nameInput = document.getElementById('name');
      const regInput = document.getElementById('registrationNumber');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const confirmPasswordInput = document.getElementById('confirmPassword');
      const registerBtn = document.getElementById('registerBtn');
      const loginLink = document.getElementById('loginLink');
      
      const strengthBar = document.getElementById('strengthBar');
      const passwordMatch = document.getElementById('passwordMatch');

      // Real-time validation
      nameInput.addEventListener('input', validateName);
      regInput.addEventListener('input', validateRegistration);
      emailInput.addEventListener('input', validateEmail);
      passwordInput.addEventListener('input', function() {
        validatePassword();
        checkPasswordMatch();
      });
      confirmPasswordInput.addEventListener('input', checkPasswordMatch);

      // Name validation
      function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        
        if (name.length < 3) {
          showError(nameError, 'Name must be at least 4 characters long');
          return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
          showError(nameError, 'Name should only contain letters and spaces');
          return false;
        } else {
          showSuccess(nameError, 'Looks good!');
          return true;
        }
      }

      // Registration number validation
      function validateRegistration() {
        const reg = regInput.value.trim();
        const regError = document.getElementById('regError');
        
        if (reg.length < 10) {
          showError(regError, 'Registration number must be at least 10 characters');
          return false;
        } else if (!/^[A-Z0-9]+$/i.test(reg)) {
          showError(regError, 'Registration number should contain only letters and numbers');
          return false;
        } else {
          showSuccess(regError, 'Valid registration number!');
          return true;
        }
      }

      // Email validation
      function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
          showError(emailError, 'Please enter a valid email address');
          return false;
        } else {
          showSuccess(emailError, 'Valid email address!');
          return true;
        }
      }

      // Password validation and strength
      function validatePassword() {
        const password = passwordInput.value;
        const passwordError = document.getElementById('passwordError');
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        // Update strength bar
        strengthBar.className = 'password-strength-bar';
        if (strength >= 3) {
          strengthBar.classList.add('strength-strong');
        } else if (strength >= 2) {
          strengthBar.classList.add('strength-medium');
        } else if (strength >= 1) {
          strengthBar.classList.add('strength-weak');
        }

        if (password.length < 8) {
          showError(passwordError, 'Password must be at least 8 characters long');
          return false;
        } else if (strength < 3) {
          showError(passwordError, 'Password should include uppercase, lowercase, numbers, and symbols');
          return false;
        } else {
          showSuccess(passwordError, 'Strong password!');
          return true;
        }
      }

      // Check password match
      function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword === '') {
          passwordMatch.textContent = '';
          return false;
        }
        
        if (password === confirmPassword) {
          passwordMatch.textContent = '✅ Passwords match';
          passwordMatch.className = 'password-match match-success';
          return true;
        } else {
          passwordMatch.textContent = '❌ Passwords do not match';
          passwordMatch.className = 'password-match match-error';
          return false;
        }
      }

      // Utility functions
      function showError(element, message) {
        element.textContent = message;
        element.className = 'validation-message validation-error';
        element.style.display = 'block';
      }

      function showSuccess(element, message) {
        element.textContent = message;
        element.className = 'validation-message validation-success';
        element.style.display = 'block';
      }

      // Form submission
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isRegValid = validateRegistration();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isPasswordMatch = checkPasswordMatch();
        
        if (isNameValid && isRegValid && isEmailValid && isPasswordValid && isPasswordMatch) {
          registerBtn.classList.add('loading');
          registerBtn.disabled = true;
          
          // Simulate registration process
          setTimeout(() => {
            registerBtn.classList.remove('loading');
            registerBtn.disabled = false;
            
            // Success animation
            document.querySelector('.registration-card').classList.add('success-animation');
            
            showNotification('🎉 Registration Successful!', 'success');
            
            setTimeout(() => {
                window.location.href = ("/html/complaint.html");
              alert('Welcome to Student Assistance Hub! Your account has been created successfully.');
              form.reset();
              strengthBar.className = 'password-strength-bar';
              passwordMatch.textContent = '';
              // Hide all validation messages
              document.querySelectorAll('.validation-message').forEach(msg => {
                msg.style.display = 'none';
              });
            }, 1500);
            
          }, 2000);
        } else {
          showNotification('❌ Please fix the errors above', 'error');
          
          // Shake animation for invalid form
          document.querySelector('.registration-card').style.animation = 'shake 0.5s ease-in-out';
          setTimeout(() => {
            document.querySelector('.registration-card').style.animation = '';
          }, 500);
        }
      });

      // Login link handler
      loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('🔄 Redirecting to login page...', 'info');
        setTimeout(() => {
          window.location.href = ("/html/login.html");
          alert('In a real application, this would redirect to the login page.');
        }, 1000);
      });

      // Notification system
      function showNotification(message, type) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 16px 24px;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          z-index: 1000;
          animation: slideInRight 0.5s ease;
          max-width: 350px;
          backdrop-filter: blur(10px);
        `;

        if (type === 'success') {
          notification.style.background = 'rgba(16, 185, 129, 0.9)';
        } else if (type === 'error') {
          notification.style.background = 'rgba(239, 68, 68, 0.9)';
        } else {
          notification.style.background = 'rgba(59, 130, 246, 0.9)';
        }

        document.body.appendChild(notification);

        setTimeout(() => {
          if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
          }
        }, 4000);
      }

      // Add notification animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `;
      document.head.appendChild(style);
    });