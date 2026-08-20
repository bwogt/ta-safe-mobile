import ClipboardButton from '@/components/ui/ClipboardButton';
import { Device } from '@/schemas/device/base/device.schema';
import { formatDatetime } from '@/utils/date/formatDatetime';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, Text, View } from 'react-native';

type ShareDeviceModalProps = {
  device: Device;
  visible: boolean;
  closeModal: () => void;
};

export default function ShareDeviceCodeModal({
  device,
  visible,
  closeModal,
}: ShareDeviceModalProps) {
  const { t } = useTranslation('common');

  if (device.share_code) {
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <View className="flex-1 items-center justify-center">
          <Pressable
            className="absolute inset-0 bg-black/70"
            onPress={closeModal}
          />

          <View className="z-10 p-4">
            <View className="gap-4 rounded-lg border border-zinc-200 bg-white p-4">
              <Text className="text-center text-xl font-bold">
                {t('fields.shareCode')}
              </Text>

              <View className="flex-row items-center justify-center gap-4">
                <Text className="text-center text-2xl font-bold">
                  {device.share_code.code}
                </Text>
                <ClipboardButton text={device.share_code.code} />
              </View>

              <Text className="text-center text-lg text-danger-500">
                {t('fields.expiresAt')}
                {': '}
                {formatDatetime(device.share_code.expires_at)}
              </Text>

              <Text className="p-2 text-center">{t('messages.shareCode')}</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
