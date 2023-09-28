const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' // referring to User obj by mongoose
    }

});

//'Product' is what we work with.
module.exports = mongoose.model('Product', productSchema);


// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');
// class Product {
//     constructor(title, imageUrl, price, description, id, userId) {
//         this.title = title
//         this.imageUrl = imageUrl
//         this.price = price
//         this.description = description
//         this._id = id ? new mongodb.ObjectId(id) : null
//         this.userId = userId
//     }

//     //upsert
//     async save() {
//         //db should not be const!!
//         const db = getDb();
//         //db collection  method (i.e table in sql)
//         if (this._id) {
//             try {
//                 await db.collection('products').updateOne({ _id: this._id }, { $set: this });
//             } catch (err) {
//                 console.log(err);
//             }
//         } else {
//             try {
//                 await db.collection('products').insertOne(this);
//             } catch (err) {
//                 console.log(err);
//             }
//         }

//     }
//     static async deleteById(prodId) {
//         const db = getDb();
//         try {
//             await db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     static async fetchAll() {
//         const db = getDb();
//         try {
//             const products = await db.collection('products').find().toArray();
//             return products;
//         } catch (err) {
//             console.log(err);
//         }

//     }

//     static async findById(prodId) {
//         const db = getDb();
//         try {
//             // find return a cursor , not the element. use next() to retrieve the element
//             const product = await db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next();
//             return product;
//         } catch (err) {
//             console.log(err);
//         }
//     }

// }

// module.exports = Product;
