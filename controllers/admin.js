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



  //method to call for product
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect('/');
  //   })
  //   .catch(err => console.log(err));


  //sequelize object : magic only avail in sequelize
  // after association,method are now avail to associated obj.
  // user hasMany product  (relation)

  //otherwise , we still use Product.create method with userId specified.

  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    userId: req.user.id // as defined in app.js
  }).then(() => { console.log(res); return res.redirect('/products'); }).catch(err => console.log(err));


  // only redirect after insertion
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  //**type : string
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  //start editing.
  const prodId = req.params.productId;
  Product.findByPk(prodId).then(product => {
    if (!product) {
      return res.redirect('/');
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
  Product.findByPk(prodId).then((product) => {

    product.title = req.body.title
    product.imageUrl = req.body.imageUrl
    product.price = req.body.price
    product.description = req.body.description
    return product.save();
  })
    .then(() => {
      console.log("updated");
      res.redirect('/admin/products');
    }
    ).catch(err => { console.log(err) })
  // put it in the then(), after the promise is resolved

}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);

  Product.findByPk(prodId).then(product => {
    return product.destroy();
  })
    .then(() => {
      console.log("deleted product");
      res.redirect('/admin/products');
    }
    ).catch(err => console.log(err));

}
