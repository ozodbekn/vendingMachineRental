const Joi = require("joi");

exports.CategoryValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
      "string.empty": "Kategoriya nomi bo‘sh bo‘lishi mumkin emas.",
      "string.min": "Kategoriya nomi kamida 2 ta belgidan iborat bo‘lsin.",
      "string.max": "Kategoriya nomi 255 belgidan oshmasin.",
      "any.required": "Kategoriya nomi majburiy maydon.",
    }),
    description: Joi.string().min(10).max(255).required().messages({
      "string.empty": "Kategoriya tavsifi bo‘sh bo‘lishi mumkin emas.",
      "string.min": "Kategoriya tavsifi kamida 10 ta belgidan iborat bo‘lsin.",
      "string.max": "Kategoriya tavsifi 255 belgidan oshmasin.",
      "any.required": "Kategoriya tavsifi majburiy maydon.",
    }),
    icon_url: Joi.string().uri().required().messages({
      "string.uri": "Ikonka havolasi yaroqli URL bo‘lishi kerak.",
      "any.required": "Ikonka havolasi majburiy maydon.",
    }),
  });

  return schema.validate(body, { abortEarly: false });
};
