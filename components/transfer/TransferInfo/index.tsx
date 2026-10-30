import DeviceFeaturesCard from '@/components/device/DeviceFeaturesCard';
import Divider from '@/components/ui/Divider';
import { DeviceTransfer } from '@/schemas/transfer';
import { View } from 'react-native';
import TransferInfoActions from './_actions';
import TransferInfoContent from './_content';
import TransferInfoHeader from './_header';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferInfo({ transfer }: Props) {
  return (
    <>
      <View className="p-4">
        <View className="rounded-2xl border border-zinc-200 bg-white p-4">
          <TransferInfoHeader transfer={transfer} />
          <Divider />
          <TransferInfoContent transfer={transfer} />
        </View>
      </View>

      <DeviceFeaturesCard device={transfer.device} />

      <TransferInfoActions transfer={transfer} />
    </>
  );
}
