const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/authDemoDB')
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET_KEY || 'supersecret',
    resave: false,
    saveUninitialized: false
})); // Initialize session middleware

// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
    if(!req.session.user_id){
        res.redirect('/login');
    }
    next();
};

// Home Route
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Authentication Demo!</h1>
        <p>This is a simple Node.js + Express app with user authentication.</p>
        <ul>
            <li><a href="/register">Register</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/secret">Secret Page</a></li>
            <li><a href="/topsecret">Top Secret Page</a></li>
        </ul>
    `);
});

// Registration Route
app.get('/register', (req, res) => {
    res.render('register');
});

// Handle registration logic
app.post('/register', async(req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect('/');
});

// Login Route
app.get('/login', (req, res) => {
    res.render('login');
});

// Handle login logic
app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
});

// Logout 
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/'); // fallback if session can't be destroyed
        }
        res.redirect('/');
    });
});

// Secret Route - Protected
app.get('/secret', requireLogin, async(req, res) => {
    const user = await User.findById(req.session.user_id);
    res.render('secret', { user });
});

// Top Secret Route - Protected
app.get('/topsecret', requireLogin, (req, res) => {
    res.send('<h1>This is the Top Secret Page.</h1><p>Only logged-in users can see this.</p>');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
 