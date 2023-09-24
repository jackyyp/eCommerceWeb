const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');


// user has one cart (one-to-one)
class User {
    constructor(username, email, cart, _id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = _id;
    }

    async save() {
        const db = getDb();
        try {
            await db.collection('users').insertOne(this);
        } catch (err) {
            console.log(err);
        }
    }

    //product is an js object.
    async addToCart(product) {
        // const cartProduct=  this.cart.items.findIndex(cp=>{
        //     return cp._id===product._id;
        // });
        const updatedCart = { items: [{ ...product, quantity: 1 }] };
        const db = getDb();
        try {
            return await db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
        } catch (err) {
            console.log(err);
        }
    }

    static async findById(userId) {
        const db = getDb();
        try {
            const user = await db.collection('users').find({ _id: new mongodb.ObjectId(userId) }).next();
            return user;
        } catch (err) {
            console.log(err);
        }
    }

    static async fetchAll() {
    }
}

module.exports = User;