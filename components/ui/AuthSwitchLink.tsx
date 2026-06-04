import { Href, Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

type AuthSwitchLinkProps = {
  href: Href;
  text: string;
  actionText: string;
};

export function AuthSwitchLink({
  href,
  text,
  actionText,
}: AuthSwitchLinkProps) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <Text className="text-center text-lg text-subtitle">
          {text}{' '}
          <Text className="text-lg font-bold text-primary">{actionText}</Text>
        </Text>
      </Pressable>
    </Link>
  );
}
