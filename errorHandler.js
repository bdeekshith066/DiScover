const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err.stack);
  
    // Handle specific errors based on error status or types
    if (err.status === 404) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = errorHandler;
  