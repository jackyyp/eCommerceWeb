const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err))
};

exports.getIndex = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // });


  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      //magic Sequelize method provided through association
      return cart.getProducts({ where: { id: prodId } })
        .then((products) => {
          res.render('shop/cart', {
            products: products,
            path: '/cart',
            pageTitle: 'Your Cart'
          })
        })
        .catch(err => { console.log(err); })

    })
    .catch(err => { console.log(err) });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      let newQuantity = 1;
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
      }

      return Product.findByPk(prodId)
        .then((product) => {
          //another magical sequelize method automatically created
          return fetchedCart.addProduct(product, {
            through: {
              quantity: newQuantity
            }
          })

        })
        .catch(err => {
          console.log(err);
        })
    })
    .then(() => {
      return res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  //callbacked the product
  Product.findByPk(prodId)
    .then((product) => {
      //the returned product is a single element array.
      res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' });
    }
    ).catch(err => console.log(err));

}
