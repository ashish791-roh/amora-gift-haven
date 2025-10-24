import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// src/lib/whatsappUtils.ts
export const getWhatsAppUrl = (phoneNumber: string, message?: string): string => {
  const encodedMessage = message ? encodeURIComponent(message) : '';
  const baseUrl = `https://wa.me/${phoneNumber}`;
  const apiBaseUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  // Basic mobile detection (you might want a more robust method)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Try the whatsapp:// protocol first for mobile
    // Note: This might not work perfectly on all devices/browsers anymore.
    // The api.whatsapp.com link is generally more reliable now.
    // Keeping wa.me as fallback as it handles redirects better.
     return `${apiBaseUrl}${encodedMessage ? `&text=${encodedMessage}` : ''}`;
    // Or stick with wa.me which often redirects correctly on mobile anyway:
    // return `${baseUrl}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
  } else {
    // Use wa.me for desktop (often opens WhatsApp Web)
    return `${baseUrl}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
  }
};
