import express from "express";
import authRouter from "./auth.routes";
import groceryRouter from "./grocery.routes";
import ordersRouter from "./orders.routes";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/grocery", groceryRouter);
router.use("/orders", ordersRouter);

export default router;
