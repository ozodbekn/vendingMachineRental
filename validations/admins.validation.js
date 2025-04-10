const Joi = require("joi");

exports.AdminValidation = (body) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(255).required().messages({
      "string.empty": "Ism bo‘sh bo‘lishi mumkin emas.",
      "any.required": "Ism majburiy maydon.",
    }),
    last_name: Joi.string().min(2).max(255).required().messages({
      "string.empty": "Familiya bo‘sh bo‘lishi mumkin emas.",
      "any.required": "Familiya majburiy maydon.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email formati noto‘g‘ri.",
      "any.required": "Email majburiy maydon.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Parol kamida 6 belgidan iborat bo‘lsin.",
      "any.required": "Parol majburiy maydon.",
    }),
    phone: Joi.string()
      .pattern(/^\+?\d{9,15}$/)
      .required()
      .messages({
        "string.pattern.base": "Telefon raqam noto‘g‘ri formatda.",
        "any.required": "Telefon raqam majburiy maydon.",
      }),
    is_active: Joi.boolean().required().messages({
      "boolean.base": "is_active faqat true yoki false bo‘lishi mumkin.",
      "any.required": "is_active majburiy maydon.",
    }),
    is_creator: Joi.boolean().required().messages({
      "boolean.base": "is_creator faqat true yoki false bo‘lishi mumkin.",
      "any.required": "is_creator majburiy maydon.",
    }),
    ref_token: Joi.string().messages({
      "string.empty": "ref_token bo‘sh bo‘lishi mumkin emas.",
    }),
  });

  return schema.validate(body, { abortEarly: false });
};
