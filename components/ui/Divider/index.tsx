import { cn } from '@/utils/styles/cn';
import { View } from 'react-native';

type Props = {
  className?: string;
};

export default function Divider({ className }: Props) {
  return <View className={cn('my-md h-px bg-gray-200', className)} />;
}
