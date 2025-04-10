const Joi = require("joi");

exports.PaymentValidation = (body) => {
  const schema = Joi.object({
    type: Joi.string().valid("cash", "card", "online").required().messages({
      "any.only": "type faqat 'cash', 'card' yoki 'online' bo‘lishi mumkin.",
      "any.required": "type majburiy maydon.",
    }),
    amount: Joi.number().positive().required().messages({
      "number.base": "amount raqam bo‘lishi kerak.",
      "number.positive": "amount musbat qiymat bo‘lishi kerak.",
      "any.required": "amount majburiy maydon.",
    }),
    is_transacted: Joi.boolean().required().messages({
      "boolean.base": "is_transacted faqat true yoki false bo‘lishi mumkin.",
      "any.required": "is_transacted majburiy maydon.",
    }),
    contract_id: Joi.number().required().messages({
      "number.base": "contract_id raqam bo‘lishi kerak.",
      "any.required": "contract_id majburiy maydon.",
    }),
  });

  return schema.validate(body, { abortEarly: false });
};
