// Wrap your code in a self-executing function (IIFE)
(function() {
    var validTokens = ['112', '113', '114', '139', '115']; // Add other valid token ids here

    function isTokenValid(token) {
      return validTokens.includes(token);
    }

    var isTokenIdCorrect = localStorage.getItem('isTokenIdCorrect') === 'true';

    function submitForm() {
      var tokenIdInput = document.getElementById('tokenIdInput');
      var otherFields = document.querySelectorAll('#fieldsBelowTokenId input, #fieldsBelowTokenId select, #fieldsBelowTokenId textarea');

      if (isTokenIdCorrect) {
        // Show the loading spinner when the form is submitted
        showLoadingSpinner();

        // Clear the token status in localStorage
        localStorage.removeItem('isTokenIdCorrect');
        // Enable the fields before form submission
        otherFields.forEach(function (field) {
          field.removeAttribute('disabled');
        });

        // Hide the loading spinner after a short delay (e.g., 3 seconds) and submit the form
        setTimeout(function() {
          hideLoadingSpinner();
          document.getElementById('gform').submit();
        }, 3000);
      } else {
        // Show an error message or do other actions as needed
        alert('Invalid Token Id. Please enter the correct Token Id to unlock the fields.');
      }
    }

    // Function to show the loading spinner
    function showLoadingSpinner() {
      var loadingSpinner = document.getElementById('loadingSpinner');
      loadingSpinner.style.display = 'block';
    }

    // Function to hide the loading spinner
    function hideLoadingSpinner() {
      var loadingSpinner = document.getElementById('loadingSpinner');
      loadingSpinner.style.display = 'none';
    }

    // Live checking of the token id input
    document.getElementById('tokenIdInput').addEventListener('input', function () {
      var tokenIdInput = document.getElementById('tokenIdInput');
      var otherFields = document.querySelectorAll('#fieldsBelowTokenId input, #fieldsBelowTokenId select, #fieldsBelowTokenId textarea');

      var tokenIds = tokenIdInput.value.trim().split('\n');
      isTokenIdCorrect = tokenIds.every(isTokenValid);

      if (isTokenIdCorrect) {
        // Enable or unlock other fields
        otherFields.forEach(function (field) {
          field.removeAttribute('disabled');
        });
      } else {
        // Disable or lock other fields
        otherFields.forEach(function (field) {
          field.setAttribute('disabled', 'disabled');
        });
      }
    });

    // Check the token id on page load
    document.addEventListener('DOMContentLoaded', function () {
      var tokenIdInput = document.getElementById('tokenIdInput');
      var otherFields = document.querySelectorAll('#fieldsBelowTokenId input, #fieldsBelowTokenId select, #fieldsBelowTokenId textarea');

      var tokenIds = tokenIdInput.value.trim().split('\n');
      isTokenIdCorrect = tokenIds.every(isTokenValid);

      if (isTokenIdCorrect) {
        // Enable or unlock other fields
        otherFields.forEach(function (field) {
          field.removeAttribute('disabled');
        });
      } else {
        // Disable or lock other fields
        otherFields.forEach(function (field) {
          field.setAttribute('disabled', 'disabled');
        });
      }
    });

    // Store token status in localStorage before redirecting
    document.getElementById('gform').addEventListener('submit', function () {
      localStorage.setItem('isTokenIdCorrect', isTokenIdCorrect);
      // Show the loading spinner when the form is submitted
      showLoadingSpinner();
    });
  })();