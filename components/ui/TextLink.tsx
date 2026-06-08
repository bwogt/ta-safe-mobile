import { Link, type Href } from 'expo-router';
import { Pressable, Text } from 'react-native';

type TextLinkProps = {
  href: Href;
  text: string;
  className: string;
};

export function TextLink({ href, text, className }: TextLinkProps) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <Text className={className}>{text}</Text>
      </Pressable>
    </Link>
  );
}
