const ChatGroup = require('../models/ChatGroup');

const createChatGroup = async (planId) => {
  try {
    const newChatGroup = new ChatGroup({ planId });
    await newChatGroup.save();

    return { message: 'Chat group created successfully.' };
  } catch (error) {
    throw new Error('Error creating chat group.');
  }
};

module.exports = createChatGroup;
