import { Schema, model, Document } from 'mongoose';

export interface IFirm extends Document {
  name: string;
  idea: string;
  owner: string;
  expects: string;
  old: number;
  type: string;
  headquarters: string;
  members: number;
  dc: string;
  hex: string;
  formType: string;
  status: string;
  reason: string;
  submissionDate: Date;
}

const FirmSchema = new Schema({
  name: String,
  idea: String,
  owner: String,
  expects: String,
  old: Number,
  headquarters: String,
  members: Number,
  dc: String,
  hex: String,
  formType: String,
  status: String,
  reason: String,
  submissionDate: Date
});

const FirmForm = model<IFirm>('FirmForm', FirmSchema);

export default FirmForm;
