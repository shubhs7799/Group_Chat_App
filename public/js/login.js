document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const credentials = {
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value
  };

  try {
    const resp = await axios.post('/api/v1/login', credentials);

    if (resp.status === 200) {
      alert(resp.data.message || "Login successful");
      localStorage.setItem('token', resp.data.token);
      window.location.href = '/chat.html'; // redirect to chat page
    }
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message || 'Login failed');
    } else {
      alert('Network error, please check backend server');
    }
  }
});
