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

exports.getEditProduct =

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

