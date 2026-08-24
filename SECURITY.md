# Security Policy

## Supported versions

This repository powers a single, continuously deployed production website. Only the code currently deployed from the `main` branch is supported — there are no maintained older versions.

## Reporting a vulnerability

If you discover a security vulnerability in this site (e.g. XSS, injection, exposed secrets, authentication/authorization issues, or a misconfiguration that puts user data at risk), please report it privately rather than opening a public GitHub issue.

**Email:** hello@velovamedia.com

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce (proof-of-concept code or requests are welcome)
- The URL(s) or component(s) affected

We aim to acknowledge reports within 3 business days and will keep you updated as the issue is investigated and resolved. Please allow us reasonable time to address the issue before any public disclosure.

## Scope

In scope:

- The production site and its Next.js application code in this repository
- Server Actions (e.g. the contact form) and any API routes

Out of scope:

- Vercel platform infrastructure itself (report to [Vercel's security page](https://vercel.com/security))
- Third-party services linked from the site (social media, WhatsApp, etc.)
- Denial-of-service, spam/rate-limit testing, or automated scanning that degrades service for real visitors

Thank you for helping keep Velova Media's site and its visitors safe.
