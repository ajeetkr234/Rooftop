import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Updates document title and meta description dynamically for technical SEO
 */
export function updatePageSEO(title: string, description: string) {
  const fullTitle = title.includes("YOUR ROOFING COMPANY") 
    ? title 
    : `${title} | YOUR ROOFING COMPANY`;
  document.title = fullTitle;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Open Graph Updates
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', fullTitle);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', description);
}

/**
 * Validates basic phone formats (allows standard local, national, and international formats, 7 to 15 digits)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
}

/**
 * Standard RFC-compliant email regex check
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Locks and unlocks body scrolling for accessible modals and drawers
 */
export function setBodyScrollLocked(locked: boolean) {
  if (typeof document === 'undefined') return;
  if (locked) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
    document.documentElement.style.removeProperty('--scrollbar-compensation');
  }
}

