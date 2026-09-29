import { maskNfeKey } from './maskNfeKey';

describe('maskNfeKey', () => {
  it('should return an empty string when input is empty', () => {
    expect(maskNfeKey('')).toBe('');
  });

  it('should keep up to four digits without formatting', () => {
    expect(maskNfeKey('1')).toBe('1');
    expect(maskNfeKey('12')).toBe('12');
    expect(maskNfeKey('123')).toBe('123');
    expect(maskNfeKey('1234')).toBe('1234');
  });

  it('should add a space after four digits', () => {
    expect(maskNfeKey('12345')).toBe('1234 5');
  });

  it('should add spaces after every four digits', () => {
    expect(maskNfeKey('12345678')).toBe('1234 5678');
    expect(maskNfeKey('123456789')).toBe('1234 5678 9');
    expect(maskNfeKey('123456789012')).toBe('1234 5678 9012');
  });

  it('should format a complete NF-e key correctly', () => {
    expect(maskNfeKey('12345678901234567890123456789012345678901234')).toBe(
      '1234 5678 9012 3456 7890 1234 5678 9012 3456 7890 1234',
    );
  });

  it('should remove non-numeric characters before formatting', () => {
    expect(maskNfeKey('1234abc5678def9012')).toBe('1234 5678 9012');
  });

  it('should handle an already formatted NF-e key', () => {
    expect(maskNfeKey('1234 5678 9012 3456')).toBe('1234 5678 9012 3456');
  });

  it('should limit the NF-e key to 44 digits', () => {
    expect(
      maskNfeKey('12345678901234567890123456789012345678901234567890'),
    ).toBe('1234 5678 9012 3456 7890 1234 5678 9012 3456 7890 1234');
  });
});
