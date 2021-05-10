import { i18n } from '@lingui/core';
import { en, ru } from 'make-plural/plurals';

export const locales = {
  en: 'English',
  ru: 'Russian',
};

export const defaultLocale = 'en';

i18n.loadLocaleData('en', { plurals: en });
i18n.loadLocaleData('ru', { plurals: ru });

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale) {
  const { messages } = await import(`./locales/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
