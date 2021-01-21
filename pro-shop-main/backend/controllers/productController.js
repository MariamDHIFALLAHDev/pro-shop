import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route Get /api/products
// @access Public
export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch a single product
// @route Get /api/products/:id
// @access Public
export const getProductByID = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Delete a single product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();

    res.json({
      message: "Product deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create a single product
// @route POST /api/products
// @access Private/Admin
export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: "sample",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "sample brand",
      category: "sample category",
      countInStock: 0,
      numReviews: 0,
      description: "sample",
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (e) {
    console.error(e.toString().red);
    throw new Error(e);
  }
});

// @desc Update a single product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create new product review
// @route POST /api/products/:id
// @access Private
export const addNewProductReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Fetch top products
// @route Get /api/products/top
// @access Public
export const getTopRatedProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});
