// Configurable security policies
export const FILE_POLICIES = {
  maxSizeBytes: 10 * 1024 * 1024, // 10 MB
  allowedTypes: [
    'text/plain',
    'text/csv',
    'application/json',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  blockedExtensions: ['.exe', '.bat', '.sh', '.js', '.vbs'],
};

// Sensitive data detection patterns
export const PII_PATTERNS = [
  {
    name: 'Email',
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    severity: 'medium',
  },
  {
    name: 'US Social Security Number',
    regex: /\b\d{3}-\d{2}-\d{4}\b/g,
    severity: 'high',
  },
  {
    name: 'Credit Card Number',
    regex: /\b(?:\d{4}[ -]?){3}\d{4}\b/g,
    severity: 'high',
  },
  {
    name: 'Phone Number (US)',
    regex: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
    severity: 'medium',
  },
  {
    name: 'IPv4 Address',
    regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
    severity: 'low',
  },
];

// Risk scoring thresholds
export const RISK_THRESHOLDS = {
  high: { minScore: 70, label: 'High Risk' },
  medium: { minScore: 40, label: 'Medium Risk' },
  low: { minScore: 0, label: 'Low Risk' },
};