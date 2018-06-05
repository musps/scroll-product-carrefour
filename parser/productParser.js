const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = (body) => {
  let products = [];
  let dom = new JSDOM(body);
  const items = dom.window.document.querySelectorAll('.cd-Product');

  for (let item of items) {
    const itemDetail = item.querySelector('.cd-ProductBVisualImgLink');
    const itemDesc = item.querySelector('.cd-ProductDescription');
    const dataItem = JSON.parse(itemDetail.dataset.gldata);
    const img = itemDetail.querySelector('img');
    const product = {
      'ean': dataItem.product_EAN,
      'name': dataItem.product_name,
      'price': dataItem.product_price,
      'desc': itemDesc.innerHTML.trim(),
      'img': (img.src !== '' ? img.src : img.dataset.src),
    };

    products.push(product);
  }
  return products;
};
