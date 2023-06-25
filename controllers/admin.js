const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  //**type : string
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/');
  }

  //start editing.
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
  })
};

exports.postEditProduct = (req, res, next) => {

  // to hv productId  in body , you need a hidden input with name "ProductId"
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    const newId = prodId
    const newTitle = req.body.title
    const newImageUrl = req.body.imageUrl
    const newPrice = req.body.price
    const newDescription = req.body.description
    const newProduct = new Product(newId, newTitle, newImageUrl, newDescription, newPrice);
    newProduct.save();
  })
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
