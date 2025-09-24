import {z} from "zod"


//Here come login schema 
//Login schema 

export const loginSchema  = z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().min(6,"Password must must be latest 6 characters")
});