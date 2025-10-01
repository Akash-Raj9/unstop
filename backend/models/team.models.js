import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {type: String, required: true},
  event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
  members: [{name: String, email: String, college: String, phone: String}],
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

export const Team = mongoose.model('Team', teamSchema);
