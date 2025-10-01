import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  college: {type: String},
  phone: {type: String},
  password: {type: String}, 
  role: {type: String, enum: ['user','admin'], default: 'user'}
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

userSchema.methods.matchPassword = function(password){
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;