import { z } from "zod";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(50, "El nombre no puede superar los 50 caracteres."),
  email: z
    .string()
    .email("Ingresa un correo válido.")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Correo inválido."
    ),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
