const User = require('../models/user');

const followUser = async (userId, userToFollowId) => {
  try {
    const user = await User.findById(userId);
    const userToFollow = await User.findById(userToFollowId);

    if (!user || !userToFollow) {
      throw new Error('User not found.');
    }

    if (user.following.includes(userToFollowId)) {
      throw new Error('Already following the user.');
    }

    user.following.push(userToFollowId);
    userToFollow.followers.push(userId);

    await user.save();
    await userToFollow.save();

    return { message: 'User followed successfully.' };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = followUser;
