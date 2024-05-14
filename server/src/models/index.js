// include all of your models here using CommonJS requires
const User = require("./User.js");
const Model = require("./Model.js")
const Order = require("./Order.js")
const Product = require("./Product.js")
const Review = require("./Review.js")

module.exports = { User, Model, Order, Product, Review };
