const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
//const db = require('./util/database');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const OrderItem = require('./models/order-item');
const Order = require('./models/order');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//SQL syntax
//db.execute('SELECT * FROM products');


//**THESE are just middleware,only executed for incoming request.
app.use(bodyParser.urlencoded({ extended: false }));
//static website css & js 
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next(); //continue with next middleware.
        })
        .catch(err => {
            console.log(err);
        });
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//database relation model
//when delete product, its also delete on all users's product
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });


//reflect new changes, force change
// sync({force:true})

//the start of npm start
sequelize
    .sync({ force: true })
    .then(res => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: "TestingObj1", email: "abc@gmail.com" });
        }
        return user;
    })
    .then(user => {
        user.getCart().then((cart) => {
            if (!cart) {
                return user.createCart();
            }
            return user;
        })
            .then(() => {
                return app.listen(3000);

            }
            ).catch(err => { console.log(err) })
    })
    .catch(err => {
        console.log(err);
    });


//set the port    

