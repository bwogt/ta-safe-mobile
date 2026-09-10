import DeviceLookup from '@/components/device/DeviceLookup';
import Header from '@/components/ui/Header';
import { useTranslation } from 'react-i18next';

export default function DeviceLookupScreen() {
  const { t } = useTranslation('common');

  return (
    <>
      <Header title={t('titles.deviceLookup')} />
      <DeviceLookup />
    </>
  );
}
