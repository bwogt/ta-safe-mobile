import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { useCancelTransfer } from '@/queries/transfer/useCancelTransfer';
import { DeviceTransfer } from '@/schemas/transfer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferCancel({ transfer }: Props) {
  const { t } = useTranslation(['common', 'transfer']);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { mutate: cancel, isPending } = useCancelTransfer(transfer.id);

  return (
    <>
      {transfer.type === 'sent' && (
        <>
          <ConfirmDialog
            title={t('transfer:cancel.title')}
            subtitle={t('transfer:cancel.subtitle')}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            onConfirm={cancel}
          />

          <View className="items-center gap-2">
            <Pressable
              disabled={isPending}
              onPress={() => setModalVisible(true)}
              className="h-12 w-12 items-center justify-center rounded-full border"
            >
              <MaterialCommunityIcons name="close" size={22} />
            </Pressable>

            <Text>Cancelar</Text>
          </View>
        </>
      )}
    </>
  );
}
