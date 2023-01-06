import { object, string, InferType } from 'yup';

export const personSchema = object({
    name: string().required().min(3),
    surname: string().required().min(3)
});

export type Person = InferType<typeof personSchema>