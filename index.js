const express = require('express');
const { json, urlencoded } = require('express');
const { serve, setup } = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// ROUTES
const userRoutes = require('./src/routes/user');
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/product');
const transactionRoutes = require('./src/routes/transaction');

const app = express();
app.use(json());
app.use(helmet());
app.use(urlencoded({ extended: true }));

// SWAGGER
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Title',
      version: '1.0.0',
      description: 'API Description',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', serve, setup(swaggerSpec));

// USER
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// PRODUCT
app.use('/api/products', productRoutes);

// TRANSACTION
app.use('/api/transactions', transactionRoutes);

app.use((req, res, next) => {
  res.status(404).send({ error: true, message: 'Route bulunamadı!', result: null });
  next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} üzerinde çalışıyor.`);
});
