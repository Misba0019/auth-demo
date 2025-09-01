# Auth Demo 

A simple authentication demo built with **Node.js, Express, MongoDB, Mongoose, and EJS**.  
This learning project demonstrates the basics of authentication using **bcrypt password hashing** and **session-based authentication with express-session**.  

---

## Features

- User registration with username + password  
- Passwords are hashed securely with **bcrypt**  
- Session-based authentication with **express-session**  
- Protected routes (`/secret`, `/topsecret`) accessible only when logged in  
- Logout functionality to clear sessions  
- Minimal UI with **EJS templates** (register, login, secret page)  

---

## Routes & App Flow

- **GET** `/` – Home page with quick links to register, login, and secret routes  
- **GET** `/register` – Show registration form  
- **POST** `/register` – Handle user signup (password hashing + DB save)  
- **GET** `/login` – Show login form  
- **POST** `/login` – Handle login (bcrypt compare + session save)  
- **POST** `/logout` – End session and log out user  
- **GET** `/secret` – Protected page (only logged-in users can access)  
- **GET** `/topsecret` – Another protected route  

---

## Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- bcrypt
- express-session
- EJS

---

## Getting Started
1. Clone this repo:
```bash
git clone https://github.com/Misba0019/auth-demo.git
cd auth-demo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables
Create a .env file in the root:
```bash
SESSION_SECRET_KEY=your_secret_here
```

4. Start MongoDB locally
Make sure MongoDB is running on: `mongodb://127.0.0.1:27017/authDemoDB`

5. Run the app:
```bash
nodemon index.js
```
(If you don’t have nodemon installed, run `npm install -g nodemon`)

6. Visit the app:
Go to `http://localhost:3000`

---

## Project Structure

- **index.js** – Main Express app (routes, middleware, DB connection)
- **models/user.js** – Mongoose schema & password hashing logic
- **views/** – EJS templates for register, login, and secret pages
- **playgrounds/bcrypt-demo.js** – Extra sandbox script for experimenting with bcrypt
- **.env** – Local secrets (not pushed to GitHub)
- **.env.example** – Example environment file for setup
- **.gitignore** – Git ignore rules

---

## Playgrounds

This repo also includes a playgrounds/bcrypt-demo.js file.  
It’s a sandbox script where I experimented with:
- Generating bcrypt hashes
- Using salt rounds
- Comparing plain vs hashed passwords

---

## Note

This is a learning project, not intended for production use.  
It focuses on the basics of user authentication with bcrypt and sessions.
