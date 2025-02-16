import { z } from "zod";

export const MemberInfo = z.object({
  id: z.number(),
  firstName: z.string().min(2, { message: "שם פרטי חייב להכיל לפחות 2 תווים" }),
  lastName: z.string().min(2, { message: "שם משפחה חייב להכיל לפחות 2 תווים" }),
  grade: z.number().min(1).max(12),
});

const MemberPhoneInfo = z.object({
  title: z.string().min(1, { message: "יש לבחור כותרת" }),
  number: z.string().regex(/^05\d{8}$/, { message: "מספר טלפון לא תקין" }),
});

export const Member = z.object({
  id: z.number(),
  identityNumber: z.string().pipe(z.coerce.number()).or(z.number()).nullable(),
  firstName: z.string().min(2, { message: "שם פרטי חייב להכיל לפחות 2 תווים" }),
  lastName: z.string().min(2, { message: "שם משפחה חייב להכיל לפחות 2 תווים" }),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .or(z.date({ required_error: "יש לבחור תאריך לידה" }))
    .nullable(),
  joinDate: z
    .string()
    .pipe(z.coerce.date())
    .or(z.date({ required_error: "יש לבחור תאריך הצטרפות" })),
  grade: z.number().min(1).max(12),
  school: z.string({ required_error: "לא הוזן בית ספר" }),
  address: z
    .object({
      city: z.string().min(2, { message: "שם העיר חייב להכיל לפחות 2 תווים" }),
      street: z
        .string()

        .min(2, { message: "שם הרחוב חייב להכיל לפחות 2 תווים" }),
      houseNumber: z.string().min(1, { message: "יש להזין מספר בית" }),
    })
    .nullable(),
  phones: z
    .array(MemberPhoneInfo)
    .min(1, { message: "יש להזין לפחות מספר טלפון אחד" }),
  hobbies: z
    .array(z.string())
    .min(1, { message: "יש לבחור לפחות תחביב אחד" })
    .default([]),
});

export type MemberInfo = z.infer<typeof MemberInfo>;
export type MemberPhoneInfo = z.infer<typeof MemberPhoneInfo>;
export type Member = z.infer<typeof Member>;
