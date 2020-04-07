import UserModel from "../models/User";
import createJWToken from '../utils/createJWToken';


const UserController = ({
    index: async (req, res) => {
       const user = await UserModel.findOne({_id:  req.user._id});
       return res.json({
            status: 'success',
            user
        })
    },
    login: (req, res) => {
        const postData = {
            login: req.body.login
        };

        const user = new UserModel(postData);
        user.save().then((obj) => {
            const token = createJWToken(user);
            return res.json({
                status: 'success',
                token,
                user: obj
            })
        });
    },
});

export default UserController;