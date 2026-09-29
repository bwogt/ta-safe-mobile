export function maskNfeKey(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 44);

  return digits.match(/.{1,4}/g)?.join(' ') ?? '';
}
