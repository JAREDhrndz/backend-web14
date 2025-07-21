// src/routes/order.routes.ts
import { Router } from "express";
import { 
    createOrder, 
    markOrderAsPaid, 
    cancelOrder, 
    getAllOrders 
} from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);                // POST /api/orders
router.get("/", getAllOrders);               // GET /api/orders (todas)
router.patch("/:orderId/pay", markOrderAsPaid);  // PATCH /api/orders/:orderId/pay
router.patch("/:orderId/cancel", cancelOrder);   // PATCH /api/orders/:orderId/cancel

export default router;