import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  },
  { timestamps: false }
);

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8);
});
UserSchema.pre('updateOne', async function () {
  this._update.password = await bcrypt.hash(this._update.password, 8);
});

UserSchema.methods.isPasswordMatched = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

export default mongoose.model('User', UserSchema);
