import { Schema, model, Document } from 'mongoose';

export interface IOrg extends Document {
  name: string;
  idea: string;
  story: string;
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
}

const OrgSchema = new Schema({
  name: String,
  idea: String,
  story: String,
  owner: String,
  expects: String,
  old: Number,
  headquarters: String,
  members: Number,
  dc: String,
  hex: String,
  formType: String,
  status: String
});

const OrgForm = model<IOrg>('OrgForm', OrgSchema);

export default OrgForm;
