import { Schema } from 'mongoose';

export interface ITransaction {
  _id: string;
  customerId?: string;
  date: Date;
  value: number;
}

export const TransactionSchema: Schema = new Schema<ITransaction>(
  {
    _id: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, _id: false },
);
