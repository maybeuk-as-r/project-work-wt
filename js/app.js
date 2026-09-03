document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menu) menu.addEventListener('click', () => nav.classList.toggle('open'));

  const mobileSidebar = document.querySelector('.mobile-sidebar');
  const sidebar = document.querySelector('.sidebar');
  if (mobileSidebar) mobileSidebar.addEventListener('click', () => sidebar.classList.toggle('open'));

  document.querySelectorAll('.show-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
    });
  });

  function showError(input, message) {
    const group = input.closest('.form-group');
    if (group) {
      const error = group.querySelector('.error');
      if (error) error.textContent = message;
    }
    input.style.borderColor = message ? '#c23b4a' : '';
  }
  function validateRequired(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
      if (input.type === 'checkbox' && !input.checked) {
        showError(input, 'This field is required.'); valid = false;
      } else if (input.type !== 'checkbox' && !input.value.trim()) {
        showError(input, 'This field is required.'); valid = false;
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        showError(input, 'Enter a valid email address.'); valid = false;
      } else if (input.minLength > 0 && input.value.length < input.minLength) {
        showError(input, `Minimum ${input.minLength} characters required.`); valid = false;
      } else showError(input, '');
    });
    return valid;
  }

  const login = document.getElementById('loginForm');
  if (login) login.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('loginMessage');
    if (validateRequired(login)) {
      msg.className = 'form-message success';
      msg.textContent = '✓ Login validated. Redirecting to demo dashboard...';
      setTimeout(() => location.href = 'student-dashboard.html', 600);
    } else {
      msg.className = 'form-message error-msg'; msg.textContent = 'Please correct the highlighted fields.';
    }
  });

  const register = document.getElementById('registerForm');
  if (register) register.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('registerMessage');
    const valid = validateRequired(register);
    const p = document.getElementById('regPassword'), cp = document.getElementById('regConfirm');
    if (p && cp && p.value !== cp.value) { showError(cp, 'Passwords do not match.'); }
    const terms = document.getElementById('regTerms');
    if (terms && !terms.checked) document.querySelector('.terms-error').textContent = 'Please accept the terms.';
    if (valid && p.value === cp.value && terms.checked) {
      msg.className = 'form-message success'; msg.textContent = '✓ Registration form validated successfully.';
      register.reset();
    } else { msg.className = 'form-message error-msg'; msg.textContent = 'Please review the form and try again.'; }
  });

  document.querySelectorAll('[data-open-modal]').forEach(btn => btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.openModal)?.classList.add('open');
  }));
  document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', () => {
    btn.closest('.modal')?.classList.remove('open');
  }));
  document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('open');
  }));

  document.querySelectorAll('.demo-form').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateRequired(form)) {
      alert('✓ Form submitted successfully (frontend demo).');
      form.closest('.modal')?.classList.remove('open');
      form.reset();
    }
  }));

  document.querySelectorAll('.status-buttons').forEach(group => {
    group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      group.querySelectorAll('button').forEach(b => b.classList.remove('selected','present','absent'));
      button.classList.add('selected');
      if (button.textContent.trim() === 'Present') button.classList.add('present');
      if (button.textContent.trim() === 'Absent') button.classList.add('absent');
    }));
  });

  const verify = document.getElementById('verifyBtn');
  if (verify) verify.addEventListener('click', () => {
    verify.textContent = '✓ Verified (96%)';
    verify.classList.remove('btn-secondary'); verify.classList.add('btn-primary');
  });

  const save = document.getElementById('saveAttendance');
  if (save) save.addEventListener('click', () => {
    save.textContent = '✓ Attendance Saved';
    setTimeout(() => save.textContent = 'Save Attendance', 1800);
  });

  document.querySelectorAll('[data-table-search]').forEach(input => {
    const table = document.getElementById(input.dataset.tableSearch);
    if (table) input.addEventListener('input', () => {
      const term = input.value.toLowerCase();
      table.querySelectorAll('tbody tr').forEach(row => row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none');
    });
  });

  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) exportBtn.addEventListener('click', () => {
    const rows = [...document.querySelectorAll('#reportTable tr')].map(r => [...r.cells].map(c => `"${c.innerText.replaceAll('"','""')}"`).join(','));
    const blob = new Blob([rows.join('\n')], {type:'text/csv'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'attendance-report.csv'; a.click();
  });

  const forgot = document.getElementById('forgotLink');
  if (forgot) forgot.addEventListener('click', e => { e.preventDefault(); alert('Password reset UI demo: please contact the administrator.'); });
});