import { Device } from '@/schemas/device/base/device.schema';
import { View } from 'react-native';
import Divider from '../Divider';
import DeviceCardContent from './_content';
import DeviceCardFooter from './_footer';
import DeviceCardHeader from './_header';

type DeviceCardProps = {
  device: Device;
};

export default function DeviceCard({ device }: DeviceCardProps) {
  return (
    <View className="mt-xl px-md">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <View className="p-md">
          <DeviceCardHeader title={device.model.name} />
          <Divider />
          <DeviceCardContent device={device} />
          <DeviceCardFooter updatedAt={device.updated_at} />
        </View>
      </View>
    </View>
  );
}
