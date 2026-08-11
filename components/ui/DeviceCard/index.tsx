import { DeviceSummary } from '@/schemas/device/pagination/device-summary.schema';
import { View } from 'react-native';
import DeviceFeatureBadges from '../DeviceFeatureBadges';
import Divider from '../Divider';
import DeviceCardFooter from './_footer';
import DeviceCardHeader from './_header';

type DeviceCardProps = {
  device: DeviceSummary;
};

export default function DeviceCard({ device }: DeviceCardProps) {
  return (
    <View className="mt-xl px-md">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <View>
          <DeviceCardHeader device={device} />
          <Divider />
          <DeviceFeatureBadges device={device} />
          <DeviceCardFooter updatedAt={device.updated_at} />
        </View>
      </View>
    </View>
  );
}
