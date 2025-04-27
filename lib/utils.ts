/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
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

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => {
  if (value === undefined || value === null) {
      return null; // or return an empty object {} depending on your use case
  }
  try {
      return JSON.parse(JSON.stringify(value));
  } catch (error) {
      console.error('Failed to parse and stringify value:', error);
      return null; // or return an empty object {}
  }
};

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000); // 1 minute ago

  return date > oneMinuteAgo ? "Processing" : "Success";
};


export const authFormSchema = (type: string) => z.object({

  //sign up
  
  firstName: type === "sign-in" 
  ? z.string().optional() 
  : z.string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .regex(/^[a-zA-Z\s]+$/, "First name must only contain letters and spaces"),

  lastName: type === "sign-in" 
  ? z.string().optional() 
  : z.string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .regex(/^[a-zA-Z]+$/, "Last name must only contain letters"),
  address1: type === "sign-in" 
  ? z.string().optional()
  : z.string()
      .trim()
      .min(5, "Address must be at least 5 characters")
      .max(50, "Address too long")
      .regex(/^[a-zA-Z0-9\s]+$/, "Address must only contain letters, numbers, and spaces"),
    
  city: type === "sign-in"
  ? z.string().optional()
  : z.string()
      .trim()
      .min(2, "City must be at least 2 characters")
      .max(30, "City name too long")
      .regex(/^[a-zA-Z\s]+$/, "City must only contain letters and spaces"),
  state: type === "sign-in"
  ? z.string().optional()
  : z.string()
      .trim()
      .length(2, "State must be exactly 2 letters")
      .regex(/^[A-Z]{2}$/, "State must be 2 uppercase letters (e.g., AZ)"),
  postalCode: type === "sign-in"
  ? z.string().optional()
  : z.string()
      .trim()
      .length(5, "Postal code must be exactly 5 digits")
      .regex(/^\d{5}$/, "Postal code must only contain numbers"),
  dateOfBirth: type === "sign-in"
  ? z.string().optional()
  : z.string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of Birth must be in YYYY-MM-DD format with only numbers")
      .refine((date) => {
        const today = new Date();
        const [year, month, day] = date.split("-").map(Number);
        const birthday = new Date(year, month - 1, day);
        
        const age = today.getFullYear() - birthday.getFullYear();
        const m = today.getMonth() - birthday.getMonth();
        
        return age > 18 || (age === 18 && m >= 0 && today.getDate() >= birthday.getDate());
      }, { message: "You must be at least 18 years old" }),
  ssn: type === "sign-in"
  ? z.string().optional()
  : z.string()
      .trim()
      .length(4, "SSN must be exactly 4 digits")
      .regex(/^\d{4}$/, "SSN must only contain numbers"),
  
  // bpth sign up and sign in
  email: z.string().trim().email("Invalid email address"),
  password: z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  
})