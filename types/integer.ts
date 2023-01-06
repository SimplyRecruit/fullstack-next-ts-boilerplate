import { number, InferType } from 'yup';

export const integerSchema = number().integer().required()
export type Integer = InferType<typeof integerSchema>