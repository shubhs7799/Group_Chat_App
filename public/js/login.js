document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const credentials = {
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value
  };

  try {
    const resp = await axios.post('/api/auth/login', credentials);

    if (resp.status === 200) {
      alert(resp.data.message);

      // save token in localStorage (for chat later)
      localStorage.setItem('token', resp.data.token);

      // redirect to chat page
      window.location.href = '/chat.html';
    }
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message || 'Login failed');
    } else {
      alert('Network error, check server');
    }
  }
});
