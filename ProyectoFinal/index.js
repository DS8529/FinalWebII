import express from 'express'
import session from 'express-session';
import 'dotenv/config';
import { routerPrinters } from './routes/index.js';
import { writeLog } from './utils/files.js';
import { configurePassport } from './config/passport.js';
import { cartRouter } from "./routes/cart.router.js";

const app = express();


app.use(
    session({
        secret: process.env.SESSION_SECRET || 'es un secreto',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } 
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'))


configurePassport(app);


app.use((req, res, next) => {
    console.log('Middleware');
    writeLog(req);
    next();
})

app.use("/cart", cartRouter);
routerPrinters(app)

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})
