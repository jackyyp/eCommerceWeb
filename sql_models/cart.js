

const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define(
    'cart',
    {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        }
    }
);



module.exports = Cart;

//DEPRECATED old method with file writing and C
// const fs = require('fs');
// const path = require('path');

// const p = path.join(path.dirname(process.mainModule.filename),
//     'data',
//     'cart.json',
// );

// module.exports = class Cart {
//     //only one cart is needed => static method
//     static addProduct(id, productPrice) {
//         //fetch the previous cart ,
//         fs.readFile(p, (err, fileContent) => {
//             let cart = { products: [], totalPrice: 0 };
//             if (!err) {
//                 cart = JSON.parse(fileContent);
//             }
//             const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
//             const existingProduct = cart.products[existingProductIndex];
//             let updatedProduct;
//             if (existingProduct) {
//                 updatedProduct = { ...existingProduct };
//                 updatedProduct.qty += 1;
//                 cart.products = [...cart.products]; //copy
//                 cart.products[existingProductIndex] = updatedProduct;
//             } else {
//                 updatedProduct = { id: id, qty: 1 };
//                 cart.products = [...cart.products, updatedProduct];
//             }
//             cart.totalPrice += +productPrice;
//             fs.writeFile(p, JSON.stringify(cart), err => {
//                 console.log(err);
//             });
//         })

//         // find existing product
//         //add or increase qty
//     }


// }