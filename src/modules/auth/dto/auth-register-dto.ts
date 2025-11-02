import { z, ZodObject } from "zod";

const authRegisterSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string'
    }).min(2, 'Name must be at least 2 characters long'),
    email: z.string().email({
        message: 'Invalid email format'
    }),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    })
    .min(8, 'Password must be at least 8 characters long'),
    phone_number: z.string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string'
    }).min(10, 'Phone number must be at least 10 characters long'),

});

export class AuthRegisterDto {
    static schema: ZodObject<any> = authRegisterSchema;
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly phone_number: string,
    ) { }
}

