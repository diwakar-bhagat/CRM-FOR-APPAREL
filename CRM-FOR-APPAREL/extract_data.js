const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('legacy_dashboard.html', 'utf8');
const $ = cheerio.load(html);

const orders = [];

$('table.sticky-table tbody tr').each((i, row) => {
  const tds = $(row).find('td');
  if (tds.length < 11) return; // Skip if not a full data row

  const imageSrc = $(tds[0]).find('img').attr('src') || '';
  const refNo = $(tds[1]).text().trim();
  const orderDate = $(tds[2]).text().trim();
  const deliveryDate = $(tds[3]).text().trim();
  const targetPfhDate = $(tds[4]).text().trim();
  const targetPcdDate = $(tds[5]).text().trim();
  const buyer = $(tds[6]).text().trim();
  const brand = $(tds[7]).text().trim();
  const styleNo = $(tds[8]).text().trim();
  const styleName = $(tds[9]).text().trim();
  const orderQty = $(tds[10]).text().trim();

  // Clean data
  orders.push({
    refNo,
    orderDate,
    deliveryDate,
    targetPfhDate,
    targetPcdDate,
    buyer,
    brand,
    styleNo,
    styleName,
    orderQty: parseFloat(orderQty.replace(/,/g, '')) || 0,
    imageSrc: imageSrc.startsWith('data:image') ? imageSrc : ''
  });
});

fs.writeFileSync('legacy_data.json', JSON.stringify(orders, null, 2));
console.log(`Extracted ${orders.length} orders.`);
