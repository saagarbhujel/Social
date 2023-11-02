import * as z from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(4, {message: "Name must be at least 4 characters."}),
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(8, {message: " Password must be at least 8 characters."}),
  })

  export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: " Password must be at least 8 characters."}),
  })

  export const PostValidation = z.object({
    caption: z.string().min(5, {message: "Caption must be at least 5 characters."}).max(2200, {message: "Caption must be less than 2200 characters."}),
    file: z.custom<File[]>(),
    location: z.string().min(1, {message: "Location must be at least 1 character."}).max(1000, {message: "Location must be less than 1000 characters."}),
    tags: z.string()

  })