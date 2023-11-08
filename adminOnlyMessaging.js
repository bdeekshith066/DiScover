const ChatGroup = require('../models/ChatGroup');

const adminOnlyMessaging = async (chatGroupId, userId) => {
  try {
    const chatGroup = await ChatGroup.findById(chatGroupId);

    if (!chatGroup) {
      throw new Error('Chat group not found.');
    }

    if (chatGroup.admin === userId) {
      // Logic to enable admin-only messaging in the chat group
      chatGroup.onlyAdminCanMessage = true;
      await chatGroup.save();

      return { message: 'Admin-only messaging enabled successfully.' };
    } else {
      throw new Error('Only group admin can enable admin-only messaging.');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = adminOnlyMessaging;
