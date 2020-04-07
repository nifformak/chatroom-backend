import mongoose, { Schema } from 'mongoose';

const DialogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    messages: [Schema.Types.ObjectId],
    users: [Schema.Types.ObjectId],
    last_message: Schema.Types.Object,
  },
  {
    timestamps: true,
  }
);

const DialogModel = mongoose.model('Dialog', DialogSchema);

export default DialogModel;
