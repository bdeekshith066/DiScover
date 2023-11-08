const ChatGroup = require('../models/ChatGroup');

const inviteUserToChatGroup = async (chatGroupId, userId) => {
  try {
    const chatGroup = await ChatGroup.findById(chatGroupId);

    if (!chatGroup) {
      throw new Error('Chat group not found.');
    }

    chatGroup.members.push(userId);
    await chatGroup.save();

    return { message: 'User invited to chat group successfully.' };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = inviteUserToChatGroup;
