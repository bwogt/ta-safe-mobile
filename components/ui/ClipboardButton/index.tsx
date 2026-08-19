import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Pressable } from 'react-native';

type ClipboardButtonProps = {
  text: string;
};

export default function ClipboardButton({ text }: ClipboardButtonProps) {
  const [copy, setCopy] = useState<boolean>(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <Pressable onPress={copyToClipboard}>
      <MaterialCommunityIcons
        name={copy ? 'checkbox-marked-circle-outline' : 'content-copy'}
        size={24}
      />
    </Pressable>
  );
}
