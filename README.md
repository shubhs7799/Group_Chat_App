group-chat-app/
├─ package.json
├─ .env
├─ .gitignore
├─ README.md
├─ server.js
├─ config/
│  ├─ db.js
│  └─ websocket.js
├─ src/
│  ├─ routes/
│  │  ├─ auth.routes.js
│  │  └─ chat.routes.js
│  ├─ controllers/
│  │  ├─ auth.controller.js
│  │  └─ chat.controller.js
│  ├─ models/
│  │  ├─ User.model.js
│  │  └─ Message.model.js
│  ├─ middleware/
│  │  ├─ auth.middleware.js
│  │  └─ validate.middleware.js
│  ├─ services/
│  │  ├─ auth.service.js
│  │  └─ chat.service.js
│  ├─ sockets/
│  │  ├─ index.js
│  │  └─ chat.socket.js
│  └─ utils/
│     ├─ hash.util.js
│     ├─ jwt.util.js
│     └─ constants.js
├─ public/
│  ├─ css/
│  │  ├─ base.css
│  │  └─ auth.css
│  ├─ js/
│  │  ├─ signup.js
│  │  ├─ login.js
│  │  ├─ chat.js
│  │  └─ socket-client.js
│  └─ assets/
│     └─ logo.svg
└─ views/
   ├─ layouts/
   │  └─ main.layout.html
   ├─ signup.html        # Sign up page: name, email, phone, password
   ├─ login.html
   └─ chat.html
