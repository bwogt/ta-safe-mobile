import { Text, View } from 'react-native';

type Props = {
  label: string;
  value?: string | null;
  error?: string;
};

export default function LabeledText({ label, value, error }: Props) {
  return (
    <View className="gap-2">
      <Text className="text-lg font-bold">
        {label}
        {value ? ': ' : ''}
        <Text className="font-normal text-black">{value}</Text>
      </Text>
      {error && <Text className="text-red-500"> {error}</Text>}
    </View>
  );
}
