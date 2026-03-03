# Security Quick Reference Guide

## 🚀 Quick Start

### Running Security Tests
```bash
# Automated test suite
bash test-security.sh http://localhost:3000/api your-admin-token

# Expected: All tests pass (25 tests)
```

### Filing a Security Issue
1. **DO NOT** post security vulnerabilities publicly
2. Report to: [contact security team]
3. Include: Description, reproduction steps, impact

---

## 🛡️ Security Checklist Before Deployment

```
PRE-DEPLOYMENT
□ Run: bash test-security.sh
□ All tests should PASS
□ Set strong ADMIN_TOKEN in .env
□ Enable HTTPS/TLS
□ Configure WAF (optional but recommended)

POST-DEPLOYMENT
□ Monitor logs for attacks
□ Set up alerts
□ Test from production environment
```

---

## 📋 API Quick Reference

### POST /api/contact - Submit Contact Form
```bash
curl -X POST https://yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Jane Doe",              # Required: 2-100 chars
    "email": "jane@hospital.org",        # Required: valid email
    "organization": "VA Medical Center", # Optional: max 150 chars
    "role": "Physician",                 # Optional: max 100 chars
    "message": "..."                     # Optional: max 5000 chars
  }'

# Success: 201 Created
# Validation Error: 400 Bad Request
# Rate Limited: 429 Too Many Requests
# Server Error: 500 Internal Server Error
```

### GET /api/contacts - Admin Access
```bash
curl -X GET https://yourdomain.com/api/contacts \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Success: 200 OK (returns contact list)
# Not Authorized: 401 Unauthorized
```

---

## 🔐 Security Features at a Glance

| Feature | Status | Description |
|---------|--------|-------------|
| XSS Prevention | ✅ | HTML tags & attributes sanitized |
| SQL Injection | ✅ | Parameterized queries via Supabase |
| Input Validation | ✅ | Field length & format checks |
| Rate Limiting | ✅ | 5 requests/hour per IP |
| Request Size | ✅ | Max 10KB payload |
| Authorization | ✅ | Bearer token required for admin |
| Security Headers | ✅ | HSTS, CSP, X-Frame-Options |
| Error Handling | ✅ | Generic messages, detailed logs |
| Timing Attacks | ✅ | Constant-time token comparison |

---

## ⚙️ Configuration

### Environment Variables Required
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
ADMIN_TOKEN=your_secret_admin_token_min_32_chars
```

### Rate Limiting (in api/utils/security.ts)
```typescript
// Max requests per IP
maxRequests = 5

// Time window (milliseconds)
windowMs = 3600000  // 1 hour
```

### Field Limits (in api/utils/security.ts)
```typescript
FIELD_LIMITS = {
  name: 100,           // characters
  email: 255,          // characters
  organization: 150,   // characters
  role: 100,           // characters
  message: 5000,       // characters
}
```

---

## 🐛 Debugging Security Issues

### Enable Enhanced Logging
```typescript
// In api/contact.ts
console.log('📝 Form submission received:', validation);
console.log('🔄 Attempting to insert...');
console.log('✓ Success:', data);
```

### Check Request Logs
```bash
# Search for rate limit violations
grep "Rate limit exceeded" logs.txt

# Search for validation failures
grep "Validation failed" logs.txt

# Search for auth failures
grep "Unauthorized access" logs.txt
```

### Common Issues

**Issue: Rate limit triggered unexpectedly**
- Solution: Check if requests are from same IP
- Rate resets after 1 hour
- Use different IP or wait for reset

**Issue: XSS data stored in database**
- Solution: Data is automatically sanitized
- Check if sanitization functions are called
- Verify database integrity

**Issue: Admin token not working**
- Solution: Check exact token match (case-sensitive)
- Verify Bearer prefix format
- Confirm token length >= 32 chars

---

## 📚 File Structure

```
api/
├── contact.ts                  # POST endpoint (form submission)
├── contacts.ts                 # GET endpoint (admin)
└── utils/
    └── security.ts             # Security utilities

docs/
├── SECURITY_AUDIT.md           # Vulnerability audit
├── SECURITY_TESTING.md         # Test cases & checklist
└── SECURITY_IMPLEMENTATION.md  # Full implementation guide

root/
├── test-security.sh            # Automated test script
└── SECURITY_QUICK_REFERENCE.md # This file
```

---

## 🔍 Testing Quick Commands

```bash
# Test valid form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com"}'

# Test XSS
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"<script></script>","email":"test@test.com"}'

# Test rate limit (returns 429 after 5 requests)
for i in {1..6}; do curl -X POST http://localhost:3000/api/contact -d '{"name":"User","email":"user'$i'@test.com"}'; done

# Test admin access
curl -X GET http://localhost:3000/api/contacts \
  -H "Authorization: Bearer admin-token-here"
```

---

## 📞 Getting Help

### Documentation Files
- **Detailed Guide:** SECURITY_IMPLEMENTATION.md
- **Testing Guide:** SECURITY_TESTING.md
- **Audit Report:** SECURITY_AUDIT.md

### Key Functions in api/utils/security.ts
- `sanitizeString()` - Remove XSS vectors
- `validateContactRequest()` - Validate entire request
- `isValidEmail()` - Validate email format
- `checkRateLimit()` - Check rate limit
- `getClientIp()` - Extract client IP

---

## 💡 Best Practices

✅ **Always validate on server side** (client validation is not enough)
✅ **Use HTTPS in production** (required for security)
✅ **Rotate admin token regularly** (every 90 days)
✅ **Monitor logs daily** (look for attack patterns)
✅ **Keep dependencies updated** (security patches)
✅ **Test with real attack payloads** (not just theory)
✅ **Document config changes** (audit trail)

---

## 🚨 Emergency Contacts

**Production Issue:** Contact DevOps team
**Security Vulnerability:** Contact Security team
**Questions:** Check documentation files first

---

**Last Updated:** March 3, 2026
**Version:** 1.0
**Status:** Production Ready ✅
