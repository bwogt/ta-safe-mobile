import { DeviceTransfer } from '@/schemas/transfer';
import { Text, View } from 'react-native';
import StatusIndicator from '../StatusIndicator';
import TransferAccept from './Actions/_accept';
import TransferCancel from './Actions/_cancel';
import TransferReject from './Actions/_reject';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferInfoHeader({ transfer }: Props) {
  return (
    <>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-bold">
            {transfer.device.model.name}
          </Text>
          <StatusIndicator status={transfer.status} />
        </View>

        {transfer.status === 'pending' && (
          <View className="flex-row gap-8">
            <TransferCancel transfer={transfer} />
            <TransferReject transfer={transfer} />
            <TransferAccept transfer={transfer} />
          </View>
        )}
      </View>
    </>
  );
}
