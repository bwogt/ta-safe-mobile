import { cn } from '@/utils/styles/cn';
import { Text, View } from 'react-native';

type Props = {
  label: string;
  error?: string;
  focused?: boolean;
  children: React.ReactNode;
};

export default function Field({ label, error, focused, children }: Props) {
  const borderStyle = cn(
    'rounded-xl border border-neutral',
    focused && 'border-primary',
  );

  const labelStyle = cn(
    'absolute -top-3 left-3 z-10 bg-white px-1 text-neutral',
    focused && 'text-primary',
  );

  return (
    <View className="min-h-4xl">
      <View className={borderStyle}>
        <Text className={labelStyle}>{label}</Text>
        {children}
      </View>

      {error && <Text className="text-danger-500">{error}</Text>}
    </View>
  );
}
