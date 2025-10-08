import {z} from "zod"


//Here come login schema 
//Login schema 

export const loginValidationSchema  = z.object({
    email:z.string().email("Please enter valid email address").trim(),
    password:z.string().trim().min(6,"Password must must be latest 6 characters")
});