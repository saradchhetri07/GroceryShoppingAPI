import Joi from "joi";

export const orderSchema = Joi.object({
  status: Joi.string().valid("pending", "completed", "canceled").required(), // Adjust statuses as needed
  totalQuantity: Joi.number().integer().min(1).required(),
  totalPrice: Joi.number().precision(2).positive().required(), // Precision for decimal values
  orderItems: Joi.array()
    .items(
      Joi.object({
        itemId: Joi.number().required(), // Assuming UUID v4 for item_id
        quantity: Joi.number().integer().min(1).required(), // Quantity must be a positive integer
      })
    )
    .min(1)
    .required(), // Ensure the array has at least one item
});
