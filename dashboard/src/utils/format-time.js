import { format, getTime, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale"; // Import the Vietnamese locale

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy";
  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy p";
  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

// Format date in Vietnamese locale
export function fDateVN(date, newFormat) {
  const fm = newFormat || "dd MMMM yyyy"; // Default format for Vietnamese
  return date ? format(new Date(date), fm, { locale: vi }) : "";
}

// Format distance to now in Vietnamese locale
export function fToNowVN(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: vi, // Use Vietnamese locale
      })
    : "";
}
