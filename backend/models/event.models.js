import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  date: {type: Date, required: true},
  description: {type: String},
  venue: {type: String},
  maxTeamSize: {type: Number, default: 4},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

export const Event = mongoose.model('Event', eventSchema);
