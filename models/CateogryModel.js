module.exports = (mongoose) => {

  const CategorySchema = new mongoose.Schema({
    cursor: {
      type: Number,
      unique: true
    },
    path: {
      type: String,
      unique: true
    },
    state: {
      type: Boolean,
      default: false
    }
  });

  return mongoose.model('Category', CategorySchema);
}
