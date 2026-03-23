require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_tradingone_jwt_key_2026_change_in_production';

// Placeholder or Environment variable for Google Client ID
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database module', err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            passwordHash TEXT,
            salt TEXT,
            googleId TEXT UNIQUE
        )`);
        console.log('Connected to the SQLite database.');
    }
});

// Helper function to hash passwords
function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Generate JWT Token
function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
}

// Middleware to authenticate JWT tokens for Terminal routes
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer TOKEN

    if (token == null) return res.status(401).json({ error: 'Unauthorized: Missing token' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden: Invalid token' });
        req.user = user;
        next();
    });
}

// --- API Endpoints ---

// Register with Email/Password
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(password, salt);

    db.run('INSERT INTO users (email, passwordHash, salt) VALUES (?, ?, ?)', [email, passwordHash, salt], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        
        const token = generateToken({ id: this.lastID, email });
        res.status(201).json({ message: 'User registered successfully', token });
    });
});

// Login with Email/Password
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user || !user.passwordHash) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const inputHash = hashPassword(password, user.salt);
        if (inputHash === user.passwordHash) {
            const token = generateToken(user);
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});

// Google OAuth Verification
app.post('/api/auth/google', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const googleId = payload['sub'];
        const email = payload['email'];

        // Check if user exists
        db.get('SELECT * FROM users WHERE googleId = ? OR email = ?', [googleId, email], (err, user) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            if (user) {
                // User exists, log them in
                // If they exist by email but no googleId (registered standard previously), we could link them. Simplest is just login.
                db.run('UPDATE users SET googleId = ? WHERE id = ?', [googleId, user.id]);
                const jwtToken = generateToken(user);
                res.json({ message: 'Google login successful', token: jwtToken });
            } else {
                // New Google user, register them
                db.run('INSERT INTO users (email, googleId) VALUES (?, ?)', [email, googleId], function(err) {
                     if (err) return res.status(500).json({ error: 'Database error' });
                     const jwtToken = generateToken({ id: this.lastID, email });
                     res.status(201).json({ message: 'Google registration successful', token: jwtToken });
                });
            }
        });

    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401).json({ error: 'Invalid Google token' });
    }
});

// Protected Route Example for Terminal
app.get('/api/user/profile', authenticateToken, (req, res) => {
    db.get('SELECT email FROM users WHERE id = ?', [req.user.id], (err, user) => {
        if (err || !user) return res.status(404).json({ error: 'User not found' });
        res.json({ email: user.email });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
