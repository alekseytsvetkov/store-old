import { toast } from 'sonner';
import * as z from 'zod';

export function isMacOs() {
  if (typeof window === 'undefined') return false;

  return window.navigator.userAgent.includes('Mac');
}

export function formatId(id: number) {
  return `#${id.toString().padStart(4, '0')}`;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function toSentenceCase(str: string) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {},
) {
  const { currency = 'USD', notation = 'compact' } = options;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
  }).format(Number(price));
}

export function formatNumber(
  number: number | string,
  options: {
    decimals?: number;
    style?: Intl.NumberFormatOptions['style'];
    notation?: Intl.NumberFormatOptions['notation'];
  } = {},
) {
  const { decimals = 0, style = 'decimal', notation = 'standard' } = options;

  return new Intl.NumberFormat('en-US', {
    style,
    notation,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(number));
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join('\n'));
  } else if (err instanceof Error) {
    return toast(err.message);
  } else {
    return toast('Something went wrong, please try again later.');
  }
}

export function processPath(path: string) {
  const segments = path.split('/').filter((segment) => segment !== '');

  if (segments.length === 4) {
    return `${segments[0]}/${segments[1]}`;
  } else if (segments.length > 2) {
    return segments.length > 2 ? segments.slice(0, 2).join('/') : path;
  } else {
    return path.replace(/\/$/, '');
  }
}

export function processStorePath(path: string) {
  const segments = path.split('/').filter((segment) => segment !== '');

  if (segments.length === 3) {
    return null;
  } else if (segments.length === 4) {
    return segments[3];
  }
}
