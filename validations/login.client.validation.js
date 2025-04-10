// clients.validation.js
const Joi = require("joi");

const LoginClientValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email to'g'ri formatda bo'lishi kerak",
      "string.email": "Email noto'g'ri formatda kiritilgan",
      "string.empty": "Email kiritilishi shart",
      "any.required": "Email kiritilishi shart",
    }),

    password: Joi.string().min(6).required().messages({
      "string.base": "Parol to'g'ri formatda bo'lishi kerak",
      "string.empty": "Parol kiritilishi shart",
      "string.min": "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
      "any.required": "Parol kiritilishi shart",
    }),
  });

  return schema.validate(body, { abortEarly: false });
};

module.exports = { LoginClientValidation };
