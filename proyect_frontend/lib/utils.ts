import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}
export const authFormSchema = (type: string) => z.object({
  // Campos específicos para registro (sign-up)
  firstName: type === "sign-in" ? z.string().optional() : z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  lastName: type === "sign-in" ? z.string().optional() : z.string().min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
  tipoDNA: type === "sign-in" ? z.string().optional() : z.string().min(10, { message: "El tipo de documento debe tener al menos 10 caracteres" }),
  DNA: type === "sign-in" ? z.string().optional() : z.string().min(10, { message: "El documento debe tener al menos 10 caracteres" }),
  address: type === "sign-in" ? z.string().optional() : z.string().max(50, { message: "La dirección no puede exceder los 50 caracteres" }),
  departament: type === "sign-in" ? z.string().optional() : z.string().min(2, { message: "El departamento debe tener al menos 2 caracteres" }),
  city: type === "sign-in" ? z.string().optional() : z.string().min(2, { message: "La ciudad debe tener al menos 2 caracteres" }),
  dob: type === "sign-in" ? z.string().optional() : z.string().min(2, { message: "La fecha de nacimiento debe tener al menos 2 caracteres" }),

  // Campos comunes para ambos tipos de formulario
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida" }),
  password: z.string().min(8,
    { message: "La contraseña debe tener al menos 8 caracteres" }),
})