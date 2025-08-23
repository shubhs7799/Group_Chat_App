const messagesContainer = document.getElementById('messages');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const logoutBtn = document.getElementById('logoutBtn');

function addMessage(text, type = 'self') {
  const msg = document.createElement('div');
  msg.classList.add('message', type);
  msg.textContent = text;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // auto-scroll
}

sendBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  // Add to UI as "self"
  addMessage(text, 'self');

  // TODO: send this message to backend (via WebSocket/axios)
  console.log("Sending message:", text);

  input.value = '';
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});

// Example: receiving message (simulate other user)
setTimeout(() => {
  addMessage("Hello from another user!", "other");
}, 2000);

// Logout button
logoutBtn.addEventListener('click', () => {
  // remove token (if stored in localStorage/sessionStorage)
  localStorage.removeItem('token');
  
  // redirect to login page
  window.location.href = "login.html";
});
