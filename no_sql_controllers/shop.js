const Product = require('../no_sql_models/product');
const getDb = require('../util/database').getDb;

exports.getProducts = async (req, res, next) => {

    try {
        const products = await Product.fetchAll();
        return res.render('/products', {
            prods: products,
            pageTitle: 'Products',
            path: '/products'
        })

    } catch (err) {
        console.log(err);
    }
}