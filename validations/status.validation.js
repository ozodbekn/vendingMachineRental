const Joi = require("joi");

exports.StatusValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
      "string.empty": "Status nomi bo‘sh bo‘lishi mumkin emas.",
      "string.min": "Status nomi kamida 2 ta belgidan iborat bo‘lsin.",
      "any.required": "Status nomi majburiy maydon.",
    }),
    description: Joi.string().min(5).max(255).required().messages({
      "string.empty": "Status tavsifi bo‘sh bo‘lishi mumkin emas.",
      "string.min": "Tavsif kamida 5 ta belgidan iborat bo‘lsin.",
      "any.required": "Tavsif majburiy maydon.",
    }),
  });

  return schema.validate(body, { abortEarly: false });
};
