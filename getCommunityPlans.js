const PlanModel = require('../models/Plan');

const getCommunityPlans = async () => {
  try {
    const communityPlans = await PlanModel.find({}); // Fetch all community plans
    return communityPlans;
  } catch (error) {
    throw new Error('Error fetching community plans.');
  }
};

module.exports = getCommunityPlans;
