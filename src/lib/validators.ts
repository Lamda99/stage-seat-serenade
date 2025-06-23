/**
 * Validates if a phone number is a valid Indian mobile number according to TRAI guidelines.
 * Rules:
 * 1. Must be 10 digits long
 * 2. Must start with 6, 7, 8, or 9
 * 3. Cannot be all same digits (e.g., 9999999999)
 * 4. Cannot be sequential (e.g., 9876543210)
 * 5. Must be a valid number format (no letters, special chars except + and spaces)
 * 
 * @param phoneNumber The phone number to validate
 * @returns An object with isValid and error properties
 */
export const validateIndianPhoneNumber = (phoneNumber: string): { isValid: boolean; error?: string } => {
  // Remove all non-digit characters except + for country code
  const sanitizedNumber = phoneNumber.replace(/[^\d+]/g, '');
  
  // Remove +91 prefix if present
  const numberWithoutCode = sanitizedNumber.replace(/^\+91/, '');
  
  // Check if exactly 10 digits after removing prefix
  if (numberWithoutCode.length !== 10) {
    return {
      isValid: false,
      error: 'Phone number must be 10 digits long'
    };
  }

  // Check if starts with valid prefix (6-9)
  if (!/^[6-9]/.test(numberWithoutCode)) {
    return {
      isValid: false,
      error: 'Phone number must start with 6, 7, 8, or 9'
    };
  }

  // Check if all digits are same (e.g., 9999999999)
  if (/^(\d)\1{9}$/.test(numberWithoutCode)) {
    return {
      isValid: false,
      error: 'Invalid phone number format: cannot be all same digits'
    };
  }

  // Check for sequential numbers (ascending or descending)
  const ascending = '0123456789';
  const descending = '9876543210';
  if (ascending.includes(numberWithoutCode) || descending.includes(numberWithoutCode)) {
    return {
      isValid: false,
      error: 'Invalid phone number format: cannot be sequential digits'
    };
  }

  return { isValid: true };
};

/**
 * Formats a phone number to a standardized format: +91 XXXXX XXXXX
 * Keeps only digits and formats them according to Indian mobile number format
 * 
 * @param phoneNumber The phone number to format
 * @returns The formatted phone number
 */
export const formatIndianPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Remove 91 from start if present (with or without +)
  const numberWithoutCode = digits.replace(/^91/, '');
  
  // Take only the first 10 digits
  const tenDigits = numberWithoutCode.slice(0, 10);
  
  // If we don't have enough digits, return as is
  if (tenDigits.length < 10) return tenDigits;
  
  // Format: +91 XXXXX XXXXX
  return `+91 ${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`;
};

// For use in Firebase phone auth formatting
export const getFirebasePhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters first
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Remove 91 from start if present (with or without +)
  const numberWithoutCode = digits.replace(/^91/, '');
  
  // Format for Firebase: +91XXXXXXXXXX
  return `+91${numberWithoutCode}`;
};
