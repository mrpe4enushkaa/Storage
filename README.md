# 📦 Storage

**Storage** is a secure web application for storing documents, files, and passwords. It focuses on data protection, user-friendly design, and modern web technologies on both frontend and backend.

---

## 🚀 Features

* 🔐 Secure file upload and storage
* 📄 Built-in PDF viewer
* 📁 Support for different file types
* 🎨 Modern animations with GSAP and Framer Motion
* 📤 Drag & Drop support with notifications
* ⚙️ Modular architecture for client and server separation
* 🔒 Focus on privacy and data protection

---

## 🧱 Tech Stack

### Frontend (`client/`)

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [React Router DOM](https://reactrouter.com/)
* [GSAP](https://greensock.com/gsap/)
* [Framer Motion](https://www.framer.com/motion/)
* [React Spring](https://react-spring.dev/)
* [React Toastify](https://fkhadra.github.io/react-toastify/)
* [Sass](https://sass-lang.com/)
* [ESLint](https://eslint.org/)

### Backend (`server/`)

* [Node.js](https://nodejs.org/)
* [Multer](https://github.com/expressjs/multer) – middleware for handling `multipart/form-data` (file uploads)
* [nodemon](https://www.npmjs.com/package/nodemon) – auto-restarting development server

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mrpe4enushkaa/Storage.git
cd Storage

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# (Optional) Install server dependencies
cd ../server
npm install
```

---

## ▶️ Development

Start both client and server in development mode:

```bash
npm run dev
```

This will run:

* **Frontend** on [http://localhost:5173](http://localhost:5173)
* **Backend** on [http://localhost:3000](http://localhost:3000) *(or your configured port)*

---

### 🔧 Available Scripts

| Script            | Description                             |
| ----------------- | --------------------------------------- |
| `npm run client`  | Run React frontend via Vite             |
| `npm run server`  | Run backend server with Nodemon         |
| `npm run dev`     | Run both client and server concurrently |
| `npm run lint`    | Lint the frontend code                  |
| `npm run build`   | Build the frontend for production       |
| `npm run preview` | Preview the frontend build (Vite)       |

---

## 📁 Project Structure

```
Storage/
├── client/          # React frontend
│   └── src/
├── server/          # Node.js backend
│   └── src/
├── package.json     # Global scripts for dev
└── README.md
```

---

## 🔐 Security (Planned)

The project is under active development with plans to implement:

* ✅ File encryption and hashing
* ✅ Authentication and user sessions
* ✅ CSRF / XSS / Injection protection
* ✅ Access control and file permissions
* ✅ Logging user actions

---

## 🐛 Bug Reports

Found a bug or issue? Please open an [issue here](https://github.com/mrpe4enushkaa/Storage/issues).
