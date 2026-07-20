// src/utils/fileAnalyzer.js
export async function scanFile(file, { signal, policies } = {}) {
  // Use provided policies or fall back to imported defaults
  // (we import them just for fallback, but they'll only be used if policies isn't passed)
  const { default: defaultPolicies } = await import('../securityPolicies');

  const {
    file: filePolicy = defaultPolicies.FILE_POLICIES,
    pii: piiPatterns = defaultPolicies.PII_PATTERNS,
    thresholds = defaultPolicies.RISK_THRESHOLDS,
  } = policies || {};

  // ---------- Helper functions ----------

  // Read file as text using FileReader
  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // Compute SHA-256 hash using Web Crypto API
  async function computeSHA256(file) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  // Validate file against policies
  function validateFile(file) {
    const errors = [];
    if (file.size > filePolicy.maxSizeBytes) {
      errors.push(`File too large. Max ${filePolicy.maxSizeBytes / 1024 / 1024}MB.`);
    }
    if (!filePolicy.allowedTypes.includes(file.type)) {
      errors.push(`File type '${file.type}' not allowed.`);
    }
    const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (filePolicy.blockedExtensions.includes(extension)) {
      errors.push(`File extension '${extension}' is blocked.`);
    }
    return errors;
  }

  // Scan text content for PII using regex
  function detectPII(text, patterns) {
    const findings = [];
    for (const pattern of patterns) {
      const matches = text.match(pattern.regex);
      if (matches && matches.length > 0) {
        findings.push({
          type: pattern.name,
          severity: pattern.severity,
          count: matches.length,
          sample: matches.slice(0, 3),
        });
      }
    }
    return findings;
  }

  // Calculate risk score and recommendations
  function assessRisk(piiFindings, thresholds) {
    let score = 0;
    const recommendations = [];
    piiFindings.forEach(finding => {
      if (finding.severity === 'high') {
        score += 30 * Math.min(finding.count, 3);
        recommendations.push(`High severity: ${finding.type} found. Redact immediately.`);
      } else if (finding.severity === 'medium') {
        score += 15 * Math.min(finding.count, 3);
        recommendations.push(`Medium severity: ${finding.type} detected. Review content.`);
      } else {
        score += 5 * Math.min(finding.count, 3);
      }
    });
    score = Math.min(100, score);
    let label = 'low';
    if (score >= thresholds.high.minScore) label = 'high';
    else if (score >= thresholds.medium.minScore) label = 'medium';
    return { score, label, recommendations };
  }

  // ---------- Main scanning flow ----------

  // Step 1: Validate
  const validationErrors = validateFile(file);
  if (validationErrors.length > 0) {
    throw new Error('Validation failed: ' + validationErrors.join(' '));
  }

  // Step 2: Read content and compute hash in parallel
  const [text, hash] = await Promise.all([
    readFileAsText(file).catch(() => null),
    computeSHA256(file),
  ]);

  // Abort check
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

  // Step 3: Detect PII if text was extracted
  let piiFindings = [];
  if (text !== null) {
    piiFindings = detectPII(text, piiPatterns);
  }

  // Step 4: Risk assessment
  const risk = assessRisk(piiFindings, thresholds);

  // Step 5: Build result objects
  const analysis = {
    findings: piiFindings.map(f => `${f.type} (${f.severity}): ${f.count} occurrence(s)`),
    metadata: {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      lastModified: new Date(file.lastModified).toLocaleDateString(),
      hash: hash.substring(0, 16) + '...',
    },
  };

  const privacy = {
    gdprRelevant: piiFindings.length > 0,
    dataShared: piiFindings.length > 0
      ? 'File contains personal data (see findings)'
      : 'No personal data detected',
  };

  return { analysis, risk, privacy, hash, text };
}