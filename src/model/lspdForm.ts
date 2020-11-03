import { Schema, model, Document } from 'mongoose';

export interface ILspd extends Document {
  name: string;
  date: string;
  act: string;
  bring: string;
  action: string;
  old: number;
  whyU: string;
  experience: string;
  hoursPerDay: number;
  dc: string;
  hex: string;
  formType: string;
  status: string;
  reason: string;
}

const LspdSchema = new Schema({
  name: String,
  date: String,
  act: String,
  bring: String,
  action: String,
  old: Number,
  whyU: String,
  experience: String,
  hoursPerDay: String,
  dc: String,
  hex: String,
  formType: String,
  status: String,
  reason: String
});

const LspdForm = model<ILspd>('LspdForm', LspdSchema);

export default LspdForm;
