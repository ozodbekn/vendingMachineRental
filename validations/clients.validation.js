const Joi = require("joi");

const ClientValidation = (body) => {
  const schema = Joi.object({
    full_name: Joi.string().min(3).max(255).required().messages({
      "string.empty": "Ism va familiya bo'sh bo'lmasligi kerak.",
      "string.min": "To'liq ism kamida 3 ta belgidan iborat bo'lsin.",
      "string.max": "To'liq ism 255 belgidan oshmasin.",
      "any.required": "To'liq ism majburiy maydon.",
    }),
    phone: Joi.string()
      .pattern(/^\+?\d{9,15}$/)
      .required()
      .messages({
        "string.pattern.base": "Telefon raqam formati noto'g'ri.",
        "string.empty": "Telefon raqami kiritilishi kerak.",
        "any.required": "Telefon raqam majburiy maydon.",
      }),
    email: Joi.string().email().required().messages({
      "string.email": "Email noto'g'ri formatda.",
      "string.empty": "Email bo'sh bo'lishi mumkin emas.",
      "any.required": "Email majburiy maydon.",
    }),
    password: Joi.string().min(6).max(255).required().messages({
      "string.empty": "Parol kiritilishi kerak.",
      "string.min": "Parol kamida 6 belgidan iborat bo'lsin.",
      "string.max": "Parol 255 belgidan oshmasin.",
      "any.required": "Parol majburiy maydon.",
    }),
    confirm_password: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Parol va tasdiqlash paroli mos bo'lishi kerak.",
        "any.required": "Tasdiqlash paroli majburiy maydon.",
      }),
    address: Joi.string().min(5).max(255).required().messages({
      "string.empty": "Manzil bo'sh bo'lishi mumkin emas.",
      "string.min": "Manzil kamida 5 belgidan iborat bo'lsin.",
      "any.required": "Manzil majburiy maydon.",
    }),
    passport: Joi.string().min(5).max(255).required().messages({
      "string.empty": "Pasport raqami kiritilishi kerak.",
      "string.min": "Pasport raqami kamida 5 belgidan iborat bo'lsin.",
      "any.required": "Pasport majburiy maydon.",
    }),
    verify_img: Joi.string().required().messages({
      "string.uri": "Tasdiqlovchi rasm uchun yaroqli URL kiriting.",
    }),
    is_active: Joi.string().valid("true", "false").required().messages({
      "any.only": "is_active faqat 'true' yoki 'false' qiymat bo'lishi mumkin.",
      "any.required": "is_active majburiy maydon.",
    }),
  });

  return schema.validate(body, { abortEarly: false });
};

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

module.exports = { ClientValidation };
