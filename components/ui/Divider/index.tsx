import { cn } from '@/utils/styles/cn';
import { View } from 'react-native';

type DividerProps = {
  className?: string;
};

export default function Divider({ className }: DividerProps) {
  return <View className={cn('my-md h-px bg-gray-200', className)} />;
}
