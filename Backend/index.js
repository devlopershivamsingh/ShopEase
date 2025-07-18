const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./Config/db');
const routes = require('./Routes/EcommerceRoute');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

// Parse incoming JSON data

app.use(express.json());

// Enable CORS for cross-origin requests with credentials (cookies, headers)

app.use(cors({
  origin: true,
  credentials: true
}));

// Parse cookies from incoming requests
app.use(cookieParser());

// API routes
app.use('/api/v1', routes);

// Health check route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API Home Page!');
});

// Start server after database connection is established
const PORT = process.env.PORT || 8000;
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
});
