// Wait until the complete HTML document has loaded
// before running any JavaScript code.
document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // MOBILE NAVIGATION MENU
  // =========================================================

  // Get the mobile menu button and navigation links.
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  // When the menu button is clicked, add/remove the "open" class.
  // This allows the mobile navigation menu to open and close.
  if (menu) {
    menu.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }


  // =========================================================
  // MOBILE SIDEBAR
  // =========================================================

  // Get the mobile sidebar button and the actual sidebar.
  const mobileSidebar = document.querySelector('.mobile-sidebar');
  const sidebar = document.querySelector('.sidebar');

  // Toggle the sidebar when the mobile sidebar button is clicked.
  if (mobileSidebar) {
    mobileSidebar.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }


  // =========================================================
  // SHOW / HIDE PASSWORD
  // =========================================================

  // Find all buttons that have the "show-password" class.
  document.querySelectorAll('.show-password').forEach(btn => {

    // Add a click event to every password button.
    btn.addEventListener('click', () => {

      // Find the input field connected to this button.
      // The target ID is stored inside the button's data-target attribute.
      const input = document.getElementById(btn.dataset.target);

      // Change the input type:
      // password -> text (show password)
      // text -> password (hide password)
      input.type = input.type === 'password' ? 'text' : 'password';

      // Change the button text according to the current state.
      btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
    });
  });


  // =========================================================
  // DISPLAY FORM ERROR
  // =========================================================

  // This function displays an error message for a particular input.
  function showError(input, message) {

    // Find the parent form group of the input.
    const group = input.closest('.form-group');

    if (group) {

      // Find the error element inside the form group.
      const error = group.querySelector('.error');

      // Display the error message.
      if (error) error.textContent = message;
    }

    // If there is an error, change the input border to red.
    // Otherwise, remove the custom border color.
    input.style.borderColor = message ? '#c23b4a' : '';
  }


  // =========================================================
  // FORM VALIDATION
  // =========================================================

  // This function checks all required fields in a form.
  function validateRequired(form) {

    // Assume the form is valid initially.
    let valid = true;

    // Find every input that has the "required" attribute.
    form.querySelectorAll('[required]').forEach(input => {

      // -------------------------------------------------------
      // CHECKBOX VALIDATION
      // -------------------------------------------------------

      // If the input is a checkbox and it has not been selected.
      if (input.type === 'checkbox' && !input.checked) {

        // Show an error message.
        showError(input, 'This field is required.');

        // Mark the form as invalid.
        valid = false;

      }

      // -------------------------------------------------------
      // EMPTY FIELD VALIDATION
      // -------------------------------------------------------

      // Check normal input fields for empty values.
      else if (
        input.type !== 'checkbox' &&
        !input.value.trim()
      ) {

        showError(input, 'This field is required.');
        valid = false;
      }

      // -------------------------------------------------------
      // EMAIL VALIDATION
      // -------------------------------------------------------

      // Check whether an email follows a basic valid format.
      else if (
        input.type === 'email' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
      ) {

        showError(input, 'Enter a valid email address.');
        valid = false;
      }

      // -------------------------------------------------------
      // MINIMUM LENGTH VALIDATION
      // -------------------------------------------------------

      // Check if the input has a minimum character requirement.
      else if (
        input.minLength > 0 &&
        input.value.length < input.minLength
      ) {

        showError(
          input,
          `Minimum ${input.minLength} characters required.`
        );

        valid = false;
      }

      // -------------------------------------------------------
      // NO ERROR
      // -------------------------------------------------------

      // If all checks pass, remove any previous error message.
      else {
        showError(input, '');
      }
    });

    // Return true if everything is valid,
    // otherwise return false.
    return valid;
  }


  // =========================================================
  // LOGIN FORM
  // =========================================================

  // Find the login form.
  const login = document.getElementById('loginForm');

  // Only add the event if the login form exists on the page.
  if (login) {

    // Run this code when the login form is submitted.
    login.addEventListener('submit', e => {

      // Stop the browser from actually submitting/reloading the page.
      e.preventDefault();

      // Find the message area used to display login results.
      const msg = document.getElementById('loginMessage');

      // Validate all required login fields.
      if (validateRequired(login)) {

        // Display a success message.
        msg.className = 'form-message success';
        msg.textContent =
          '✓ Login validated. Redirecting to demo dashboard...';

        // After 600 milliseconds, redirect to the dashboard.
        setTimeout(() => {
          location.href = 'student-dashboard.html';
        }, 600);

      } else {

        // Display an error message if validation fails.
        msg.className = 'form-message error-msg';
        msg.textContent =
          'Please correct the highlighted fields.';
      }
    });
  }


  // =========================================================
  // REGISTRATION FORM
  // =========================================================

  // Find the registration form.
  const register = document.getElementById('registerForm');

  // Only run if the registration form exists.
  if (register) {

    // Handle registration form submission.
    register.addEventListener('submit', e => {

      // Prevent normal form submission.
      e.preventDefault();

      // Find the registration message area.
      const msg = document.getElementById('registerMessage');

      // Validate all required fields.
      const valid = validateRequired(register);

      // Get password and confirm-password fields.
      const p = document.getElementById('regPassword');
      const cp = document.getElementById('regConfirm');

      // Check whether both passwords are the same.
      if (p && cp && p.value !== cp.value) {

        // Show an error if they don't match.
        showError(cp, 'Passwords do not match.');
      }

      // Get the terms and conditions checkbox.
      const terms = document.getElementById('regTerms');

      // If the terms checkbox is not selected,
      // display an error message.
      if (terms && !terms.checked) {
        document.querySelector('.terms-error').textContent =
          'Please accept the terms.';
      }

      // -------------------------------------------------------
      // FINAL REGISTRATION CHECK
      // -------------------------------------------------------

      // Registration is successful only when:
      // 1. All required fields are valid
      // 2. Passwords match
      // 3. Terms are accepted
      if (
        valid &&
        p.value === cp.value &&
        terms.checked
      ) {

        // Display success message.
        msg.className = 'form-message success';
        msg.textContent =
          '✓ Registration form validated successfully.';

        // Clear the form after successful validation.
        register.reset();

      } else {

        // Display an error message if any validation fails.
        msg.className = 'form-message error-msg';
        msg.textContent =
          'Please review the form and try again.';
      }
    });
  }


  // =========================================================
  // OPEN MODALS
  // =========================================================

  // Find all buttons that contain the data-open-modal attribute.
  document.querySelectorAll('[data-open-modal]').forEach(btn => {

    // Add a click event to open the related modal.
    btn.addEventListener('click', () => {

      // Get the modal ID from data-open-modal.
      // Then add the "open" class to display it.
      document
        .getElementById(btn.dataset.openModal)
        ?.classList.add('open');
    });
  });


  // =========================================================
  // CLOSE MODALS
  // =========================================================

  // Find all elements that have the data-close-modal attribute.
  document.querySelectorAll('[data-close-modal]').forEach(btn => {

    // Close the modal when the button is clicked.
    btn.addEventListener('click', () => {

      // Find the closest modal and remove the "open" class.
      btn.closest('.modal')?.classList.remove('open');
    });
  });


  // =========================================================
  // CLOSE MODAL WHEN CLICKING OUTSIDE
  // =========================================================

  // Add a click event to every modal.
  document.querySelectorAll('.modal').forEach(modal => {

    modal.addEventListener('click', e => {

      // If the user clicks the modal background itself
      // instead of its content, close the modal.
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  });


  // =========================================================
  // DEMO FORMS
  // =========================================================

  // Find all forms with the "demo-form" class.
  document.querySelectorAll('.demo-form').forEach(form => {

    // Handle submission of each demo form.
    form.addEventListener('submit', e => {

      // Prevent the page from refreshing.
      e.preventDefault();

      // Validate the form.
      if (validateRequired(form)) {

        // Show a success alert.
        alert('✓ Form submitted successfully (frontend demo).');

        // Close the modal containing the form.
        form.closest('.modal')?.classList.remove('open');

        // Clear the form fields.
        form.reset();
      }
    });
  });


  // =========================================================
  // ATTENDANCE STATUS BUTTONS
  // =========================================================

  // Find every group of attendance status buttons.
  document.querySelectorAll('.status-buttons').forEach(group => {

    // Find all buttons inside the group.
    group.querySelectorAll('button').forEach(button => {

      // Add a click event to each button.
      button.addEventListener('click', () => {

        // Remove old status classes from all buttons.
        group.querySelectorAll('button').forEach(b =>
          b.classList.remove(
            'selected',
            'present',
            'absent'
          )
        );

        // Mark the clicked button as selected.
        button.classList.add('selected');

        // If the button says Present,
        // add the "present" class.
        if (button.textContent.trim() === 'Present') {
          button.classList.add('present');
        }

        // If the button says Absent,
        // add the "absent" class.
        if (button.textContent.trim() === 'Absent') {
          button.classList.add('absent');
        }
      });
    });
  });


  // =========================================================
  // VERIFY BUTTON
  // =========================================================

  // Find the verification button.
  const verify = document.getElementById('verifyBtn');

  if (verify) {

    // When the button is clicked,
    // change its text to show successful verification.
    verify.addEventListener('click', () => {

      verify.textContent = '✓ Verified (96%)';

      // Remove the secondary button styling.
      verify.classList.remove('btn-secondary');

      // Add the primary button styling.
      verify.classList.add('btn-primary');
    });
  }


  // =========================================================
  // SAVE ATTENDANCE
  // =========================================================

  // Find the Save Attendance button.
  const save = document.getElementById('saveAttendance');

  if (save) {

    // When clicked, change the button text temporarily.
    save.addEventListener('click', () => {

      save.textContent = '✓ Attendance Saved';

      // After 1.8 seconds, restore the original text.
      setTimeout(() => {
        save.textContent = 'Save Attendance';
      }, 1800);
    });
  }


  // =========================================================
  // TABLE SEARCH
  // =========================================================

  // Find all search inputs connected to tables.
  document.querySelectorAll('[data-table-search]').forEach(input => {

    // Find the table using the ID stored in data-table-search.
    const table = document.getElementById(input.dataset.tableSearch);

    if (table) {

      // Run the search every time the user types.
      input.addEventListener('input', () => {

        // Convert the search term to lowercase
        // to make searching case-insensitive.
        const term = input.value.toLowerCase();

        // Check every table row.
        table.querySelectorAll('tbody tr').forEach(row => {

          // If the row contains the search term,
          // keep it visible.
          // Otherwise, hide it.
          row.style.display =
            row.textContent.toLowerCase().includes(term)
              ? ''
              : 'none';
        });
      });
    }
  });


  // =========================================================
  // EXPORT TABLE TO CSV
  // =========================================================

  // Find the Export button.
  const exportBtn = document.getElementById('exportBtn');

  if (exportBtn) {

    // When Export is clicked, create a CSV file.
    exportBtn.addEventListener('click', () => {

      // Get every row from the report table.
      // Convert every cell into CSV format.
      const rows = [
        ...document.querySelectorAll('#reportTable tr')
      ].map(r =>
        [...r.cells]
          .map(c =>
            `"${c.innerText.replaceAll('"', '""')}"`
          )
          .join(',')
      );

      // Create a Blob containing the CSV data.
      const blob = new Blob(
        [rows.join('\n')],
        { type: 'text/csv' }
      );

      // Create a temporary download link.
      const a = document.createElement('a');

      // Create a temporary URL for the CSV file.
      a.href = URL.createObjectURL(blob);

      // Set the name of the downloaded file.
      a.download = 'attendance-report.csv';

      // Automatically click the link to start downloading.
      a.click();
    });
  }


  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  // Find the Forgot Password link.
  const forgot = document.getElementById('forgotLink');

  if (forgot) {

    // Handle clicking the Forgot Password link.
    forgot.addEventListener('click', e => {

      // Prevent the link from navigating to another page.
      e.preventDefault();

      // Display a demo message.
      alert(
        'Password reset UI demo: please contact the administrator.'
      );
    });
  }

});
