import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import connectDBmongo from './config/db';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
   origin: ['https://anarka.shop', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// Conexión a MongoDB y levantar servidor
connectDBmongo().then(() => {
  app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto: ${PORT}`);
  });
}).catch(err => {
  console.error('Error conectando a la base de datos:', err);
});
