import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(1, "Address name is required"),
  type_id: z.number().min(1, "Address type is required"),
  postcode: z
    .string()
    .regex(/^[0-9]{5}$/, "Postal code must be exactly 5 digits"),

  address: z.string().min(1, "Address is required"),
  city_id: z.number().min(1, "City is required"),
  country_id: z.number().min(1, "Country is required"),
});

export type AddressSchemaType = z.infer<typeof addressSchema>;
