import MessageModel from '../models/Message';

export default async ({ text, dialog, userId }) => {
  const message = new MessageModel({ text, creator: userId, creatorName: '' });
  await message.save();
  return  dialog.updateOne({$push: {messages: [message._id]}, last_message: message})
};
