import {z} from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "Имя должно содержать не менее 2 букв")
    .max(50, "Имя должно содержать не более 50 букв"),
  lastName: z
    .string()
    .min(2, "Фамилия должна содержать не менее 2 букв")
    .max(50, "Фамилия должна содержать не более 50 букв"),
  email: z.string().email("Некорректная почта"), 
  phone: z.string().min(11, "Некорректный номер телефона"),
  address: z.string().min(5, "Адрес должен содержать не менее 5 букв"),
  comment: z.string().optional(),
})

export type TCheckoutFormValues = z.infer<typeof checkoutFormSchema>