import mongoose, { Schema, Document, Model } from 'mongoose';

interface AdminAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AdminDocument extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema<AdminDocument>(
  {
    id: {
      type: String,
      default: () => require('crypto').randomBytes(4).toString('hex'),
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true, 
  }
);

const Admin: Model<AdminDocument> =
  mongoose.models.Admin || mongoose.model<AdminDocument>('Admin', AdminSchema);

export default Admin;
