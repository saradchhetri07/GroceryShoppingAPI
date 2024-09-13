import express from "express";
import {
  createOrder,
  cancelOrder,
  getAvailableGrocery,
} from "../controllers/orders.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateReqBody } from "../middlewares/validator.middlewares";
import { orderSchema } from "../schema/order.schema";

const router = express.Router();

router.use(authenticate);
router.post("/createOrder", validateReqBody(orderSchema), createOrder);
router.delete("/:orderId", cancelOrder);
router.get("/", getAvailableGrocery);

export default router;
