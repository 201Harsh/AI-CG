# 🧠 EndAI Code Generator

**EndAI** is an intelligent and responsive web application that empowers developers to generate complete coding projects — including boilerplate code and detailed project descriptions — with a single prompt. It uses **Google Gemini AI** to generate production-ready code and markdown-based explanations, making it an ideal tool for developers, learners, and creators looking to kickstart new ideas quickly.

---

## 🌟 Key Features

- ⚙️ **AI-Powered Generation**  
  Instantly generate project code and accompanying markdown descriptions using the Google Gemini API.

- 📁 **Project Management System**  
  Seamlessly create, save, and switch between multiple projects in a user-friendly sidebar layout.

- 📝 **Typing Animation Effect**  
  Realistic typewriter animation enhances the experience when displaying newly generated content.

- 🧠 **Smart Memory Handling**  
  Previously saved projects load instantly without the typing animation, making the UX feel more efficient.

- 💡 **Live Syntax Highlighting**  
  Use of Prism.js ensures beautifully highlighted code blocks for better readability.

- 📝 **Markdown Description Rendering**  
  Descriptions are rendered using React Markdown for rich-text formatting and readability.

- 📱 **Mobile Responsive**  
  Fully responsive UI ensures smooth experience on both desktop and mobile devices.

- 📋 **One-Click Copy Buttons**  
  Instantly copy the code or description with a click for faster integration into your workflow.

---

## 🧰 Tech Stack

| Category            | Technologies Used                          |
|---------------------|--------------------------------------------|
| **Frontend**        | React.js, Vite, Tailwind CSS               |
| **AI Integration**  | Google Gemini API (free-tier support)      |
| **Animations**      | Framer Motion                              |
| **Code Highlighting** | Prism.js                                 |
| **Markdown Renderer** | React Markdown                           |
| **State Management** | React Context API & Hooks                 |

---

## 📁 Project Folder Structure


---

# 🔐 How Authentication Works Backend

This is the backend authentication system for the **EndAI Code Generator** app. It handles user registration, email OTP verification, secure login/logout, and token-based authentication using JWT. Built with **Node.js**, **Express**, and **MongoDB**, it ensures a smooth and secure authentication flow for developers.

---

## ⚙️ Features

- 🔒 **User Registration** with email and password
- 📧 **OTP Verification** via email before account activation
- 🔑 **Secure Login** using JWT
- 🚪 **Logout** with token/session invalidation
- 🧠 **Password Hashing** with bcrypt
- 🛡️ **Protected Routes** using auth middleware
- 💌 **Email Sending** using Nodemailer
- ⏱️ **OTP Expiry Handling**

---

## 🛠️ Tech Stack

| Technology     | Description                    |
|----------------|--------------------------------|
| Node.js + Express | Web server and routing       |
| MongoDB + Mongoose | Database and data modeling  |
| bcryptjs       | Password hashing               |
| jsonwebtoken   | JWT-based token auth           |
| dotenv         | Manage environment variables   |
| Nodemailer     | Email delivery for OTP         |

---

## 🧠 Authentication Flow

### 1. 📝 Register User

- **Endpoint**: `POST /api/auth/register`
- **Payload**:
  ```json
  {
    "email": "harsh@example.com",
    "password": "yourpassword"
  }
  ```
## ✅ Verify OTP
 **Endpoint: POST /api/auth/verify-otp**


## 🔓 Login

**Endpoint: POST /api/auth/login**


## 🚪 Logout
**Endpoint: POST /api/auth/logout (optional)**

Process:

Clears HTTP-only cookie (if using cookies)

Or removes token client-side



## 🔐 Environment Variables
Create a .env file in the root and add:

```
.env
PORT=4000
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key
EMAIL_USER = your_email@example.com
EMAIL_PASS = your_email_password_or_app_password
```
## 📁 Project Structure

```bash
endai-auth-backend/
├── controllers/
│   └── authController.js     # Handles register, verify, login, logout
├── models/
│   └── User.js               # Mongoose user schema
├── routes/
│   └── authRoutes.js         # Express routes for auth
├── middleware/
│   └── authMiddleware.js     # JWT token verification
├── utils/
│   └── sendOTP.js            # Nodemailer utility
├── .env                      # Environment variables
├── server.js                 # App entry point
└── package.json              # Project metadata
```

## ▶️ Running the Server
1. Clone the Repo
```bash
git clone https://github.com/201Harsh/End-AI-CG.git
cd Backend
```
## Install Dependencies
```bash
npm install
```
## Configure .env
```
Fill in the required values for MongoDB, JWT, and email.
```

## Start the Server
```bash
npx nodemon or node server.js
Server runs on http://localhost:4000
```

## 🔐 Securing Your API
- Hash passwords with bcrypt (already implemented)

- JWT tokens expire after 1h (customizable)

- OTP expires after 5–10 minutes (can be extended)

- Optional: Add rate limiting for OTP requests

## 📬 Sending Emails (OTP)
- Uses Nodemailer

- Compatible with Gmail (use an App Password)

- Can be swapped out for Mailgun, SendGrid, etc.

## 🔧 Future Improvements
- ✅ Add "Resend OTP" with cooldown

- 🔐 Add password reset via email

- 📊 Add user analytics and dashboard

- 🌍 Host on Render/Heroku/Vercel backend

---

## 🧠 How It Works On Frontend

### 1. 🚀 Creating a Project
- Click the `+` button or "Create New Project".
- Type a prompt describing the type of project/code you want.
- Hit “Generate”.
- The AI processes the request and generates:
  - A syntax-highlighted code block.
  - A markdown description.
- Both are displayed with a typing animation.

### 2. 📂 Navigating Projects
- Each generated project is listed in a collapsible sidebar.
- Click any saved project to quickly reload it (typing effect skipped for saved items).

### 3. 📋 Copying Content
- Buttons are provided to copy the code and markdown description to your clipboard instantly.

---

## 💡 Why Choose EndAI?

- ⚡ Skip boilerplate and get straight to building.
- 📚 Perfect for learning and exploring new coding patterns.
- 🎨 Clean and minimal UI focused on productivity.
- 🔁 Save and revisit your generated projects anytime.

---

## 🔧 Getting Started (Local Development)

Follow these steps to set up the project locally:

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/201Harsh/End-AI-CG.git
cd Frontend
```
## 🔧 Install Dependencies

``` bash 
npm install 
```

## 🔑 Configure Environment Variables
Create a .env file in the root directory and add your Google Gemini API key:

```bash
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

Don't have one? You can get a free API key from the Google AI Studio.

## 🚀 Run the Development Server

``` bash
npm run dev
```
- The app will be running at http://localhost:5173 (or whatever port Vite assigns).

## 🏗️ Build for Production
```bash
npm run build
```
## 🖼️ Screenshots

**No screen shot Available**

## 📦 Main Dependencies

- React — Core UI framework

- Tailwind CSS — Utility-first styling

- Framer Motion — Smooth animations

- Prism.js — Code syntax highlighting

- React Markdown — Description rendering

- Google Gemini API — AI generation engine

## 🔐 Environment Variables

- Variable	Description
VITE_GEMINI_API_KEY	Your Google Gemini API key


## 🤝 Contributing
Contributions are welcome! Whether it's improving the UI, fixing bugs, or adding new features:

- Fork the repository.

- Create a new branch (git checkout -b feature-name).

- Commit your changes (git commit -m 'add feature').

- Push to the branch (git push origin feature-name).

- Open a pull request.

## 📃 License

**This project is licensed under the MIT License.© 2025 Harsh**

## 🌐 Live Demo
 - 🔗 Live Preview on
 - https://endaicodegen.onrender.com/

 ---

**Made with ❤️ by Harsh**

---
