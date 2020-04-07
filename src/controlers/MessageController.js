import MessageModel from "../models/Message";
import DialogModel from "../models/Dialog";

const MessageController = ({
    create: async (req, res) => {
        const postData = {
            text: req.body.text,
            creator: req.user._id,
            creatorName: req.user.login
        };

        const message = new MessageModel(postData);
        const dialog = await DialogModel.findOne({_id: req.body.dialogId});
        if (dialog && dialog.users.indexOf(postData.creator) !== -1) {
            const messageDate = await message.save();
            await DialogModel.findOneAndUpdate(
                {_id: req.body.dialogId},
                {$push: {messages: [messageDate._id]}, last_message: messageDate},
                {new: true});
            return res.json({messageDate})
        }else {
            return  res.status(403).json({message: 'No access'})
        }
    },
});


export default MessageController;