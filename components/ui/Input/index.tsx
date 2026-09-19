import { cn } from '@/utils/styles/cn';
import { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import Field from '../Field';

type Props = TextInputProps & {
  label: string;
  iconRight?: React.ReactNode;
  error?: string;
};

export default function Input({
  label,
  error,
  iconRight,
  editable = true,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Field label={label} error={error} focused={isFocused}>
      <View className="flex-row">
        <TextInput
          {...rest}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'h-2xl flex-1 pl-2 text-lg',
            !editable && 'text-neutral',
          )}
        />

        {iconRight && <View className="justify-center px-4">{iconRight}</View>}
      </View>
    </Field>
  );
}
