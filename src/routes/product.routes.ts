// src/routes/product.routes.ts
import { Router } from "express";
import { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} from "../controllers/product.controller";

const router = Router();

router.post("/", createProduct);          // POST /api/products
router.get("/", getProducts);            // GET /api/products (solo activos)
router.get("/:id", getProductById);      // GET /api/products/:id
router.put("/:id", updateProduct);       // PUT /api/products/:id
router.delete("/:id", deleteProduct);    // DELETE /api/products/:id (baja lógica)

export default router;