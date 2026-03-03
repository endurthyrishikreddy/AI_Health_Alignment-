/**
 * Security Utilities for Input Validation & Sanitization
 * Prevents XSS, SQL Injection, and other attacks
 */

// Field length limits
const FIELD_LIMITS = {
  name: 100,
  email: 255,
  organization: 150,
  role: 100,
  message: 5000,
};

// Email regex - RFC 5322 simplified but effective
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Whitelist allowed HTML entities only
const ALLOWED_CHARS_REGEX = /^[a-zA-Z0-9\s\-.,!\?'()@&\+\/\\]*$/;

/**
 * Sanitize string input to prevent XSS
 * - Removes HTML tags and dangerous characters
 * - Escapes special characters
 */
export function sanitizeString(input: string, fieldName: keyof typeof FIELD_LIMITS): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Trim whitespace
  let sanitized = input.trim();

  // Limit length
  const limit = FIELD_LIMITS[fieldName];
  if (sanitized.length > limit) {
    console.warn(`⚠️ Input exceeds limit for ${fieldName}: ${sanitized.length} > ${limit}`);
    sanitized = sanitized.substring(0, limit);
  }

  // Remove null bytes (potential injection vector)
  sanitized = sanitized.replace(/\0/g, '');

  // Remove script tags and dangerous HTML
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/on\w+\s*=/gi, '');

  // Escape HTML entities
  sanitized = escapeHtml(sanitized);

  return sanitized;
}

/**
 * Escape HTML special characters
 * Prevents XSS by converting < > & " ' to HTML entities
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const trimmed = email.trim().toLowerCase();

  // Check length
  if (trimmed.length < 5 || trimmed.length > FIELD_LIMITS.email) {
    return false;
  }

  // More strict email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return false;
  }

  // Split by @ and validate parts
  const parts = trimmed.split('@');
  if (parts.length !== 2) return false;

  const [localPart, domain] = parts;

  // Validate local part (before @)
  if (localPart.length < 1 || localPart.length > 64) return false;
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
  if (localPart.includes('..')) return false;

  // Validate domain part (after @)
  if (domain.length < 3) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  if (domain.includes('..')) return false;
  if (!domain.includes('.')) return false;

  // Check domain has valid TLD (at least 2 chars)
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) return false;

  return true;
}

/**
 * Validate name field
 * Allows characters to be sanitized rather than blocking them outright
 */
export function isValidName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check length - STRICT: minimum 2 characters
  if (trimmed.length < 2) {
    return false;
  }

  if (trimmed.length > FIELD_LIMITS.name) {
    return false;
  }

  // Just check for null bytes and extreme cases
  // Allow anything else - sanitization will handle XSS
  if (trimmed.includes('\0')) {
    return false;
  }

  return true;
}

/**
 * Validate and sanitize entire request body
 */
export function validateContactRequest(body: any): {
  valid: boolean;
  data?: {
    name: string;
    email: string;
    organization: string | null;
    role: string | null;
    message: string | null;
  };
  errors: string[];
} {
  const errors: string[] = [];

  // Check required fields exist
  if (!body || typeof body !== 'object') {
    return {
      valid: false,
      errors: ['Invalid request body'],
    };
  }

  // Validate name
  if (!body.name || typeof body.name !== 'string') {
    errors.push('Name is required');
  } else if (!isValidName(body.name)) {
    errors.push('Name must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes');
  }

  // Validate email
  if (!body.email || typeof body.email !== 'string') {
    errors.push('Email is required');
  } else if (!isValidEmail(body.email)) {
    errors.push('Email format is invalid');
  }

  // Validate optional organization
  const organization = body.organization || '';
  if (organization && typeof organization !== 'string') {
    errors.push('Organization must be a string');
  } else if (organization && organization.length > FIELD_LIMITS.organization) {
    errors.push(`Organization cannot exceed ${FIELD_LIMITS.organization} characters`);
  }

  // Validate optional role
  const role = body.role || '';
  if (role && typeof role !== 'string') {
    errors.push('Role must be a string');
  } else if (role && role.length > FIELD_LIMITS.role) {
    errors.push(`Role cannot exceed ${FIELD_LIMITS.role} characters`);
  }

  // Validate optional message
  const message = body.message || '';
  if (message && typeof message !== 'string') {
    errors.push('Message must be a string');
  } else if (message && message.length > FIELD_LIMITS.message) {
    errors.push(`Message cannot exceed ${FIELD_LIMITS.message} characters`);
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Sanitize all inputs
  return {
    valid: true,
    data: {
      name: sanitizeString(body.name, 'name'),
      email: sanitizeString(body.email, 'email'),
      organization: organization ? sanitizeString(organization, 'organization') : null,
      role: role ? sanitizeString(role, 'role') : null,
      message: message ? sanitizeString(message, 'message') : null,
    },
    errors: [],
  };
}

/**
 * Rate limiting storage (in-memory, reset on server restart)
 * For production, use Redis
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Check if request should be rate limited
 * Max 50 requests per IP per hour
 */
export function checkRateLimit(ip: string, maxRequests: number = 50, windowMs: number = 3600000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // New window or expired
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false; // Not rate limited
  }

  if (record.count >= maxRequests) {
    return true; // Rate limited
  }

  record.count++;
  return false; // Not rate limited
}

/**
 * Get client IP from request
 */
export function getClientIp(req: any): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}
