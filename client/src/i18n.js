import { i18n } from '@lingui/core';

export const locales = {
  en: 'English',
  ru: 'Russian',
};
export const defaultLocale = 'en';

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale) {
  const { messages } = await import(`./locales/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
