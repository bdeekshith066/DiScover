const ChatGroup = require('../models/ChatGroup');

const userAdminCommunication = async (chatGroupId, userId, message) => {
  try {
    const chatGroup = await ChatGroup.findById(chatGroupId);

    if (!chatGroup) {
      throw new Error('Chat group not found.');
    }

    if (chatGroup.members.includes(userId) || chatGroup.admin === userId) {
      // Logic to enable communication between users and the admin in the chat group
      chatGroup.messages.push({ user: userId, message });
      await chatGroup.save();

      return { message: 'User-admin communication added successfully.' };
    } else {
      throw new Error('Unauthorized access.');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = userAdminCommunication;
