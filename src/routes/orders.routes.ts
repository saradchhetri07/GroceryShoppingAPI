import express from "express";
import { createOrder, cancelOrder } from "../controllers/orders.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(authenticate);
router.post("/createOrder", createOrder);
router.delete("/:orderId", cancelOrder);

export default router;
