document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const userData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    password: document.getElementById('password').value
  };

  try {
    const resp = await axios.post('/api/auth/signup', userData);

    if (resp.status === 200) {
      alert(resp.data.message || "Login successful");
      localStorage.setItem('token', resp.data.token);
      window.location.href = '/chat.html'; // redirect to chat page
    }
  } catch (err) {
    if (err.response) {
      // Server responded with an error status
      alert(err.response.data.message || 'Error during signup');
    } else {
      // Network or other error
      alert('Network error, please check backend');
    }
  }
});
