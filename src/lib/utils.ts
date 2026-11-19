import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTechnicalCoord(x: number, y: number, z: number): string {
  return `X:${x.toFixed(2)} Y:${y.toFixed(2)} Z:${z.toFixed(2)}`;
}
