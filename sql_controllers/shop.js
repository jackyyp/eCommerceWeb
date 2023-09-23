const Product = require('../sql_models/product');
const Cart = require('../sql_models/cart');

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

  const prodId = req.body.productId;

  req.user.getCart()
    .then(cart => {
      //magic Sequelize method provided through association
      return cart.getProducts({ through: { id: prodId } })
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
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      // only 1 product if its in cart , empty otherwise
      console.log(products);

      let product;
      if (products.length >= 0) {
        product = products[0];
      }

      let newQuantity = 1;

      //exist in cart already
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
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
    }
    )
    .then(() => {
      return res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postDeleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;

  return req.user.getCart()
    .then(
      (cart) => { return cart.getProducts({ where: { id: prodId } }) }
    ).then(
      (products) => {
        let product = products[0];
        console.log(product);
        return product.cartItem.destroy();
      }
    ).then(() => {
      return res.redirect('/cart');
    }
    ).catch(err => { console.log(err); })
}

exports.getOrders = (req, res, next) => {
  //eager loading with association correctly set up
  //now each order got a product list 
  req.user.getOrders({ include: 'products' })
    .then((orders) => {
      console.log(orders)
      return res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => { console.log(err); });

};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;

  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user.createOrder()
        .then(order => {
          order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            }));
        })
        .catch(err => { console.log(err); });
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => { console.log(err); });
}

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
