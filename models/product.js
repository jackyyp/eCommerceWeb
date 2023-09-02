const sequelize = require('../util/database');
const Sequelize = require('sequelize');


const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Product;




/* WHY USE JSON WHEN YOU CAN USE DATABASE? */
//const db= require('../util/database');
// const fs = require('fs');
// const path = require('path');
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );
//const getProductsFromFile = cb => {
  // fs.readFile(p, (err, fileContent) => {
  //   if (err) {
  //     cb([]);
  //   } else {
  //     cb(JSON.parse(fileContent));
  //   }
  // });
//};
// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
// }

//save() {
/*OG METHOD FOR FILE WRITING*/

    // getProductsFromFile(products => {
    //   if (this.id) {
    //     //editing existing
    //     const existingProductIndex = products.findIndex(prod => prod.id === this.id);
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });

    //use ? to prevent sql injection
//     return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
//       [this.title, this.price, this.description, this.imageUrl]
//     );
//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products');
//   }

//   static findById(id, cb) {
//     //getProductsFromFile(products => {
//     //if true , return and store in product
//     // const product = products.find(p => p.id === id);
//     // cb(product);
//     //});

//     /*DB method */
//     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//   }
// };
