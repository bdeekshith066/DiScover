const PlanModel = require('../models/Plan');

const viewAllTripPlans = async () => {
  try {
    const allTripPlans = await PlanModel.find().populate('creator', 'username');
    // Include logic for fetching all trip plans

    return allTripPlans;
  } catch (error) {
    throw new Error('Error fetching all trip plans.');
  }
};

module.exports = { viewAllTripPlans };
