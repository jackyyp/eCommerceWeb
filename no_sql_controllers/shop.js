const Product = require('../no_sql_models/product');
const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');


exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.fetchAll();

        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        })

    } catch (err) {
        console.log(err);
    }
}

exports.getProduct = async (req, res, next) => {
    const prodId = req.params.productId;
    try {
        const product = await Product.findById(new mongodb.ObjectId(prodId));
        res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' });
    } catch (err) {
        console.log(err);
    }

}

exports.getCart = async (req, res, next) => {
    const prodId = req.body.productId;
    const cartItems = await req.user.getCartItems();

    return res.render('shop/cart', {
        products: cartItems,
        path: '/cart',
        pageTitle: 'Your Cart'
    })
};

exports.postCart = async (req, res, next) => {
    const prodId = req.body.productId;
    const product = await Product.findById(prodId);
    await req.user.addToCart(product);
    res.redirect('/cart');
}
//     let fetchedCart;
//     req.user.getCart()
//       .then(cart => {
//         fetchedCart = cart;
//         return cart.getProducts({ where: { id: prodId } });
//       })
//       .then(products => {
//         // only 1 product if its in cart , empty otherwise
//         console.log(products);

//         let product;
//         if (products.length >= 0) {
//           product = products[0];
//         }

//         let newQuantity = 1;

//         //exist in cart already
//         if (product) {
//           const oldQuantity = product.cartItem.quantity;
//           newQuantity = oldQuantity + 1;
//           return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
//         }

//         return Product.findByPk(prodId)
//           .then((product) => {
//             //another magical sequelize method automatically created
//             return fetchedCart.addProduct(product, {
//               through: {
//                 quantity: newQuantity
//               }
//             })

//           })
//           .catch(err => {
//             console.log(err);
//           })
//       }
//       )
//       .then(() => {
//         return res.redirect('/cart');
//       })
//       .catch(err => {
//         console.log(err);
//       })

exports.postDeleteCartProduct = async (req, res, next) => {
    const prodId = req.body.productId;
    await req.user.deleteCartItem(prodId);
    res.redirect('/cart');
}


exports.getIndex = async (req, res, next) => {
    try {
        const products = await Product.fetchAll();

        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });

    } catch (err) {
        console.log(err);
    }
};

