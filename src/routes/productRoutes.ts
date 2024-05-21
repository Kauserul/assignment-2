import express from "express";
import productController from "../controllers/productController";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);
router.get("/search", productController.searchProduct);

export default router;
