import i18n from '@/services/i18n';
import dayjs from 'dayjs';

const formats: Record<string, string> = {
  'pt-BR': 'dddd, D [de] MMMM [de] YYYY, HH:mm',
  en: 'dddd, MMMM D, YYYY, h:mm A',
};

export function formatDatetime(date: string | Date) {
  const locale = i18n.language;

  return dayjs(date)
    .locale(locale.toLowerCase())
    .format(formats[locale] ?? formats.en);
}
