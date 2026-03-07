/**
 * Form Validation Rules
 * Reusable validation rules for react-hook-form
 */

/**
 * Name validation rules
 */
export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 2,
    message: "Name must be at least 2 characters"
  },
  maxLength: {
    value: 50,
    message: "Name cannot exceed 50 characters"
  },
  pattern: {
    value: /^[a-zA-Z\s]+$/,
    message: "Name can only contain letters and spaces"
  }
};

/**
 * Email validation rules
 */
export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address"
  }
};

/**
 * Password validation rules
 */
export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters"
  },
  maxLength: {
    value: 100,
    message: "Password cannot exceed 100 characters"
  }
};

/**
 * Strong password validation rules
 * Requires: min 8 chars, uppercase, lowercase, number, special char
 */
export const strongPasswordValidation = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters"
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: "Password must contain uppercase, lowercase, number, and special character"
  }
};

/**
 * Confirm password validation
 * @param {string} password - The password to match against
 */
export const confirmPasswordValidation = (password) => ({
  required: "Please confirm your password",
  validate: (value) => value === password || "Passwords do not match"
});

/**
 * Role validation rules
 */
export const roleValidation = {
  required: "Please select a role"
};

/**
 * Phone number validation rules
 */
export const phoneValidation = {
  pattern: {
    value: /^[\d\s\-\+\(\)]+$/,
    message: "Please enter a valid phone number"
  }
};

/**
 * URL validation rules
 */
export const urlValidation = {
  pattern: {
    value: /^https?:\/\/.+/,
    message: "Please enter a valid URL starting with http:// or https://"
  }
};

/**
 * Number validation rules
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 */
export const numberValidation = (min = 0, max = Infinity) => ({
  required: "This field is required",
  min: {
    value: min,
    message: `Value must be at least ${min}`
  },
  max: {
    value: max,
    message: `Value cannot exceed ${max}`
  }
});

/**
 * Text area validation rules
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 */
export const textAreaValidation = (minLength = 10, maxLength = 500) => ({
  required: "This field is required",
  minLength: {
    value: minLength,
    message: `Must be at least ${minLength} characters`
  },
  maxLength: {
    value: maxLength,
    message: `Cannot exceed ${maxLength} characters`
  }
});

/**
 * File upload validation
 * @param {Array<string>} allowedTypes - Allowed MIME types
 * @param {number} maxSize - Max file size in bytes
 */
export const fileValidation = (allowedTypes = [], maxSize = 5 * 1024 * 1024) => ({
  required: "Please select a file",
  validate: {
    fileType: (files) => {
      if (!files || files.length === 0) return true;
      const file = files[0];
      if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        return `File type must be one of: ${allowedTypes.join(", ")}`;
      }
      return true;
    },
    fileSize: (files) => {
      if (!files || files.length === 0) return true;
      const file = files[0];
      if (file.size > maxSize) {
        return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(2)}MB`;
      }
      return true;
    }
  }
});

/**
 * Date validation rules
 * @param {Date} minDate - Minimum date
 * @param {Date} maxDate - Maximum date
 */
export const dateValidation = (minDate, maxDate) => ({
  required: "Date is required",
  validate: {
    minDate: (value) => {
      if (!minDate) return true;
      return new Date(value) >= minDate || `Date must be after ${minDate.toLocaleDateString()}`;
    },
    maxDate: (value) => {
      if (!maxDate) return true;
      return new Date(value) <= maxDate || `Date must be before ${maxDate.toLocaleDateString()}`;
    }
  }
});
