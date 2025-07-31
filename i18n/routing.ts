import {defineRouting} from 'next-intl/routing';
 
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'fa';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'fa'],
 
  // Used when no locale matches
  defaultLocale:defaultLocale as  'en' | 'fa',
});