export const VALIDATION_REQUIRED_FIELD_MSG = 'Required field'
export const VALIDATION_INVALID_FORMAT_MSG = (field: string) => `Invalid format for ${field} field`
export const VALIDATION_POSITIVE_NUMBER_FIELD = (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} must be positive`
export const VALIDATION_MIN_LENGTH_MSG = (field: string, minLength: number) => `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${minLength} characters long`
export const VALIDATION_MAX_LENGTH_MSG = (field: string, maxLength: number) => `${field.charAt(0).toUpperCase() + field.slice(1)} must be at most ${maxLength} characters long`
export const VALIDATION_MISMATCH_PASSWORDS = 'Passwords do not match'