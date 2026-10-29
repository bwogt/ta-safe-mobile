import { Text, View } from 'react-native';

type Props = {
  label: string;
  value?: string | null;
  error?: string;
};

export default function LabeledText({ label, value, error }: Props) {
  return (
    <>
      <View className="flex-row justify-between pb-2">
        <Text className="text-lg font-bold">{label}</Text>
        <Text className="flex-1 text-right text-lg">{value}</Text>
      </View>
      {error && <Text className="text-red-500"> {error}</Text>}
    </>
  );
}
