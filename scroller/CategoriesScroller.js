const databaseUrl = 'mongodb://127.0.0.1/api_markets';
const url = 'https://ooshop.carrefour.fr/sitemap';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategoryModel = require('./models/CateogryModel.js')(mongoose);
const categoryParser = require('./parser/CategoryParser.js');
const pageParser = require('./parser/pageParser.js');

mongoose.connect(databaseUrl);
mongoose.connection.on('connected', () => {
  console.log('Mongodb => OK');
});


function saveDb(cursor, path) {
  let query = {
    'cursor': cursor,
    'path': path
  };

  CategoryModel.create(query).then(() => {
    console.log(`Created : ${path}`);
  });
}

pageParser(url)
  .then(resolve => {
    let categories = categoryParser(resolve);

    for (let [cursor, path] of categories.entries()) {
      saveDb(cursor, path);
    }
  }, reject => {
    console.log('error');
  });
