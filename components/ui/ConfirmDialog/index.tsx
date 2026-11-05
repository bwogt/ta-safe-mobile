import { useTranslation } from 'react-i18next';
import { Modal, Pressable, Text, View } from 'react-native';
import ModalBackdrop from '../ModalBackdrop';

type Props = {
  title: string;
  subtitle: string;
  visible: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  title,
  subtitle,
  visible,
  onRequestClose,
  onConfirm,
}: Props) {
  const { t } = useTranslation('common');

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <ModalBackdrop closeModal={onRequestClose} />

      <View className="flex-1 justify-center p-4">
        <View className="gap-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <Text className="text-lg font-bold">{title}</Text>
          <Text>{subtitle}</Text>
          <Text>{t('common:confirmation.continue')}</Text>

          <View className="flex-row justify-end gap-12">
            <Pressable onPress={onRequestClose}>
              <Text className="text-lg font-bold text-primary">
                {t('common:confirmation.no')}
              </Text>
            </Pressable>

            <Pressable onPress={onConfirm}>
              <Text className="text-lg font-bold text-primary">
                {t('common:confirmation.yes')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
