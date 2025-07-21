// src/controllers/order.controller.ts
import { Request, Response } from "express";
import { Order } from "../models/Ordenes";

// Crear orden (ya lo tienes)
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, status, products } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Debe haber al menos un producto" });
        }

        const subtotal = products.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

        const newOrder = new Order({
            userId,
            status,
            products,
            subtotal,
            total: subtotal,
            createdDate: new Date(),
            updatedDate: new Date()
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);

    } catch (error) {
        res.status(500).json({ message: "Error al crear orden", error });
    }
};

// Actualizar orden a "Pagada"
export const markOrderAsPaid = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { 
                status: "Pagada",
                updatedDate: new Date() 
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json(updatedOrder);

    } catch (error) {
        res.status(500).json({ message: "Error al actualizar orden", error });
    }
};

// Cancelar orden (status = "Cancelada")
export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;

        const canceledOrder = await Order.findByIdAndUpdate(
            orderId,
            { 
                status: "Cancelada",
                updatedDate: new Date() 
            },
            { new: true }
        );

        if (!canceledOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json(canceledOrder);

    } catch (error) {
        res.status(500).json({ message: "Error al cancelar orden", error });
    }
};

// Obtener TODAS las órdenes (sin filtros)
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find(); // Sin condiciones
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener órdenes", error });
    }
};