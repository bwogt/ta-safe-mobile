import { Device } from '@/schemas/device/base/device.schema';
import { View } from 'react-native';
import DeviceFeatureBadges from '../DeviceFeatureBadges';
import Divider from '../Divider';
import DeviceFeaturesCardHeader from './_header';

type DeviceFeaturesCardProps = {
  device: Device;
};

export default function DeviceFeaturesCard({
  device,
}: DeviceFeaturesCardProps) {
  return (
    <View className="mt-xl px-md">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <DeviceFeaturesCardHeader />
        <Divider />
        <DeviceFeatureBadges device={device} />
      </View>
    </View>
  );
}
