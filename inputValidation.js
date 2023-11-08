// inputValidation.js

// Validate user input for specific fields
const validateUserInput = (userInput) => {
    // Implement your validation logic here for user input
    if (typeof userInput !== 'string') {
      throw new Error('User input should be a string.');
    }
  
    // Additional validation rules can be added as needed
  };
  
  // Validate email input
  const validateEmail = (email) => {
    // Simple email validation example
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format.');
    }
  };
  
  module.exports = { validateUserInput, validateEmail };
  