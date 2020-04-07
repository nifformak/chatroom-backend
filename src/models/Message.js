import mongoose, {Schema} from 'mongoose'

const MessageSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    creator: Schema.Types.ObjectId,
    creatorName: String
}, {
    timestamps: true
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;