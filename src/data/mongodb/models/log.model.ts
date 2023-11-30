import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  level: { type: String, required: true, enum: ['low', 'medium', 'high'] },
  message: { type: String, required: true },
  origin: { type: String },
  createdAt: { type: Date, default: new Date() },
});

export const LogModel = mongoose.model('Log', LogSchema);
