import express from "express";
import { validateReqBody } from "../middlewares/validator.middlewares";
import {
  createGroceryItem,
  deleteGroceryItem,
  updateGrocery,
  getGroceryItems,
} from "../controllers/grocery.controllers";
import {
  createGroceryItemSchema,
  updateGroceryItemSchema,
} from "../schema/grocery.schema";
import { authenticate, isSuperUser } from "../middlewares/auth.middleware";

const router = express.Router();
//only super user should be able to access the route

router.use(authenticate);
router.use(isSuperUser());

router.post(
  "/createGrocery",
  validateReqBody(createGroceryItemSchema),
  createGroceryItem
);
router.delete("/:groceryId", deleteGroceryItem);
router.get("/", getGroceryItems);
router.put(
  "/:groceryId",
  validateReqBody(updateGroceryItemSchema),
  updateGrocery
);

export default router;
