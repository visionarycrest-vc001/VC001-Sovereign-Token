# 🛡️ Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in this repository, please report it responsibly.

- Email: security@visionarycrest.org
- GitHub Issues: [Open a security issue](https://github.com/visionarycrest-vc001/VC001-Sovereign-Token/issues)
- Response Time: We aim to respond within **72 hours** and resolve critical issues within **7 days**

Please include:
- A detailed description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested remediation (if known)

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main`  | ✅ Yes     |
| `legacy-*` | ❌ No    |

---

## Security Commit Rituals

All security-related fixes must:
- Include a signed commit with the prefix `🔐`
- Reference the CVE or internal vulnerability ID
- Be reviewed by at least one steward

Example:
```bash
git commit -S -m "🔐 Patch for CVE-2025-XXXX: sanitize input in grant viewer"
