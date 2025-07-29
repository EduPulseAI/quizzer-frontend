import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * [cn]
 * Tue Jul 29 2025
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
