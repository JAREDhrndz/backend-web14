// src/models/Ordenes.ts
import { model, Schema, Document, Types } from "mongoose";

interface IOrderProduct {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    userId: string;
    total: number;
    subtotal: number;
    status: string;
    createdDate: Date;
    updatedDate: Date;
    products: IOrderProduct[];
}

const orderProductSchema = new Schema<IOrderProduct>({
    productId: { 
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true, 
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {_id: false});

const OrderSchema = new Schema<IOrder>({
    userId: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    products: {
        type: [orderProductSchema],
        required: true,
        validate: [(array: string | any[]) => array.length > 0, 'Debe contener al menos un producto']
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

export const Order = model<IOrder>('Order', OrderSchema);