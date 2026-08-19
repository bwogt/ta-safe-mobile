import { Device } from '@/schemas/device/base/device.schema';
import { formatDatetime } from '@/utils/date/formatDatetime';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, Text, View } from 'react-native';
import ClipboardButton from '../ClipboardButton';

type ShareDeviceInfoProps = {
  device: Device;
};

export default function ShareDeviceInfo({ device }: ShareDeviceInfoProps) {
  const { t } = useTranslation('common');
  const [modalVisible, setModalVisible] = useState(false);

  if (device.share_code) {
    return (
      <>
        <Pressable onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="share-variant-outline" size={22} />
        </Pressable>

        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 items-center justify-center">
            <Pressable
              className="absolute inset-0 bg-black/70"
              onPress={() => setModalVisible(false)}
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

                <Text className="p-2">{t('messages.shareCode')}</Text>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}
