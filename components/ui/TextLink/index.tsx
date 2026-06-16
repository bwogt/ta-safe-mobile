import { cn } from '@/utils/styles/cn';
import { Link, type Href } from 'expo-router';
import { Pressable, Text } from 'react-native';

type TextLinkProps = {
  href: Href;
  text: string;
  disabled?: boolean;
  className?: string;
};

export default function TextLink({
  href,
  text,
  disabled,
  className,
}: TextLinkProps) {
  return (
    <Link href={href} asChild>
      <Pressable disabled={disabled}>
        <Text
          className={cn(
            'text-center text-lg font-semibold text-primary',
            disabled && 'text-neutral',
            className,
          )}
        >
          {text}
        </Text>
      </Pressable>
    </Link>
  );
}
