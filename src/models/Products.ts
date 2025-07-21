// src/models/Products.ts
import { model, Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    status: boolean; // true = activo, false = dado de baja
    description: string;
    stock: number;
    deletedAt?: Date; // Opcional: fecha de "baja"
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true }, // Por defecto activo
    description: { type: String, required: true },
    stock: { type: Number, default: 0 },
    deletedAt: { type: Date } // Solo se llena al dar de baja
}, { 
    timestamps: true, // Crea createdAt y updatedAt automáticamente
    versionKey: false 
});

export const Product = model<IProduct>('Product', ProductSchema);