import 'dotenv/config';
import express from 'express';
import productsRoute from './components/products/products.route.js';
import usersRoute from './components/users/users.route.js';
import authRoute from './components/authentication/authentication.route.js';
import errorMiddleware from './middleware/error.middleware.js';
import verifyToken from './middleware/verifyToken.middleware.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoute);
app.use('/products', productsRoute);
app.use('/users', verifyToken, usersRoute);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});