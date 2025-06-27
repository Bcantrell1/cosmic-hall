import { z } from 'zod';
import { ValidationError } from './errors';

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      const errorMessage = fieldErrors
        .map(err => `${err.field}: ${err.message}`)
        .join(', ');
      
      throw new ValidationError(errorMessage);
    }
    throw error;
  }
}

export function validateInputSafe<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      const errorMessage = fieldErrors
        .map(err => `${err.field}: ${err.message}`)
        .join(', ');
      
      return { success: false, error: errorMessage };
    }
    return { success: false, error: 'Validation failed' };
  }
}

export function validateParams<T>(schema: z.ZodSchema<T>, params: unknown): T {
  return validateInput(schema, params);
}

export function validateSearchParams<T>(schema: z.ZodSchema<T>, searchParams: unknown): T {
  return validateInput(schema, searchParams);
} 