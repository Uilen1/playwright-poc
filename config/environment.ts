import 'dotenv/config';

type Environment = {
  baseUrl: string;
  standardUser: string;
  standardPassword: string;
};

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value?.trim()) {
    throw new Error(`Required environment variable "${name}" is missing.`);
  }

  return value;
}

export const environment: Environment = {
  baseUrl: requiredEnvironmentVariable('BASE_URL'),
  standardUser: requiredEnvironmentVariable('STANDARD_USER'),
  standardPassword: requiredEnvironmentVariable('STANDARD_PASSWORD'),
};