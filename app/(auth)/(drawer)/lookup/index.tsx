import DeviceLookup from '@/components/device/DeviceLookup';
import Header from '@/components/ui/Header';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function DeviceLookupScreen() {
  const { t } = useTranslation('common');

  return (
    <>
      <Header title={t('titles.deviceLookup')} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <DeviceLookup />
      </KeyboardAvoidingView>
    </>
  );
}
