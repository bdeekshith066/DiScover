const PlanModel = require('../models/Plan');

const getFilteredCommunityPlans = async (filterType) => {
  let filteredPlans;
  try {
    if (filterType === 'withinCity') {
      filteredPlans = await PlanModel.find({ location: 'withinCity' });
    } else if (filterType === 'cityOutskirts') {
      filteredPlans = await PlanModel.find({ location: 'cityOutskirts' });
    } else if (filterType === 'beyondCity') {
      filteredPlans = await PlanModel.find({ location: 'beyondCity' });
    }
    return filteredPlans;
  } catch (error) {
    throw new Error('Error fetching filtered plans from the community.');
  }
};

module.exports = getFilteredCommunityPlans;
