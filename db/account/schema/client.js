module.exports = {
  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  email: { type: String },
  last_amount: { type: Number },
  created_date: { type: Date },
  updated_date: { type: Date },
};