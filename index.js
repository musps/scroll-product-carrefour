const databaseUrl = 'mongodb://127.0.0.1/api_markets';
const url = 'https://ooshop.carrefour.fr/sitemap';
const baseUri = 'https://ooshop.carrefour.fr';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategoryModel = require('./models/CateogryModel.js')(mongoose);
const ProductModel = require('./models/ProductModel.js')(mongoose);
const productParser = require('./parser/productParser.js');
const pageParser = require('./parser/pageParser.js');

mongoose.connect(databaseUrl);
mongoose.connection.on('connected', () => {
  console.log('Mongodb => OK');
});

function saveDb(product, category) {
  let query = product;
  query.category = category;

  ProductModel.create(query).then(() => {
    console.log(`Created : ${product.name}`);
  });
}

let cursor = CategoryModel.find().cursor();

cursor.on('data', (data) => {
  pageParser(baseUri + data.path)
    .then(resolve => {
      let products = productParser(resolve);

      for (let product of products) {
        saveDb(product, data.cursor);
      }
    }, reject => {
      console.log('error');
    });
});
