import { Schema, model, Document } from 'mongoose';

export interface ILscm extends Document {
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
}

const LscmSchema = new Schema({
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
  status: String
});

const LscmForm = model<ILscm>('LscmForm', LscmSchema);

export default LscmForm;
