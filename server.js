const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from public/
app.use(express.static('public'));

// Define API Routes
app.use('/api/users', require('./server/routes/api/users'));
app.use('/api/auth', require('./server/routes/api/auth'));
app.use('/api/profile', require('./server/routes/api/profile'));
app.use('/api/posts', require('./server/routes/api/posts'));

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5025;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));