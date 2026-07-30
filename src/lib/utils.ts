import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string, locale: string = "en") {
  try {
    return new Intl.DateTimeFormat(locale === "sw" ? "sw-KE" : "en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
