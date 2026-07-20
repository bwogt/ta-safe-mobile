import { Device } from '@/schemas/device/base/device.schema';
import { View } from 'react-native';
import Badge from '../Badge';
import Divider from '../Divider';
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

          <View className="flex-row justify-around">
            <Badge label={device.model.brand.name} />
            <Badge label={device.color} />
            <Badge label={device.model.ram} />
            <Badge label={device.model.storage} />
          </View>

          <View className="mt-xl flex-row justify-end">
            <DeviceCardFooter updatedAt={device.updated_at} />
          </View>
        </View>
      </View>
    </View>
  );
}
