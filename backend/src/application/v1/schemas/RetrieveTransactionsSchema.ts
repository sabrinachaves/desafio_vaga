import Joi from 'joi';

const RetrieveTransactionsSchema = Joi.object({
  transactionId: Joi.string().uuid(),
  name: Joi.string(),
  cpfCnpj: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  page: Joi.number(),
  pageSize: Joi.number(),
});

export default RetrieveTransactionsSchema;
