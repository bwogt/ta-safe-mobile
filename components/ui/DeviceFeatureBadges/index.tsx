import { Device } from '@/schemas/device/base/device.schema';
import { DeviceSummary } from '@/schemas/device/pagination/device-summary.schema';
import { View } from 'react-native';
import Badge from '../Badge';

type DeviceFeatureBadgesProps = {
  device: Device | DeviceSummary;
};

type BadgeVariant = 'default' | 'success' | 'danger';

function badgeVariant(value: boolean | undefined): BadgeVariant {
  if (value === undefined) return 'default';
  return value ? 'success' : 'danger';
}

export default function DeviceFeatureBadges({
  device,
}: DeviceFeatureBadgesProps) {
  return (
    <View className="flex-row flex-wrap justify-between gap-4 p-4">
      <Badge
        label={device.model.brand.name}
        variant={badgeVariant(device.validated_attributes?.brand_name)}
      />

      <Badge
        label={device.model.name}
        variant={badgeVariant(device.validated_attributes?.brand_name)}
      />

      <Badge
        label={device.color}
        variant={badgeVariant(device.validated_attributes?.color)}
      />

      <Badge
        label={device.model.ram}
        variant={badgeVariant(device.validated_attributes?.ram)}
      />

      <Badge
        label={device.model.storage}
        variant={badgeVariant(device.validated_attributes?.storage)}
      />
    </View>
  );
}
