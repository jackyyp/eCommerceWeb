const getDb = require('../util/database').getDb;

class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
    }

    async save() {
        //db should not be const!!
        const db = getDb();
        //db collection  method (i.e table in sql)
        try {
            const res = await db.collection('products').insertOne(this);
            console.log(res);
        } catch (err) {
            console.log(err);
        }

    }
    static async fetchAll() {
        const db = getDb();
        try {
            const products = await db.collection('products').find().toArray();
            return products;
        } catch (err) {
            console.log(err);
        }

    }

    static async findById(prodId) {
        const db = getDb();
        try {
            const product = await db.collection('products').find({ _id: prodId });
            console.log(product);
            return product;
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = Product;
