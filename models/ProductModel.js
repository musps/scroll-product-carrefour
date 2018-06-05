module.exports = (mongoose) => {

  const ProductSchema = new mongoose.Schema({
    ean: {
      type: String
    },
    name: {
      type: String
    },
    price: {
      type: String
    },
    desc: {
      type: String
    },
    img: {
      type: String
    },
    'category': {
      type: String
    }
  });

  return mongoose.model('Product', ProductSchema);
}