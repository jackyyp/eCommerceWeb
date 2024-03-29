const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                }
            }
        ]
    }
})

//'User' is what we use now
module.exports = mongoose.model('User', userSchema)


// user has one cart (one-to-one)
// class User {
//     constructor(username, email, cart, _id) {
//         this.username = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = _id;
//     }

//     async save() {
//         const db = getDb();
//         try {
//             await db.collection('users').insertOne(this);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     //product is an js object.
//     async addToCart(product) {


//         const cartProductIdx = this.cart.items.findIndex(cp => {
//             if (!cp) return false;
//             return cp.productId.toString() === product._id.toString();
//         });

//         const updatedCartItems = [...this.cart.items];

//         if (cartProductIdx >= 0) {
//             updatedCartItems[cartProductIdx].quantity += 1;
//         } else {
//             updatedCartItems.push({
//                 productId: new mongodb.ObjectId(product._id),
//                 quantity: 1
//             })
//         }
//         const updatedCart = { items: updatedCartItems };
//         const db = getDb();
//         try {
//             return await db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     static async findById(userId) {
//         const db = getDb();
//         try {
//             const user = await db.collection('users').find({ _id: new mongodb.ObjectId(userId) }).next();
//             return user;
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     //user-cart has 1-1 correspondence, all cart method are also here.

//     //return all the cart-product from cart obj id.
//     async getCartItems() {
//         const db = getDb();
//         const productIds = this.cart.items.map((i) => {
//             return i.productId;
//         })
//         const products = await db.collection('products').find({ _id: { $in: productIds } }).toArray();
//         return products.map((p) => {
//             return {
//                 ...p,
//                 quantity: this.cart.items.find(i => {
//                     return i.productId.toString() === p._id.toString();
//                 }).quantity
//             };
//         })
//     }

//     async deleteCartItem(productId) {
//         const db = getDb();
//         const updatedCartItems = this.cart.items.filter((i) => {
//             return i.productId.toString() !== productId.toString();
//         })
//         return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: updatedCartItems } } });
//     }

//     async addOrder() {
//         const db = getDb();
//         const items = await this.getCartItems();
//         const order = {
//             items: items,
//             user: {
//                 _id: new mongodb.ObjectId(this._id)
//             }
//         }

//         // not an snapshot of the product
//         try {
//             await db.collection('orders').insertOne(order);
//             return await db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: [] } } });
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     async getOrders() {
//         const db = getDb();
//         try {
//             return await db.collection('orders').find({ 'user._id': new mongodb.ObjectId(this._id) }).toArray();
//         } catch (err) {
//             console.log(err);
//         }

//     }

// }


// module.exports = User;