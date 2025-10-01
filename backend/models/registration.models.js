import mongoose from "mongoose";

const regSchema = new mongoose.Schema({
  event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
  team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
  name: {type: String, required: true},
  email: {type: String, required: true},
  college: {type: String},
  phone: {type: String},
}, {timestamps: true});


export const Registration = mongoose.model('Registration', regSchema);
