import mongoose, { Schema } from  'mongoose'

const UserSchema = new Schema({
    login: {
        type: String,
        required: true,
    },
    last_seen: Date
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;