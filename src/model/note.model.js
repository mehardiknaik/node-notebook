import mongoose, { Schema } from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    data: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Note', NoteSchema);
