document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
  };

  console.log("User Data:", userData);

  // Later we’ll send this to backend API with fetch()
  // Example:
  // await fetch("/api/auth/signup", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(userData) });
  
  alert("Signup successful (frontend only for now)");
});
