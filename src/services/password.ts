import generator from 'generate-password';
import zxcvbn from 'zxcvbn';

export interface PasswordConfig {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeUppercase: boolean;
  includeLowercase: boolean;
}

export interface PasswordStrength {
  score: number;
  feedback: {
    warning: string;
    suggestions: string[];
  };
}

export const generatePassword = (config: PasswordConfig): string => {
  return generator.generate({
    length: config.length,
    numbers: config.includeNumbers,
    symbols: config.includeSymbols,
    uppercase: config.includeUppercase,
    lowercase: config.includeLowercase,
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