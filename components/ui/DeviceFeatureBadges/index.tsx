import { Device } from '@/schemas/device/base/device.schema';
import { DeviceSummary } from '@/schemas/device/pagination/device-summary.schema';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import Badge from '../Badge';

type DeviceFeatureBadgesProps = {
  device: Device | DeviceSummary;
};

type BadgeVariant = 'success' | 'warning' | 'info' | 'danger';

type BadgeConfig = {
  variant: BadgeVariant;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
};

function badgeConfig(
  device: Device | DeviceSummary,
  value: boolean | undefined,
): BadgeConfig {
  switch (device.validation_status) {
    case 'pending':
      return { variant: 'warning', icon: 'shield-lock-open-outline' };
    case 'in_analysis':
      return { variant: 'info', icon: 'shield-alert-outline' };
    default:
      return device.validated_attributes?.brand_name
        ? { variant: 'success', icon: 'shield-lock-outline' }
        : { variant: 'danger', icon: 'shield-remove-outline' };
  }
}

export default function DeviceFeatureBadges({
  device,
}: DeviceFeatureBadgesProps) {
  const config = badgeConfig(device, device.validated_attributes?.brand_name);

  return (
    <View className="flex-row flex-wrap gap-6 p-4">
      <Badge
        label={device.model.brand.name}
        variant={config.variant}
        icon={config.icon}
      />

      <Badge
        label={device.model.name}
        variant={config.variant}
        icon={config.icon}
      />

      <Badge label={device.color} variant={config.variant} icon={config.icon} />

      <Badge
        label={device.model.ram}
        variant={config.variant}
        icon={config.icon}
      />

      <Badge
        label={device.model.storage}
        variant={config.variant}
        icon={config.icon}
      />
    </View>
  );
}
