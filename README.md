# PYRA-SOLUTION

![PYRA Logo](./public/pyra-logo.png)

**PYRA-SOLUTION** — Advanced Cyber Defense & Offensive Security Platform

A comprehensive cybersecurity solution for hacking and defense sectors featuring threat intelligence, penetration testing tools, vulnerability assessment, and real-time security monitoring.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Security Features](#security-features)
- [Project Structure](#project-structure)
- [CI/CD](#cicd)
- [License](#license)
- [Contact](#contact)

---

## Overview

PYRA-SOLUTION is a next-generation cybersecurity platform designed to protect enterprises against evolving digital threats. Built with a cyber-dark theme aesthetic, it combines AI-powered intelligence with expert human analysis to deliver comprehensive security capabilities.

The platform features an interactive security terminal, real-time threat dashboards, vulnerability assessment tools, threat intelligence feeds, and much more — all wrapped in a sleek, modern dark-themed UI with particle animations and glass-morphism effects.

---

## Features

### 1. Home Page (`/`)
- **Hero Section** — Stunning landing with animated particle background, brand logo, and call-to-action buttons
- **Animated Statistics** — Live counters for threats blocked, uptime SLA, enterprise clients, and countries protected
- **Security Capabilities** — Interactive cards showcasing 6 core security features with hover effects
- **Call-to-Action** — Conversion-focused section with gradient glass card design

### 2. Security Dashboard (`/dashboard`)
- **Real-Time Metrics** — Live-updating cards for active threats, blocked attacks, system health, and network status
- **Threat Activity Chart** — 24-hour area chart showing blocked vs detected threats using Recharts
- **Security Score** — Animated circular gauge showing overall security posture
- **Attack Origins Map** — Interactive world map visualization showing attack source countries
- **Attack Types Pie Chart** — DDoS, Malware, Phishing, Intrusion breakdown
- **Live Threat Feed** — Auto-updating alert stream with severity indicators and source attribution

### 3. Threat Intelligence (`/threat-intel`)
- **Threat Feeds** — Curated intelligence feeds from MITRE ATT&CK, NVD, FBI Flash with expandable IOCs
- **CVE Database** — Searchable table of Common Vulnerabilities with CVSS scoring
- **Threat Actor Profiles** — Detailed APT profiles (Lazarus Group, APT41, Fancy Bear) with techniques
- **Timeline View** — Chronological security events with severity indicators
- **Search & Filter** — Full-text search across all threat data with severity filtering

### 4. Security Toolkit (`/tools`)
- **Interactive Terminal** — Functional CLI with 10 security commands (scan, whois, ping, traceroute, dns, etc.)
- **Network Scanner** — Simulated port scanner with real-time progress animation
- **Password Analyzer** — Real-time strength meter with 5-category validation
- **Encryption Tool** — Encrypt/decrypt with AES-256-GCM, Base64, and ROT13 algorithms

### 5. Services (`/services`)
- **Pricing Plans** — Three tiers (Basic $999/mo, Professional $2,499/mo, Enterprise Custom)
- **Feature Comparison** — Full table comparing all plan capabilities
- **Testimonials** — Carousel of client reviews with star ratings
- **Contact Form** — Full-featured contact form with validation and success state

### 6. About (`/about`)
- **Company Overview** — Mission, vision, and company story
- **Statistics** — Client count, countries served, threats blocked, platform uptime
- **Core Values** — Security First, Continuous Vigilance, Rapid Innovation, Collaborative Defense
- **Leadership Team** — 6 executive profiles with certifications
- **Certifications** — SOC 2, ISO 27001, CMMC, FedRAMP, PCI DSS, HIPAA
- **Partners** — CrowdStrike, Palo Alto Networks, Splunk, Elastic, and more
- **Contact Information** — Headquarters, email, phone details

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 with TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 3 with custom cyber-themed design system |
| **UI Components** | Radix UI primitives + shadcn/ui |
| **Animation** | Framer Motion |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Routing** | React Router v7 |
| **Forms** | React Hook Form + Zod validation |
| **Date** | date-fns |
| **Linting** | ESLint 9 + TypeScript ESLint |

### Design System
- **Colors**: Cyber dark theme with blue (`#0080FF`), gold (`#C0A060`), and dark surface (`#0D1117`)
- **Effects**: Glass-morphism cards, text glow, particle background, animated counters
- **Typography**: Inter font family with monospaced accents for security data

---

## Installation

### Prerequisites
- Node.js 20+ 
- npm 10+

### Quick Start

```bash
# Clone the repository
git clone https://github.com/byronic-azure/pyra-solution.git
cd pyra-solution

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

## Screenshots

> Screenshots will be added here. Below are the planned captures:

| Page | Description |
|------|-------------|
| **Home** | Hero section with particle background and animated stats |
| **Dashboard** | Real-time threat monitoring with charts and live feed |
| **Threat Intel** | Threat feeds, CVE database, and actor profiles |
| **Tools** | Interactive terminal and security toolkit |
| **Services** | Pricing plans and feature comparison |
| **About** | Company overview and team profiles |

---

## Security Features

- **Real-Time Threat Detection** — Live updating dashboard with simulated threat feed
- **Vulnerability Assessment** — CVE database with CVSS scoring and search
- **APT Intelligence** — Detailed threat actor profiles with MITRE ATT&CK techniques
- **Interactive Security Terminal** — Command-line interface for security operations
- **Network Scanning** — Port scanner with service detection simulation
- **Password Analysis** — Real-time strength evaluation against best practices
- **Encryption Tools** — Multiple cipher support for secure communications
- **Compliance Frameworks** — SOC 2, ISO 27001, HIPAA, PCI DSS, FedRAMP support
- **Incident Response** — Severity-based alert classification and tracking
- **Attack Visualization** — Geographic attack origin mapping

---

## Project Structure

```
pyra-solution/
├── src/
│   ├── pages/                 # 6 page components
│   │   ├── Home.tsx           # Landing page with hero & stats
│   │   ├── Dashboard.tsx      # Real-time threat monitoring
│   │   ├── ThreatIntel.tsx    # Threat intelligence feeds
│   │   ├── Tools.tsx          # Security toolkit (terminal, scanner, crypto)
│   │   ├── Services.tsx       # Pricing & contact
│   │   └── About.tsx          # Company info & team
│   ├── components/            # Shared components
│   │   ├── Layout.tsx         # Page layout wrapper
│   │   ├── Navbar.tsx         # Responsive navigation bar
│   │   ├── Footer.tsx         # Site footer with links
│   │   ├── ParticleBackground.tsx  # Canvas particle animation
│   │   └── ui/                # 50+ shadcn/ui components
│   ├── lib/
│   │   └── utils.ts           # Utility functions (cn, etc.)
│   ├── hooks/
│   │   └── use-mobile.ts      # Mobile breakpoint hook
│   ├── App.tsx                # App root with route definitions
│   ├── main.tsx               # Entry point with BrowserRouter
│   └── index.css              # Global styles & Tailwind directives
├── public/
│   ├── hero-bg.png            # Hero background image
│   └── pyra-logo.png          # PYRA brand logo
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
├── tailwind.config.js         # Tailwind theme customization
├── postcss.config.js          # PostCSS plugins
├── eslint.config.js           # ESLint rules
├── components.json            # shadcn/ui configuration
└── index.html                 # HTML entry point
```

---

## CI/CD

This project includes a GitHub Actions workflow for automated building and deployment:

- **Trigger**: On push to `main` branch
- **Build**: Runs TypeScript compilation and Vite build
- **Lint**: ESLint checks for code quality
- **Deploy**: Automatic deployment to Cloudflare Pages

See `.github/workflows/deploy.yml` for full configuration.

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 PYRA-SOLUTION

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Contact

For questions, feature requests, or security concerns:

- **Email**: contact@pyra-solution.com
- **Support**: support@pyra-solution.com
- **Sales**: sales@pyra-solution.com
- **Phone**: +1 (555) 123-4567
- **24/7 Hotline**: +1 (555) 987-6543
- **Address**: 1000 Cyber Defense Way, Washington, DC 20001, United States

---

<p align="center">
  <strong>PYRA-SOLUTION</strong> — Securing the Digital Frontier
  <br/>
  <sub>Built with React, TypeScript, and cybersecurity expertise.</sub>
</p>
