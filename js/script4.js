    document.addEventListener('DOMContentLoaded', function() {
      const mobileInput = document.getElementById('mobileNo');
      const sendOtpBtn = document.getElementById('sendOtpBtn');
      const otpGroup = document.getElementById('otpGroup');
      const otpInputs = document.querySelectorAll('.otp-input');
      const loginBtn = document.getElementById('loginBtn');
      const timer = document.getElementById('timer');
      const loginForm = document.getElementById('loginForm');
      const forgotPasswordLink = document.getElementById('forgotPassword');
      
      let otpTimer;
      let timeLeft = 60;
      let generatedOTP = '';

      // Mobile number validation and formatting
      mobileInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        this.value = value;
        
        sendOtpBtn.disabled = value.length !== 10;
        
        if (value.length === 10) {
          this.classList.add('success-animation');
          setTimeout(() => this.classList.remove('success-animation'), 600);
        }
      });

      // Send OTP functionality
      sendOtpBtn.addEventListener('click', function() {
        const mobile = mobileInput.value;
        
        if (mobile.length !== 10) {
          showError('Please enter a valid 10-digit mobile number');
          return;
        }

        // Generate random OTP
        generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Simulate API call
        this.classList.add('loading');
        this.disabled = true;
        
        setTimeout(() => {
          this.classList.remove('loading');
          
          // Show OTP section with animation
          otpGroup.style.display = 'block';
          otpGroup.style.animation = 'slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          
          // Focus first OTP input
          otpInputs[0].focus();
          
          // Start timer
          startOtpTimer();
          
          // Show success message
          showSuccess(`OTP sent to +91-${mobile}! (Demo OTP: ${generatedOTP})`);
          
        }, 2000);
      });

      // OTP input handling
      otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
          let value = this.value.replace(/\D/g, '');
          if (value.length > 1) value = value.slice(0, 1);
          this.value = value;

          if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
          
          // Enable login button when all OTP fields are filled
          const allFilled = Array.from(otpInputs).every(inp => inp.value.length === 1);
          loginBtn.disabled = !allFilled;
          
          if (allFilled) {
            loginBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
            loginBtn.innerHTML = 'Verify & Login';
          } else {
            loginBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            loginBtn.innerHTML = 'Login';
          }
        });

        input.addEventListener('keydown', function(e) {
          if (e.key === 'Backspace' && !this.value && index > 0) {
            otpInputs[index - 1].focus();
          }
        });

        input.addEventListener('paste', function(e) {
          e.preventDefault();
          const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
          
          for (let i = 0; i < Math.min(pastedData.length, otpInputs.length - index); i++) {
            if (otpInputs[index + i]) {
              otpInputs[index + i].value = pastedData[i];
            }
          }
          
          // Check if all fields are filled after paste
          const allFilled = Array.from(otpInputs).every(inp => inp.value.length === 1);
          loginBtn.disabled = !allFilled;
        });
      });

      // Form submission
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const enteredOTP = Array.from(otpInputs).map(input => input.value).join('');
        
        if (enteredOTP.length !== 6) {
          showError('Please enter complete OTP');
          return;
        }

        loginBtn.classList.add('loading');
        loginBtn.disabled = true;

        setTimeout(() => {
          loginBtn.classList.remove('loading');
          
          if (enteredOTP === generatedOTP) {
            showSuccess('🎉 Login Successful!');
            document.querySelector('.login-container').classList.add('success-animation');
            
            setTimeout(() => {
              window.location.href = ('/html/complaint.html');
              alert('Welcome! You have successfully logged in.');
            }, 1000);
          } else {
            showError('❌ Invalid OTP. Please try again.');
            document.querySelector('.login-container').classList.add('shake');
            setTimeout(() => document.querySelector('.login-container').classList.remove('shake'), 500);
            
            // Clear OTP inputs
            otpInputs.forEach(input => input.value = '');
            otpInputs[0].focus();
            loginBtn.disabled = true;
          }
        }, 1500);
      });

      // OTP Timer
      function startOtpTimer() {
        timeLeft = 60;
        sendOtpBtn.style.display = 'none';
        
        otpTimer = setInterval(() => {
          timeLeft--;
          timer.textContent = `⏰ Resend OTP in ${timeLeft}s`;
          
          if (timeLeft <= 0) {
            clearInterval(otpTimer);
            timer.textContent = '';
            sendOtpBtn.style.display = 'inline-block';
            sendOtpBtn.textContent = 'Resend OTP';
            sendOtpBtn.disabled = false;
          }
        }, 1000);
      }

      // Forgot password handler
      forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showInfo('🔒 Forgot password feature will redirect to password reset page.');
      });

      // Utility functions for notifications
      function showSuccess(message) {
        showNotification(message, 'success');
      }

      function showError(message) {
        showNotification(message, 'error');
      }

      function showInfo(message) {
        showNotification(message, 'info');
      }

      function showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 20px;
          border-radius: 12px;
          color: white;
          font-weight: 500;
          z-index: 1000;
          animation: slideIn 0.5s ease;
          max-width: 350px;
          backdrop-filter: blur(10px);
        `;

        if (type === 'success') {
          notification.style.background = 'rgba(72, 187, 120, 0.9)';
        } else if (type === 'error') {
          notification.style.background = 'rgba(245, 101, 101, 0.9)';
        } else {
          notification.style.background = 'rgba(66, 153, 225, 0.9)';
        }

        document.body.appendChild(notification);

        setTimeout(() => {
          if (notification.parentNode) {
            notification.style.animation = 'slideOut 10.5s ease';
            setTimeout(() => notification.remove(), 500);
          }
        }, 4000);
      }

      // Add CSS for notification animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    });