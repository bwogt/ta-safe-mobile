import { Pressable } from 'react-native';

type Props = {
  closeModal: () => void;
};

export default function ModalBackdrop({ closeModal }: Props) {
  return (
    <Pressable className="absolute inset-0 bg-black/70" onPress={closeModal} />
  );
}
