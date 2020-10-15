import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  pass: string;
  perms: string;
}

const userSchema = new Schema({
  name: String,
  pass: String,
  perms: String
});

const User = model<IUser>('User', userSchema);

export default User;
