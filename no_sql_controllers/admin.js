let Product = require('../no_sql_models/product');
const mongodb = require('mongodb');

//async for fetching
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find(); //resolved promise
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    } catch (err) {
        console.log(err);
    }

};

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

exports.postAddProduct = async (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user //convient by mongoose reference 
    });
    //async method
    try {
        await product.save();
    } catch (err) {
        console.log(err);
    }
    // only redirect after insertion
    res.redirect('/admin/products');
};

exports.getEditProduct = async (req, res, next) => {
    //**type : string
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    //start editing.
    const prodId = req.params.productId;
    const product = await Product.findById(prodId);
    if (!product) {
        return res.redirect('/');
    }

    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
    })

};

exports.postEditProduct = async (req, res, next) => {
    // to hv productId  in body , you need a hidden input with name "ProductId"
    const prodId = req.body.productId;





    try {
        const product = await Product.findById(prodId);
        product.title = req.body.title;
        product.imageUrl = req.body.imageUrl;
        product.price = req.body.price;
        product.description = req.body.description;
        product.userId = req.user; //mongoose
        await product.save();
        return res.redirect('/admin/products');

    } catch (err) {
        console.log(err)
    }
}

exports.postDeleteProduct = async (req, res, next) => {
    const prodId = req.body.productId;
    try {
        await Product.findByIdAndRemove(prodId);
        console.log("deleted product");
        res.redirect('/admin/products');
    } catch (err) {
        console.log(err);
    }



}

