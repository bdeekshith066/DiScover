// rateLimiter.js

const rateLimit = require('express-rate-limit');

// Create a rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after some time.',
});

module.exports = limiter;
