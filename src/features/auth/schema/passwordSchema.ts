import { z } from "zod";

// ✅ يستخدم في login فقط
export const singlePasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long");
/**
 *  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character")
 */
// ✅ يستخدم في register/reset password
export const passwordWithConfirmSchema = z
  .object({
    password: singlePasswordSchema,
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type PasswordWithConfirmSchemaType = z.infer<
  typeof passwordWithConfirmSchema
>;

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "password is required"),
    new_password: singlePasswordSchema,
    new_password_confirmation: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match",
    path: ["new_password_confirmation"],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
