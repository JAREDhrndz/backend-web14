// src/controllers/product.controller.ts
import { Request, Response } from "express";
import { Product } from "../models/Products";

// Crear producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description, stock } = req.body;
        const newProduct = new Product({ name, price, description, stock });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear producto", error });
    }
};

// En tu archivo product.controller.ts
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ 
      status: true,
      deletedAt: { $exists: false } // ← Esto podría estar filtrando el producto RGB
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// Obtener producto por ID (solo si está activo)
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({ 
            _id: req.params.id, 
            status: true 
        });
        if (!product) return res.status(404).json({ message: "Producto no encontrado o dado de baja" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto" });
    }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { ...req.body, updatedAt: new Date() }, 
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto" });
    }
};

// "Eliminar" (baja lógica)
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(
            id,
            { status: false, deletedAt: new Date() }, // Marcamos como inactivo
            { new: true }
        );
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto dado de baja", product });
    } catch (error) {
        res.status(500).json({ message: "Error al dar de baja el producto" });
    }
};