const catchAsync = require('./../utils/catchAsync');
const Product = require('./../models/productModel');

const getData = (tag = '', file, bool = false) => {
  // define filter
  const filter =
    tag === ''
      ? {
          $or: [{ tagName: tag }, { home: bool }],
        }
      : { tagName: tag };

  return catchAsync(async (req, res, next) => {
    const products = await Product.find(filter);
    res.status(200).render(file, {
      products,
    });
  });
};
// tags: home,grocery,dress,electronics,furniture,gadgets
exports.getOverview = getData('', 'overview', true);

exports.getGrocery = getData('grocery', 'Grocery');

exports.getDress = getData('dress', 'Dress');

exports.getElectronics = getData('electronics', 'Electronics');

exports.getFurniture = getData('furniture', 'Furniture');

exports.getGadgets = getData('gadgets', 'Gadgets');
