const ChatGroup = require('../models/ChatGroup');

const adminMessagingPrivileges = async (chatGroupId, userId) => {
  try {
    const chatGroup = await ChatGroup.findById(chatGroupId);

    if (!chatGroup) {
      throw new Error('Chat group not found.');
    }

    if (chatGroup.admin === userId) {
      // Logic to grant admin messaging privileges to a specific user
      chatGroup.adminCanMessage.push(userId);
      await chatGroup.save();

      return { message: 'Admin messaging privileges granted successfully.' };
    } else {
      throw new Error('Only group admin can grant privileges.');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = adminMessagingPrivileges;
