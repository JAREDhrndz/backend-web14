// src/index.ts
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import connectDBmongo from './config/db';

const app: Application = express(); // <-- Solo esta declaración
const PORT = process.env.PORT || 3000; // <-- Usa variable de entorno para producción

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

// Conexión a MongoDB
connectDBmongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto: ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error de conexión a MongoDB:', err);
    process.exit(1); // <-- Termina el proceso si hay error
  });