import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  interests: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
