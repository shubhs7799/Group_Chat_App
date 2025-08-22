document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const credentials = {
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value
  };

  try {
    const resp = await axios.post('/api/auth/login', credentials);

    if (resp.status === 200) {
      alert(resp.data.message || "Login successful");

      // Save token in localStorage for chat session
      localStorage.setItem('token', resp.data.token);

      // Redirect to chat page
      window.location.href = '/chat.html';
    }
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message || 'Login failed');
    } else {
      alert('Network error, please check backend server');
    }
  }
});
