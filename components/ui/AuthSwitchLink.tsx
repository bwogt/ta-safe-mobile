import { cn } from '@/utils/styles/cn';
import { Href, Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

type AuthSwitchLinkProps = {
  href: Href;
  text: string;
  actionText: string;
  disabled?: boolean;
};

export function AuthSwitchLink({
  href,
  text,
  actionText,
  disabled,
}: AuthSwitchLinkProps) {
  return (
    <Link href={href} asChild>
      <Pressable disabled={disabled}>
        <Text
          className={cn(
            'text-center text-lg text-subtitle',
            disabled && 'text-neutral',
          )}
        >
          {text}{' '}
          <Text
            className={cn(
              'text-lg font-semibold text-primary',
              disabled && 'text-neutral',
            )}
          >
            {actionText}
          </Text>
        </Text>
      </Pressable>
    </Link>
  );
}
