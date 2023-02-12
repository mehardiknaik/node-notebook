import mongoose, { Types } from "mongoose";
const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    data: { type: String, required: true },
    userId: { type: Types.ObjectId, require: true }
}, { timestamps: true })

export default mongoose.model('Note', NoteSchema)