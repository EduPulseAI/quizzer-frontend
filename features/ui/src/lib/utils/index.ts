 import { clsx, type ClassValue } from 'clsx'
 import { twMerge } from 'tailwind-merge'


/**
 * [cn]
 * next-feature@0.1.1-beta.4
 * January 11th 2026, 4:02:05 am
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
