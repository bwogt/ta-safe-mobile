import { Text, View } from 'react-native';

type Props = {
  title: string;
  subtitle: string;
};

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <View className="gap-sm">
      <Text className="text-2xl font-bold text-primary">{title}</Text>
      <Text className="text-xl text-subtitle">{subtitle}</Text>
    </View>
  );
}
