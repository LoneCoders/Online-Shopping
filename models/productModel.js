const mongoose = require('mongoose');
const slugify = require('slugify');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name of the product'],
    unique: true,
    trim: true,
  },
  tag: {
    type: String,
    default: 'home',
    enum: {
      values: ['home', 'dress', 'electronics', 'furniture', 'gadgets'],
      message: '{VALUE} is not supported',
    },
    select: false,
  },
  slug: String,
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
  },
  summary: String,
  description: String,
  imageCover: {
    type: String,
    required: [true, 'A product must have a coverImage'],
  },
  images: {
    type: [String],
    required: [true, 'A product must have atleast one image'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// document middleware used to set value to slug field
productSchema.pre('save', function (next) {
  //this points to current document
  this.slug = slugify(this.name, { lowercase: true });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
