import { Schema } from 'mongoose';

export interface ICustomer {
  _id?: string;
  name: string;
  cpfCnpj: string;
}

export const CustomerSchema: Schema = new Schema<ICustomer>(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cpfCnpj: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: false },
);
