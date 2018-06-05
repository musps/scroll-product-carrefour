const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = (body) => {
  let dom = new JSDOM(body);
  let items = dom.window.document.querySelectorAll('.cd-SiteMap-level2Name span a');
  let categories = [];

  for (let item of items) {
    categories.push(item.getAttribute('href'));
  }
  return categories;
};
