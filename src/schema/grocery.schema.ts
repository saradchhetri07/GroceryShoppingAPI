import Joi from "joi";

export const createGroceryItemSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "name is required",
    "string.empty": "name cannot be empty",
  }),

  price: Joi.number()
    .positive()
    .required()
    .custom((value, helpers) => {
      // Ensure precision is up to 2 decimal places
      const roundedValue = parseFloat(value.toFixed(2));
      if (roundedValue !== value) {
        return helpers.error("number.precision");
      }
      return roundedValue;
    })
    .messages({
      "any.required": "price is required",
      "number.base": "price must be a valid number",
      "number.positive": "price must be a positive number",
      "number.precision": "price must have up to 2 decimal places",
    }),

  inventoryLevel: Joi.number().integer().min(0).required().messages({
    "any.required": "inventory level is required",
    "number.base": "inventory level must be a valid number",
    "number.integer": "inventory level must be an integer",
    "number.min": "inventory level cannot be less than 0",
  }),
}).options({
  stripUnknown: true, // This will remove any unknown fields
});

export const updateGroceryItemSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "name cannot be empty",
  }),

  price: Joi.number()
    .positive()
    .optional()
    .custom((value, helpers) => {
      // Ensure precision is up to 2 decimal places
      const roundedValue = parseFloat(value.toFixed(2));
      if (roundedValue !== value) {
        return helpers.error("number.precision");
      }
      return roundedValue;
    })
    .messages({
      "number.base": "price must be a valid number",
      "number.positive": "price must be a positive number",
      "number.precision": "price must have up to 2 decimal places",
    }),

  inventoryLevel: Joi.number().integer().min(0).optional().messages({
    "number.base": "inventory level must be a valid number",
    "number.integer": "inventory level must be an integer",
    "number.min": "inventory level cannot be less than 0",
  }),
}).options({
  stripUnknown: true, // This will remove any unknown fields
});
