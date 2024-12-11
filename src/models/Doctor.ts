import mongoose, { Schema, Document, Model } from 'mongoose';

interface DoctorAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
  specialization: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DoctorDocument extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  specialization: string;
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema: Schema = new Schema<DoctorDocument>(
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
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor: Model<DoctorDocument> =
  mongoose.models.Doctor || mongoose.model<DoctorDocument>('Doctor', DoctorSchema);

export default Doctor;
