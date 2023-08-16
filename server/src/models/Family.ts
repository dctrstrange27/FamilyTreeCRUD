import mongoose, { Document, Schema, Model } from 'mongoose';

interface IFamily {
  familyName: string;
  mother: string;
  father: string;
  children: string[];
}

interface IFamilyDocument extends IFamily, Document {}

const familySchema: Schema<IFamilyDocument> = new Schema({
  familyName: { type: String, required: true },
  mother: { type: String, required: true },
  father: { type: String, required: true },
  children: [{ type:[] }],
});

const Family: Model<IFamilyDocument> = mongoose.model<IFamilyDocument>('Family', familySchema);

export default Family;