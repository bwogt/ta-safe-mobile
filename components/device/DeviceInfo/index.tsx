import Divider from '@/components/ui/Divider';
import { Device } from '@/schemas/device/base/device.schema';
import { View } from 'react-native';
import DeviceInfoContent from './_content';
import DeviceInfoHeader from './_header';

type Props = {
  device: Device;
};

export default function DeviceInfo({ device }: Props) {
  return (
    <View className="mt-xl px-md">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <DeviceInfoHeader device={device} />
        <Divider />
        <DeviceInfoContent device={device} />
      </View>
    </View>
  );
}
