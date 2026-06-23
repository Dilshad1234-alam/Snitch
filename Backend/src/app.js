import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
import productRouter from "./routes/product.routes.js"
import cartRouter from './routes/cart.routes.js'
import wishlistRouter from './routes/wishlist.routes.js'
import cors from 'cors'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { config } from './config/config.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

// Google Aouth
app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.BACKEND_URL}/api/auth/google/callback`
}, (accessToken, refreshToken, profile, done ) => { 
    return done(null, profile);
}))


app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Snitch backend is running' });
});


app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/wishlist", wishlistRouter)



app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    error: 'Server error',
    message: error.message || 'An unexpected error occurred',
  });
});

export default app;
