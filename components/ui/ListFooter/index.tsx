import { Text } from 'react-native';

type Props = {
  message: string;
};

export default function ListFooter({ message }: Props) {
  return <Text className="py-4 text-center text-gray-500">{message}</Text>;
}
