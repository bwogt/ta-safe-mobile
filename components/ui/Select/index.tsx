import { colors } from '@/themes/colors';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { View } from 'react-native';
import Field from '../Field';

type Option = {
  label: string;
  value: number;
};

type Props = {
  label: string;
  value: number;
  options: Option[];
  onChange: (value: number) => void;
};

export default function Select({ label, value, options, onChange }: Props) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Field label={label} focused={isFocused}>
      <View className="rounded-xl">
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              color={option.value == 0 ? colors.subtitle : '#000'}
            />
          ))}
        </Picker>
      </View>
    </Field>
  );
}
