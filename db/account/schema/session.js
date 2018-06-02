module.exports = {
  session_id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  role: String,
  super_admin: Boolean,
  issued_date: { type: Date },
  last_request: { type: Date },
};