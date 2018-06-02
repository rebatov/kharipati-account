module.exports = {
  name: { type: String },
  user: { type: String },
  last_amount: { type: Number },
  created_date: { type: Date },
  updated_date: { type: Date },
  created_by: { type: String },
  updated_by: { type: String },
  type: { type: String }, // type either 'sale' or 'buy'
  product: { type: Object },
  amount: { type: String },
};