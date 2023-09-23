let Product = require('../no_sql_models/product');


//async for fetching
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.fetchAll();
        console.log(products);
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    } catch (err) {
        console.log(err);
    }

};




exports.postAddProduct = async (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    // no id is needed 
    const product = new Product(title, imageUrl, price, description);
    //async method
    try {
        await product.save();
        console.log('saved');
    } catch (err) {
        console.log(err);
    }
    // only redirect after insertion
    res.redirect('/admin/products');
};

