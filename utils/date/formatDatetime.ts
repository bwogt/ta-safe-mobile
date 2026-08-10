import dayjs from 'dayjs';
import i18next from 'i18next';

const formats = {
  'pt-BR': 'DD/MM/YYYY [às] HH:mm:ss',
  en: 'MM/DD/YYYY [at] HH:mm:ss',
};

export function formatDatetime(date: string | Date) {
  const locale = i18next.language;
  const formatLocale = locale === 'pt-BR' ? 'pt-BR' : 'en';

  return dayjs(date)
    .locale(formatLocale.toLowerCase())
    .format(formats[formatLocale]);
}
