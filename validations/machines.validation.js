const Joi = require("joi");

exports.MachineValidation = (body) => {
  const schema = Joi.object({
    category_id: Joi.number().required().messages({
      "number.base": "Category_id raqam bo‘lishi kerak.",
      "any.required": "Category_id majburiy maydon.",
    }),
    status: Joi.string()
      .valid("active", "inactive", "maintenance")
      .required()
      .messages({
        "any.only":
          "Status faqat 'active', 'inactive' yoki 'maintenance' bo‘lishi mumkin.",
        "any.required": "Status majburiy maydon.",
      }),
    location: Joi.string().min(3).max(255).required().messages({
      "string.empty": "Location bo‘sh bo‘lishi mumkin emas.",
      "string.min": "Location kamida 3 ta belgidan iborat bo‘lsin.",
      "string.max": "Location 255 belgidan oshmasin.",
      "any.required": "Location majburiy maydon.",
    }),
    name: Joi.string().min(2).max(255).required().messages({
      "string.empty": "Name bo‘sh bo‘lishi mumkin emas.",
      "string.min": "Name kamida 2 ta belgidan iborat bo‘lsin.",
      "string.max": "Name 255 belgidan oshmasin.",
      "any.required": "Name majburiy maydon.",
    }),
    model: Joi.string().min(2).max(255).required().messages({
      "string.empty": "Model bo‘sh bo‘lishi mumkin emas.",
      "string.min": "Model kamida 2 ta belgidan iborat bo‘lsin.",
      "string.max": "Model 255 belgidan oshmasin.",
      "any.required": "Model majburiy maydon.",
    }),
    description: Joi.string().min(5).max(255).required().messages({
      "string.empty": "Description bo‘sh bo‘lishi mumkin emas.",
      "string.min": "Description kamida 5 ta belgidan iborat bo‘lsin.",
      "string.max": "Description 255 belgidan oshmasin.",
      "any.required": "Description majburiy maydon.",
    }),
  });

  return schema.validate(body, { abortEarly: false });
};
