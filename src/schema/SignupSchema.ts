import { z } from "zod";

const SignupSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: "Please enter your first name" }),
    lastName: z
        .string()
        .min(1, { message: "Please enter your last name" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Enter a valid email" }),
    password: z
        .string()
    .min(8,{message: "Password must be atleast 8 characters"})
})

//type inference from schema 
export type RegistrationFormData = z.infer<typeof SignupSchema>;
export default SignupSchema