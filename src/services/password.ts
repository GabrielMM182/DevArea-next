import  generator  from 'generate-password';
import zxcvbn from 'zxcvbn';

export interface PasswordOptions {
  length: number;
  numbers: boolean;
  symbols: boolean;
  uppercase: boolean;
}

export interface PasswordStrength {
  score: number;
  feedback: {
    warning: string;
    suggestions: string[];
  };
}

export const generateSecurePassword = (options: PasswordOptions): string => {
  if (options.length < 8) {
    throw new Error('O comprimento da senha deve ser de no mínimo 8 caracteres para garantir a segurança.');
  }
  return generator.generate({
    length: options.length,
    numbers: options.numbers,
    symbols: options.symbols,
    uppercase: options.uppercase,
    strict: true
  });
};

export const checkPasswordStrength = (password: string): PasswordStrength => {
  const result = zxcvbn(password);
  return {
    score: result.score,
    feedback: result.feedback
  };
};