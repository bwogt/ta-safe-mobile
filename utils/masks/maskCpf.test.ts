import { maskCpf } from './maskCpf';

describe('maskCpf', () => {
  it('should return an empty string when input is empty', () => {
    expect(maskCpf('')).toBe('');
  });

  it('should keep up to three digits without formatting', () => {
    expect(maskCpf('1')).toBe('1');
    expect(maskCpf('12')).toBe('12');
    expect(maskCpf('123')).toBe('123');
  });

  it('should add the first dot after three digits', () => {
    expect(maskCpf('123')).toBe('123');
    expect(maskCpf('1234')).toBe('123.4');
  });

  it('should add the second dot after the next three digits', () => {
    expect(maskCpf('1234567')).toBe('123.456.7');
    expect(maskCpf('12345678')).toBe('123.456.78');
  });

  it('should add a hyphen before the last digits', () => {
    expect(maskCpf('1234567890')).toBe('123.456.789-0');
  });

  it('should format a complete CPF correctly', () => {
    expect(maskCpf('12345678901')).toBe('123.456.789-01');
  });

  it('should remove non-numeric characters before formatting', () => {
    expect(maskCpf('123abc456def78901')).toBe('123.456.789-01');
  });

  it('should limit the CPF to 11 digits', () => {
    expect(maskCpf('123456789012345')).toBe('123.456.789-01');
  });
});
