const PlanModel = require('../models/Plan');

const markPlanAsFeatured = async (planId, isAdmin) => {
  try {
    if (!isAdmin) {
      throw new Error('Unauthorized access. Admin permission required.');
    }

    const plan = await PlanModel.findById(planId);

    if (!plan) {
      throw new Error('Plan not found.');
    }

    plan.isFeatured = true;
    await plan.save();

    return { message: 'Plan marked as featured successfully.' };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = markPlanAsFeatured;
