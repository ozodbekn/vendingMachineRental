const Joi = require("joi");

exports.OwnerValidation = (body) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(255).required().messages({
      "string.empty": "Ism bo‘sh bo‘lishi mumkin emas.",
      "string.min": "Ism kamida 2 ta belgidan iborat bo‘lsin.",
      "any.required": "Ism majburiy maydon.",
    }),
    last_name: Joi.string().min(2).max(255).required().messages({
      "string.empty": "Familiya bo‘sh bo‘lishi mumkin emas.",
      "string.min": "Familiya kamida 2 ta belgidan iborat bo‘lsin.",
      "any.required": "Familiya majburiy maydon.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email noto‘g‘ri formatda.",
      "any.required": "Email majburiy maydon.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Parol kamida 6 ta belgidan iborat bo‘lsin.",
      "any.required": "Parol majburiy maydon.",
    }),
    phone: Joi.string()
      .pattern(/^\+?\d{9,15}$/)
      .required()
      .messages({
        "string.pattern.base": "Telefon raqam formati noto‘g‘ri.",
        "any.required": "Telefon raqam majburiy maydon.",
      }),
    company_name: Joi.string().min(2).max(255).required().messages({
      "string.empty": "Kompaniya nomi bo‘sh bo‘lishi mumkin emas.",
      "any.required": "Kompaniya nomi majburiy maydon.",
    }),
    ref_token: Joi.string().messages({
      "string.empty": "ref_token bo‘sh bo‘lishi mumkin emas.",
    }),
  });

  return schema.validate(body, { abortEarly: false });
};
