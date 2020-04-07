import DialogModel from '../models/Dialog';
import MessageModel from '../models/Message';
import UserModel from '../models/User';
import createMessage from '../utils/createMessage';

const DialogController = {
  create: (req, res) => {
    const postData = {
      name: req.body.name,
      users: [req.user._id],
    };

    const dialog = new DialogModel(postData);
    dialog.save().then((obj) => {
      return res.json({
        status: 'success',
        dialog: obj,
      });
    });
  },

  addUser: async (req, res) => {
    const { dialogId, userId, login } = {
      dialogId: req.body.dialogId,
      userId: req.user._id,
      login: req.user.login,
    };
    try {
      const dialog = await DialogModel.findOne({ _id: dialogId });
      if (dialog.users.indexOf(userId) === -1) {
        await DialogModel.updateOne({ _id: dialogId }, { $push: { users: [userId] } });
        await createMessage({ text: `user ${login} joined`, dialog, userId });
        res.status(200).json({ message: 'user added' });
      } else {
        res.status(409).json({ message: 'user already exists' });
      }
    } catch (error) {
      return res.json(error);
    }
  },
  leaveUser: async (req, res) => {
    try {
      const {dialogId, userId, login} = {
        dialogId: req.body.dialogId,
        userId: req.user._id,
        login: req.user.login,
      };
      const dialog = await DialogModel.findOne({_id: dialogId});
      await DialogModel.updateOne({_id: dialogId},{
        $set: {
          users: dialog.users
              .splice(0, dialog.users.indexOf(userId))
              .concat(
                  dialog.users.splice(
                      dialog.users.indexOf(userId) + 1,
                      dialog.users.length
                  )
              ),
        },
      });
      await createMessage({text: `user ${login} leaved`, dialog, userId});
    }
    catch (e) {
      console.log(e)
    }
  },
  show: (req, res) => {
    const postData = {
      id: req.params.id,
      userId: req.user._id,
    };
    DialogModel.findOne({ _id: postData.id })
      .then(async (dialog) => {
        if (dialog ) {
          if(dialog.users.indexOf(postData.userId) !== -1){
          const messages = await Promise.all(
            dialog.messages.map(async (messageId) => {
              return MessageModel.findOne({ _id: messageId });
            })
          );
          const users = await Promise.all(
            dialog.users.map(async (usersId) => {
              return UserModel.findOne({ _id: usersId });
            })
          );
          return res.json({
            _id: dialog._id,
            name: dialog.name,
            messages,
            users,
          });}
          return res.json({
            message: `User not found`,
          });
        } else {
          return res.json({
            message: `Dialog not found`,
          });
        }
      })
      .catch(() => {
        res.json({
          message: `No messages`,
        });
      });
  },
  allFetch: (req, res) => {
    const userId = req.user._id;
    DialogModel.find({ users: { $in: userId } })
      .then((dialogs) => {
        res.json({
          dialogs,
        });
      })
      .catch(() => {
        res.json({
          message: `Dialogs not found`,
        });
      });
  },
};

export default DialogController;
