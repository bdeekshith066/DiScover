const PlanModel = require('../models/Plan');

const createTrip = async (userId, tripDetails) => {
  try {
    const { location, isPrivate, maxParticipants } = tripDetails;
    
    const newPlan = new PlanModel({
      creator: userId,
      location,
      isPrivate,
      maxParticipants,
      // Include other necessary trip details
    });

    await newPlan.save();
    // Logic to create a new trip plan
    
    return { message: 'Trip plan created successfully.' };
  } catch (error) {
    throw new Error('Error creating trip plan.');
  }
};

module.exports = { createTrip };
